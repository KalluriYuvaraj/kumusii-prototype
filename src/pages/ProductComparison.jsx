import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  X,
  Sparkles,
  Clock,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import {
  products,
  retailers,
  offers,
  finalPayable,
  formatINR,
  getAIRecommendation,
} from "../data/mockData";
import { useToast } from "../hooks/useToast";

export default function ProductComparison() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [recAccepted, setRecAccepted] = useState(null);

  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, [productId]);

  const rows = useMemo(() => {
    if (!product) return [];
    const productOffers = offers[productId] || {};
    return retailers
      .map((r) => {
        const offer = productOffers[r.id];
        if (!offer) return null;
        const final = finalPayable(offer);
        return { retailer: r, offer, final };
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a.final == null) return 1;
        if (b.final == null) return -1;
        return a.final - b.final;
      });
  }, [product, productId]);

  const bestFinal = rows.find((r) => r.final != null)?.final;
  const worstFinal = [...rows].reverse().find((r) => r.final != null)?.final;
  const savings = bestFinal != null && worstFinal != null ? worstFinal - bestFinal : 0;

  const recommendation = getAIRecommendation(productId);

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Product not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-teal-600 font-medium"
        >
          Back to home
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-10 h-10 border-3 border-teal-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-500 animate-pulse-soft">
          Comparing prices across retailers…
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Back + product header */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => navigate(-1)}
          className="mt-1 p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 flex gap-3">
          <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-3xl shrink-0">
            {product.imageEmoji}
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-slate-500">
              {product.brand} · {product.packSize}
            </p>
            <Link
              to={`/product/${productId}/history`}
              className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 mt-1.5"
            >
              <TrendingUp size={12} /> View price history
            </Link>
          </div>
        </div>
      </div>

      {/* Savings banner */}
      {savings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
            <Check size={18} strokeWidth={2.5} />
          </div>
          <div className="text-sm">
            <span className="font-semibold text-green-800">
              Pay {formatINR(bestFinal)} instead of {formatINR(worstFinal)}
            </span>
            <span className="text-green-700"> — You save {formatINR(savings)}</span>
          </div>
        </div>
      )}

      {/* Retailer table */}
      <div className="space-y-2.5">
        <h2 className="font-semibold text-slate-900 text-sm">
          Prices at {rows.length} retailers
        </h2>
        {rows.map(({ retailer, offer, final }) => {
          const isBest = final != null && final === bestFinal;
          const isOos = offer.stock === "out_of_stock";
          return (
            <div
              key={retailer.id}
              className={`bg-white rounded-xl border p-3.5 transition-shadow ${
                isBest
                  ? "border-green-400 shadow-sm shadow-green-100"
                  : "border-slate-200"
              } ${isOos ? "opacity-60" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: retailer.logoColor }}
                  >
                    {retailer.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-slate-900 flex items-center gap-1.5 flex-wrap">
                      {retailer.name}
                      {isBest && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-800">
                          Best Price
                        </span>
                      )}
                      {offer.stock === "low_stock" && (
                        <span className="text-[10px] font-medium text-amber-600">
                          Low stock
                        </span>
                      )}
                      {isOos && (
                        <span className="text-[10px] font-medium text-red-600">
                          Out of stock
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock size={10} />
                      {retailer.deliveryTime} · Last checked{" "}
                      {new Date(offer.lastChecked).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {isOos ? (
                    <span className="text-sm text-slate-400">—</span>
                  ) : (
                    <>
                      <div className="font-bold text-base text-slate-900">
                        {formatINR(final)}
                      </div>
                      <div className="text-[11px] text-slate-400">final</div>
                    </>
                  )}
                </div>
              </div>

              {!isOos && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 grid grid-cols-4 gap-2 text-[11px]">
                  <div>
                    <div className="text-slate-400">Price</div>
                    <div className="font-medium">{formatINR(offer.price)}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Delivery</div>
                    <div className="font-medium">
                      {offer.delivery === 0 ? "Free" : formatINR(offer.delivery)}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">Platform</div>
                    <div className="font-medium">
                      {offer.platformFee === 0 ? "—" : formatINR(offer.platformFee)}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">Discount</div>
                    <div className="font-medium text-green-600">
                      {offer.discount ? `−${formatINR(offer.discount)}` : "—"}
                    </div>
                  </div>
                </div>
              )}

              {!isOos && (
                <button
                  disabled
                  className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-100 text-slate-500 text-xs font-medium cursor-not-allowed"
                  title="Opens retailer site (mock)"
                >
                  Buy on {retailer.name}
                  <ExternalLink size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* AI recommendation */}
      <div className="bg-gradient-to-br from-violet-50 to-teal-50 border border-violet-200/60 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-violet-600" />
          <span className="text-xs font-bold uppercase tracking-wide text-violet-700">
            AI recommendation
          </span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">{recommendation.text}</p>
        <p className="text-[11px] text-slate-500 mt-1.5">
          Explain why: based on current prices, stock & simple pack-size heuristics (mock rule).
        </p>
        {recAccepted === null ? (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                setRecAccepted(true);
                showToast("Recommendation accepted");
              }}
              className="flex-1 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700"
            >
              Accept
            </button>
            <button
              onClick={() => {
                setRecAccepted(false);
                showToast("Recommendation ignored", "info");
              }}
              className="flex-1 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50"
            >
              Ignore
            </button>
          </div>
        ) : (
          <div className="mt-3 text-xs font-medium text-slate-500">
            {recAccepted ? "✓ You accepted this tip" : "You ignored this tip"}
          </div>
        )}
      </div>
    </div>
  );
}
