import { products, retailers } from "../data/mockData";
import {
  Package,
  Store,
  Users,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: Package,
      color: "bg-teal-100 text-teal-700",
    },
    {
      label: "Total Merchants",
      value: retailers.filter((r) => r.type === "local").length + 2,
      icon: Users,
      color: "bg-violet-100 text-violet-700",
    },
    {
      label: "Active Retailers",
      value: retailers.length,
      icon: Store,
      color: "bg-blue-100 text-blue-700",
    },
  ];

  const scraperHealth = [
    { name: "QuickBasket connector", status: "green", last: "12 min ago" },
    { name: "BigMart Online API", status: "green", last: "8 min ago" },
    { name: "GreenGrocer Express", status: "yellow", last: "1 hr ago" },
    { name: "Sharma General (Excel)", status: "green", last: "2 hrs ago" },
    { name: "ValueBazaar scraper", status: "red", last: "Failed · 4 hrs ago" },
  ];

  const statusIcon = {
    green: <CheckCircle2 size={16} className="text-green-600" />,
    yellow: <AlertTriangle size={16} className="text-amber-500" />,
    red: <XCircle size={16} className="text-red-500" />,
  };

  const statusBg = {
    green: "bg-green-50 border-green-200",
    yellow: "bg-amber-50 border-amber-200",
    red: "bg-red-50 border-red-200",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-bold text-xl text-slate-900">Admin Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Prototype overview · mock data only
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-slate-200 p-3 text-center"
          >
            <div
              className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center mx-auto mb-2`}
            >
              <s.icon size={18} />
            </div>
            <div className="text-xl font-bold text-slate-900">{s.value}</div>
            <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scraper health */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          <Activity size={16} className="text-slate-500" />
          <h2 className="font-semibold text-sm">Scraper / Connector Health</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {scraperHealth.map((s) => (
            <div
              key={s.name}
              className={`px-4 py-3 flex items-center gap-3 ${statusBg[s.status]} border-l-4 ${
                s.status === "green"
                  ? "border-l-green-500"
                  : s.status === "yellow"
                  ? "border-l-amber-400"
                  : "border-l-red-500"
              }`}
            >
              {statusIcon[s.status]}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900">{s.name}</div>
                <div className="text-xs text-slate-500">{s.last}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retailers list */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <h2 className="font-semibold text-sm">Retailers</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {retailers.map((r) => (
            <div key={r.id} className="px-4 py-3 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: r.logoColor }}
              >
                {r.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs text-slate-500 capitalize">
                  {r.type.replace("-", " ")} · {r.deliveryTime} · Min{" "}
                  ₹{r.minOrder}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
