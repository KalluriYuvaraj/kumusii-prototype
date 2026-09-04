import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Store,
  Split,
  Sparkles,
} from "lucide-react";
import {
  products,
  retailers,
  offers,
  finalPayable,
  formatINR,
} from "../data/mockData";

const STORAGE_KEY = "kumusii_lists";

function loadList(id) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const lists = JSON.parse(raw);
      return lists.find((l) => l.id === id);
    }
  } catch {}
  return null;
}

export default function SmartBasket() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const list = loadList(listId);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, [listId]);

  const result = useMemo(() => {
    if (!list || !list.items.length) return null;

    // For each item, find cheapest retailer (by final payable)
    const itemPicks = list.items.map((item) => {
      const productOffers = offers[item.productId] || {};
      let best = null;
      let bestRid = null;
      for (const [rid, offer] of Object.entries(productOffers)) {
        if (offer.stock === "out_of_stock") continue;
        const fp = finalPayable(offer);
        if (fp == null) continue;
        // Cost for this qty (delivery/platform charged once per retailer later)
        const itemCost = (offer.price - (offer.discount || 0)) * item.qty;
        if (!best || itemCost < best.itemCost) {
          best = { offer, itemCost, unitFinal: fp };
          bestRid = rid;
        }
      }
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        qty: item.qty,
        product,
        bestRid,
        best,
      };
    });

    // --- Split basket: group by retailer, add delivery+platform once ---
    const byRetailer = {};
    itemPicks.forEach((pick) => {
      if (!pick.bestRid) return;
      if (!byRetailer[pick.bestRid]) {
        byRetailer[pick.bestRid] = {
          retailerId: pick.bestRid,
          items: [],
          subtotal: 0,
          delivery: 0,
          platformFee: 0,
        };
      }
      const group = byRetailer[pick.bestRid];
      group.items.push(pick);
      group.subtotal += pick.best.itemCost;
      // Take delivery/platform from first offer (same per retailer)
      group.delivery = pick.best.offer.delivery;
      group.platformFee = pick.best.offer.platformFee;
    });

    // Respect min-order: if subtotal < minOrder, still include (mock — just flag)
    const splitGroups = Object.values(byRetailer).map((g) => {
      const retailer = retailers.find((r) => r.id === g.retailerId);
      const total = g.subtotal + g.delivery + g.platformFee;
      const meetsMin = g.subtotal >= (retailer?.minOrder || 0);
      return { ...g, retailer, total, meetsMin };
    });
    const splitTotal = splitGroups.reduce((s, g) => s + g.total, 0);

    // --- Single retailer: try each retailer for ALL items ---
    let bestSingle = null;
    retailers.forEach((retailer) => {
      let subtotal = 0;
      let allAvailable = true;
      const items = [];
      list.items.forEach((item) => {
        const offer = offers[item.productId]?.[retailer.id];
        if (!offer || offer.stock === "out_of_stock") {
          allAvailable = false;
          return;
        }
        const itemCost = (offer.price - (offer.discount || 0)) * item.qty;
        subtotal += itemCost;
        items.push({
          productId: item.productId,
          qty: item.qty,
          product: products.find((p) => p.id === item.productId),
          itemCost,
          offer,
        });
      });
      if (!allAvailable || items.length !== list.items.length) return;
      const total = subtotal + offerDelivery(retailer.id, items) + offerPlatform(retailer.id, items);
      if (!bestSingle || total < bestSingle.total) {
        bestSingle = {
          retailer,
          items,
          subtotal,
          delivery: offerDelivery(retailer.id, items),
          platformFee: offerPlatform(retailer.id, items),
          total,
        };
      }
    });

    function offerDelivery(rid, items) {
      // Use first item's offer delivery
      const first = items[0];
      return first?.offer?.delivery ?? 0;
    }
    function offerPlatform(rid, items) {
      const first = items[0];
      return first?.offer?.platformFee ?? 0;
    }

    return {
      itemPicks,
      splitGroups,
      splitTotal,
      bestSingle,
      savings:
        bestSingle && splitTotal < bestSingle.total
          ? bestSingle.total - splitTotal
          : 0,
    };
  }, [list]);

  if (!list) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">List not found</p>
        <button
          onClick={() => navigate("/lists")}
          className="mt-4 text-teal-600 font-medium"
        >
          Back to lists
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-10 h-10 border-3 border-teal-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 animate-pulse-soft">
          Optimising your basket across retailers…
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-16 text-slate-500 text-sm">
        Add items to the list first.
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start gap-3">
        <button
          onClick={() => navigate("/lists")}
          className="mt-1 p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-bold text-lg text-slate-900">Smart Basket</h1>
          <p className="text-sm text-slate-500">{list.name}</p>
        </div>
      </div>

      {/* Savings highlight */}
      {result.savings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
            <Sparkles size={16} />
          </div>
          <div className="text-sm">
            <span className="font-semibold text-green-800">
              Split basket saves {formatINR(result.savings)}
            </span>
            <span className="text-green-700">
              {" "}
              vs buying everything from one store
            </span>
          </div>
        </div>
      )}

      {/* Comparison cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Split */}
        <div className="bg-white rounded-xl border-2 border-teal-400 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Split size={16} className="text-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wide text-teal-700">
              Optimal Split
            </span>
            <span className="ml-auto inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
              Recommended
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatINR(result.splitTotal)}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Across {result.splitGroups.length} retailer
            {result.splitGroups.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Single */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Store size={16} className="text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Single Retailer
            </span>
          </div>
          {result.bestSingle ? (
            <>
              <div className="text-2xl font-bold text-slate-900">
                {formatINR(result.bestSingle.total)}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                All from {result.bestSingle.retailer.name}
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-400 mt-2">
              No single retailer has all items in stock
            </p>
          )}
        </div>
      </div>

      {/* Split breakdown */}
      <div>
        <h2 className="font-semibold text-slate-900 text-sm mb-3">
          Split basket breakdown
        </h2>
        <div className="space-y-3">
          {result.splitGroups.map((g) => (
            <div
              key={g.retailerId}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: g.retailer?.logoColor }}
                  >
                    {g.retailer?.name?.charAt(0)}
                  </div>
                  <span className="font-medium text-sm">{g.retailer?.name}</span>
                  {!g.meetsMin && (
                    <span className="text-[10px] text-amber-600 font-medium">
                      Below min order
                    </span>
                  )}
                </div>
                <span className="font-semibold text-sm">{formatINR(g.total)}</span>
              </div>
              <div className="divide-y divide-slate-50">
                {g.items.map((pick) => (
                  <div
                    key={pick.productId}
                    className="px-4 py-2 flex items-center gap-2 text-sm"
                  >
                    <span>{pick.product?.imageEmoji}</span>
                    <span className="flex-1 truncate">
                      {pick.product?.name} × {pick.qty}
                    </span>
                    <span className="text-slate-600 font-medium">
                      {formatINR(pick.best.itemCost)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 text-[11px] text-slate-400 border-t border-slate-50 flex gap-4">
                <span>Subtotal {formatINR(g.subtotal)}</span>
                <span>
                  Delivery {g.delivery === 0 ? "Free" : formatINR(g.delivery)}
                </span>
                <span>
                  Platform {g.platformFee === 0 ? "—" : formatINR(g.platformFee)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single breakdown if available */}
      {result.bestSingle && (
        <div>
          <h2 className="font-semibold text-slate-900 text-sm mb-3">
            Single-retailer alternative
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: result.bestSingle.retailer.logoColor }}
              >
                {result.bestSingle.retailer.name.charAt(0)}
              </div>
              <span className="font-medium text-sm">
                {result.bestSingle.retailer.name}
              </span>
              <span className="ml-auto font-semibold">
                {formatINR(result.bestSingle.total)}
              </span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Items subtotal</span>
                <span>{formatINR(result.bestSingle.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {result.bestSingle.delivery === 0
                    ? "Free"
                    : formatINR(result.bestSingle.delivery)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Platform fee</span>
                <span>
                  {result.bestSingle.platformFee === 0
                    ? "—"
                    : formatINR(result.bestSingle.platformFee)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
