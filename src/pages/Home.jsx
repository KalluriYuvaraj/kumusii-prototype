import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingDown } from "lucide-react";
import { products, getStartingFrom, formatINR } from "../data/mockData";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const featured = products.filter((p) => p.popular);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-5 text-white shadow-lg shadow-teal-600/20">
        <h1 className="text-xl font-bold tracking-tight">
          Compare grocery prices
        </h1>
        <p className="text-teal-100 text-sm mt-1">
          Find the lowest final price across QuickBasket, BigMart, local stores & quick delivery apps
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search atta, milk, oil, rice…"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="absolute z-20 mt-1.5 w-full bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
            {suggestions.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setQuery("");
                  navigate(`/product/${p.id}`);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-0"
              >
                <span className="text-2xl">{p.imageEmoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-slate-900 truncate">
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {p.brand} · {p.packSize}
                  </div>
                </div>
                <div className="text-xs font-semibold text-teal-700">
                  from {formatINR(getStartingFrom(p.id))}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Featured */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-slate-900">Popular products</h2>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <TrendingDown size={12} /> Best prices highlighted
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {featured.map((p) => {
            const start = getStartingFrom(p.id);
            return (
              <button
                key={p.id}
                onClick={() => navigate(`/product/${p.id}`)}
                className="bg-white rounded-xl border border-slate-200 p-3 text-left hover:border-teal-300 hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="w-full aspect-square rounded-lg bg-slate-50 flex items-center justify-center text-4xl mb-2">
                  {p.imageEmoji}
                </div>
                <div className="font-medium text-sm text-slate-900 line-clamp-2 leading-snug">
                  {p.name}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{p.packSize}</div>
                <div className="mt-2 text-sm font-semibold text-teal-700">
                  starting from {formatINR(start)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* All products */}
      <div>
        <h2 className="font-semibold text-slate-900 mb-3">All products</h2>
        <div className="space-y-2">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="w-full flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-3 text-left hover:border-teal-300 transition-colors"
            >
              <span className="text-2xl w-10 text-center">{p.imageEmoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{p.name}</div>
                <div className="text-xs text-slate-500">
                  {p.brand} · {p.packSize}
                </div>
              </div>
              <div className="text-sm font-semibold text-teal-700">
                {formatINR(getStartingFrom(p.id))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
