import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  products,
  retailers,
  priceHistory,
  formatINR,
} from "../data/mockData";

export default function PriceHistory() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === productId);
  const history = priceHistory[productId];

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">Product not found</p>
        <button onClick={() => navigate("/")} className="mt-4 text-teal-600 font-medium">
          Back to home
        </button>
      </div>
    );
  }

  if (!history) {
    return (
      <div className="space-y-4 animate-fade-in">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-500 text-sm">
            Price history not available for this product yet.
          </p>
          <Link
            to={`/product/${productId}`}
            className="inline-block mt-3 text-teal-600 text-sm font-medium"
          >
            Back to comparison
          </Link>
        </div>
      </div>
    );
  }

  // Merge histories for chart
  const retailerIds = Object.keys(history);
  const allDates = [
    ...new Set(
      retailerIds.flatMap((rid) => history[rid].map((h) => h.date))
    ),
  ].sort();

  const chartData = allDates.map((date) => {
    const point = { date };
    retailerIds.forEach((rid) => {
      const entry = history[rid].find((h) => h.date === date);
      if (entry) point[rid] = entry.price;
    });
    return point;
  });

  // Find lowest overall
  let lowest = { price: Infinity, date: null, retailerId: null };
  retailerIds.forEach((rid) => {
    history[rid].forEach((h) => {
      if (h.price < lowest.price) {
        lowest = { price: h.price, date: h.date, retailerId: rid };
      }
    });
  });

  const colors = {
    sharma: "#F59E0B",
    bigmart: "#3B82F6",
    quickbasket: "#10B981",
    greengrocer: "#22C55E",
    valuebazaar: "#8B5CF6",
  };

  const formatDate = (d) => {
    const dt = new Date(d);
    return dt.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start gap-3">
        <button
          onClick={() => navigate(-1)}
          className="mt-1 p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-bold text-lg text-slate-900">Price History</h1>
          <p className="text-sm text-slate-500">
            {product.name} · {product.packSize}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3">
        <TrendingDown size={18} className="text-green-700 shrink-0" />
        <div className="text-sm text-green-800">
          <span className="font-semibold">
            Lowest in last ~18 days: {formatINR(lowest.price)}
          </span>
          {" on "}
          {formatDate(lowest.date)} at{" "}
          {retailers.find((r) => r.id === lowest.retailerId)?.name || lowest.retailerId}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 11, fill: "#64748B" }}
                interval="preserveStartEnd"
              />
              <YAxis
                tickFormatter={(v) => `₹${v}`}
                tick={{ fontSize: 11, fill: "#64748B" }}
                width={48}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #E2E8F0",
                  fontSize: 12,
                }}
                formatter={(value, name) => [
                  formatINR(value),
                  retailers.find((r) => r.id === name)?.name || name,
                ]}
                labelFormatter={(label) => formatDate(label)}
              />
              <Legend
                formatter={(value) =>
                  retailers.find((r) => r.id === value)?.name || value
                }
                wrapperStyle={{ fontSize: 12 }}
              />
              {retailerIds.map((rid) => (
                <Line
                  key={rid}
                  type="monotone"
                  dataKey={rid}
                  stroke={colors[rid] || "#0D9488"}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Link
        to={`/product/${productId}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600"
      >
        <ArrowLeft size={14} /> Back to price comparison
      </Link>
    </div>
  );
}
