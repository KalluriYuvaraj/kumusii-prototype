import { useState } from "react";
import { LogIn, Save, RefreshCw, Package } from "lucide-react";
import { products, offers, formatINR } from "../data/mockData";
import { useToast } from "../hooks/useToast";

// Merchant is fixed to "sharma" for the prototype
const MERCHANT_ID = "sharma";
const MERCHANT_NAME = "Sharma General Store";

export default function MerchantPortal() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localOffers, setLocalOffers] = useState(() => {
    // Deep copy of this merchant's offers
    const copy = {};
    Object.entries(offers).forEach(([pid, byRetailer]) => {
      if (byRetailer[MERCHANT_ID]) {
        copy[pid] = { ...byRetailer[MERCHANT_ID] };
      }
    });
    return copy;
  });
  const [editing, setEditing] = useState(null); // productId
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("in_stock");
  const { showToast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    // Any input works
    setLoggedIn(true);
    showToast(`Welcome, ${MERCHANT_NAME}`);
  };

  const startEdit = (productId) => {
    const o = localOffers[productId];
    setEditing(productId);
    setEditPrice(String(o.price));
    setEditStock(o.stock);
  };

  const saveEdit = () => {
    if (!editing) return;
    const price = parseInt(editPrice, 10);
    if (isNaN(price) || price < 0) {
      showToast("Enter a valid price", "error");
      return;
    }
    setLocalOffers((prev) => ({
      ...prev,
      [editing]: {
        ...prev[editing],
        price,
        stock: editStock,
        lastChecked: new Date().toISOString(),
      },
    }));
    setEditing(null);
    showToast("Price & stock updated (local only)");
  };

  if (!loggedIn) {
    return (
      <div className="max-w-sm mx-auto mt-8 animate-fade-in">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold">
              S
            </div>
            <div>
              <h1 className="font-bold text-lg">Merchant Portal</h1>
              <p className="text-xs text-slate-500">Demo login — any credentials work</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="merchant@sharma.com"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700"
            >
              <LogIn size={16} /> Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  const rows = Object.entries(localOffers).map(([productId, offer]) => {
    const product = products.find((p) => p.id === productId);
    return { productId, product, offer };
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-slate-900">{MERCHANT_NAME}</h1>
          <p className="text-xs text-slate-500">Merchant dashboard</p>
        </div>
        <button
          onClick={() => setLoggedIn(false)}
          className="text-xs text-slate-500 hover:text-slate-700"
        >
          Sign out
        </button>
      </div>

      {/* Sync status */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <RefreshCw size={18} className="text-green-600" />
        </div>
        <div>
          <div className="text-sm font-medium text-slate-900">Sync Status</div>
          <div className="text-xs text-slate-500">
            Last synced 2 hours ago via Excel Upload
          </div>
        </div>
        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
          Connected
        </span>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          <Package size={16} className="text-slate-500" />
          <h2 className="font-semibold text-sm">Your products</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {rows.map(({ productId, product, offer }) => (
            <div key={productId} className="px-4 py-3">
              {editing === productId ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{product?.imageEmoji}</span>
                    <span className="font-medium text-sm">{product?.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-500">Price (₹)</label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-slate-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500">Stock</label>
                      <select
                        value={editStock}
                        onChange={(e) => setEditStock(e.target.value)}
                        className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-slate-200 text-sm"
                      >
                        <option value="in_stock">In stock</option>
                        <option value="low_stock">Low stock</option>
                        <option value="out_of_stock">Out of stock</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-medium"
                    >
                      <Save size={12} /> Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xl">{product?.imageEmoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {product?.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {product?.packSize}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {formatINR(offer.price)}
                    </div>
                    <div
                      className={`text-[10px] font-medium ${
                        offer.stock === "in_stock"
                          ? "text-green-600"
                          : offer.stock === "low_stock"
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {offer.stock.replace(/_/g, " ")}
                    </div>
                  </div>
                  <button
                    onClick={() => startEdit(productId)}
                    className="text-xs font-medium text-teal-600 hover:text-teal-700 px-2 py-1"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
