// Kumusii Mock Dataset — groceries, retailers, prices, history

export const retailers = [
  {
    id: "quickbasket",
    name: "QuickBasket",
    type: "quick-commerce",
    deliveryTime: "10–20 min",
    minOrder: 99,
    logoColor: "#10B981",
  },
  {
    id: "bigmart",
    name: "BigMart Online",
    type: "online",
    deliveryTime: "Same day",
    minOrder: 199,
    logoColor: "#3B82F6",
  },
  {
    id: "greengrocer",
    name: "GreenGrocer Express",
    type: "quick-commerce",
    deliveryTime: "15–30 min",
    minOrder: 149,
    logoColor: "#22C55E",
  },
  {
    id: "sharma",
    name: "Sharma General Store",
    type: "local",
    deliveryTime: "2–4 hrs",
    minOrder: 50,
    logoColor: "#F59E0B",
  },
  {
    id: "valuebazaar",
    name: "ValueBazaar",
    type: "online",
    deliveryTime: "Next day",
    minOrder: 299,
    logoColor: "#8B5CF6",
  },
];

export const products = [
  {
    id: "atta-5kg",
    name: "Aashirvaad Atta",
    brand: "Aashirvaad",
    packSize: "5 kg",
    category: "Staples",
    imageEmoji: "🌾",
    popular: true,
  },
  {
    id: "salt-1kg",
    name: "Tata Salt",
    brand: "Tata",
    packSize: "1 kg",
    category: "Staples",
    imageEmoji: "🧂",
    popular: true,
  },
  {
    id: "milk-1l",
    name: "Amul Taaza Milk",
    brand: "Amul",
    packSize: "1 L",
    category: "Dairy",
    imageEmoji: "🥛",
    popular: true,
  },
  {
    id: "oil-1l",
    name: "Fortune Sunflower Oil",
    brand: "Fortune",
    packSize: "1 L",
    category: "Oils",
    imageEmoji: "🌻",
    popular: true,
  },
  {
    id: "maggi-12",
    name: "Maggi Noodles",
    brand: "Maggi",
    packSize: "12-pack (70g each)",
    category: "Instant",
    imageEmoji: "🍜",
    popular: true,
  },
  {
    id: "bread",
    name: "Britannia Bread",
    brand: "Britannia",
    packSize: "400 g",
    category: "Bakery",
    imageEmoji: "🍞",
    popular: false,
  },
  {
    id: "rice-5kg",
    name: "India Gate Basmati Rice",
    brand: "India Gate",
    packSize: "5 kg",
    category: "Staples",
    imageEmoji: "🍚",
    popular: true,
  },
  {
    id: "onion-1kg",
    name: "Red Onions",
    brand: "Fresh",
    packSize: "1 kg",
    category: "Vegetables",
    imageEmoji: "🧅",
    popular: true,
  },
  {
    id: "sugar-1kg",
    name: "Madhur Sugar",
    brand: "Madhur",
    packSize: "1 kg",
    category: "Staples",
    imageEmoji: "🍬",
    popular: false,
  },
  {
    id: "dal-1kg",
    name: "Toor Dal",
    brand: "Organic Tattva",
    packSize: "1 kg",
    category: "Pulses",
    imageEmoji: "🫘",
    popular: true,
  },
];

// productId -> retailerId -> offer
export const offers = {
  "atta-5kg": {
    quickbasket: { price: 278, mrp: 320, delivery: 25, platformFee: 5, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 265, mrp: 320, delivery: 40, platformFee: 10, discount: 15, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 272, mrp: 320, delivery: 20, platformFee: 5, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 255, mrp: 320, delivery: 0, platformFee: 0, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 269, mrp: 320, delivery: 49, platformFee: 15, discount: 20, stock: "low_stock", lastChecked: "2026-09-04T11:20:00" },
  },
  "salt-1kg": {
    quickbasket: { price: 28, mrp: 30, delivery: 15, platformFee: 3, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 26, mrp: 30, delivery: 30, platformFee: 5, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 27, mrp: 30, delivery: 15, platformFee: 3, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 25, mrp: 30, delivery: 0, platformFee: 0, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 24, mrp: 30, delivery: 40, platformFee: 8, discount: 2, stock: "in_stock", lastChecked: "2026-09-04T11:20:00" },
  },
  "milk-1l": {
    quickbasket: { price: 62, mrp: 66, delivery: 15, platformFee: 3, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 58, mrp: 66, delivery: 30, platformFee: 5, discount: 5, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 60, mrp: 66, delivery: 15, platformFee: 3, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 56, mrp: 66, delivery: 0, platformFee: 0, discount: 0, stock: "out_of_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 59, mrp: 66, delivery: 40, platformFee: 8, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T11:20:00" },
  },
  "oil-1l": {
    quickbasket: { price: 148, mrp: 175, delivery: 25, platformFee: 5, discount: 10, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 142, mrp: 175, delivery: 40, platformFee: 10, discount: 15, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 145, mrp: 175, delivery: 20, platformFee: 5, discount: 8, stock: "in_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 138, mrp: 175, delivery: 0, platformFee: 0, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 140, mrp: 175, delivery: 49, platformFee: 12, discount: 12, stock: "in_stock", lastChecked: "2026-09-04T11:20:00" },
  },
  "maggi-12": {
    quickbasket: { price: 138, mrp: 168, delivery: 20, platformFee: 5, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 132, mrp: 168, delivery: 35, platformFee: 8, discount: 10, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 135, mrp: 168, delivery: 20, platformFee: 5, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 128, mrp: 168, delivery: 0, platformFee: 0, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 130, mrp: 168, delivery: 45, platformFee: 10, discount: 15, stock: "in_stock", lastChecked: "2026-09-04T11:20:00" },
  },
  bread: {
    quickbasket: { price: 42, mrp: 45, delivery: 15, platformFee: 3, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 40, mrp: 45, delivery: 30, platformFee: 5, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 41, mrp: 45, delivery: 15, platformFee: 3, discount: 0, stock: "low_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 38, mrp: 45, delivery: 0, platformFee: 0, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 39, mrp: 45, delivery: 40, platformFee: 8, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T11:20:00" },
  },
  "rice-5kg": {
    quickbasket: { price: 620, mrp: 750, delivery: 30, platformFee: 8, discount: 20, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 595, mrp: 750, delivery: 49, platformFee: 12, discount: 30, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 610, mrp: 750, delivery: 25, platformFee: 8, discount: 15, stock: "in_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 580, mrp: 750, delivery: 0, platformFee: 0, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 589, mrp: 750, delivery: 59, platformFee: 15, discount: 25, stock: "in_stock", lastChecked: "2026-09-04T11:20:00" },
  },
  "onion-1kg": {
    quickbasket: { price: 38, mrp: 45, delivery: 15, platformFee: 3, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 35, mrp: 45, delivery: 30, platformFee: 5, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 36, mrp: 45, delivery: 15, platformFee: 3, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 32, mrp: 45, delivery: 0, platformFee: 0, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 34, mrp: 45, delivery: 40, platformFee: 8, discount: 0, stock: "out_of_stock", lastChecked: "2026-09-04T11:20:00" },
  },
  "sugar-1kg": {
    quickbasket: { price: 48, mrp: 55, delivery: 15, platformFee: 3, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 45, mrp: 55, delivery: 30, platformFee: 5, discount: 3, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 46, mrp: 55, delivery: 15, platformFee: 3, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 42, mrp: 55, delivery: 0, platformFee: 0, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 44, mrp: 55, delivery: 40, platformFee: 8, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T11:20:00" },
  },
  "dal-1kg": {
    quickbasket: { price: 168, mrp: 195, delivery: 20, platformFee: 5, discount: 10, stock: "in_stock", lastChecked: "2026-09-04T14:30:00" },
    bigmart: { price: 162, mrp: 195, delivery: 35, platformFee: 8, discount: 15, stock: "in_stock", lastChecked: "2026-09-04T13:45:00" },
    greengrocer: { price: 165, mrp: 195, delivery: 20, platformFee: 5, discount: 8, stock: "in_stock", lastChecked: "2026-09-04T15:10:00" },
    sharma: { price: 155, mrp: 195, delivery: 0, platformFee: 0, discount: 0, stock: "in_stock", lastChecked: "2026-09-04T12:00:00" },
    valuebazaar: { price: 159, mrp: 195, delivery: 45, platformFee: 10, discount: 12, stock: "in_stock", lastChecked: "2026-09-04T11:20:00" },
  },
};

// Price history: last ~18 days for selected products at 1–2 retailers
function generateHistory(basePrice, days = 18, volatility = 0.04) {
  const history = [];
  let price = basePrice;
  const start = new Date("2026-08-18");
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const change = (Math.random() - 0.48) * volatility * basePrice;
    price = Math.max(basePrice * 0.85, Math.round(price + change));
    history.push({
      date: d.toISOString().slice(0, 10),
      price,
    });
  }
  return history;
}

export const priceHistory = {
  "atta-5kg": {
    sharma: generateHistory(258, 18, 0.03),
    bigmart: generateHistory(270, 18, 0.035),
  },
  "oil-1l": {
    sharma: generateHistory(140, 18, 0.04),
    bigmart: generateHistory(148, 18, 0.045),
  },
  "rice-5kg": {
    sharma: generateHistory(585, 18, 0.025),
    valuebazaar: generateHistory(600, 18, 0.03),
  },
  "dal-1kg": {
    sharma: generateHistory(158, 18, 0.035),
    quickbasket: generateHistory(170, 18, 0.04),
  },
  "maggi-12": {
    sharma: generateHistory(130, 18, 0.03),
    bigmart: generateHistory(138, 18, 0.035),
  },
};

// Helpers
export function formatINR(amount) {
  if (amount == null || isNaN(amount)) return "₹0";
  return "₹" + Number(amount).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export function finalPayable(offer) {
  if (!offer || offer.stock === "out_of_stock") return null;
  return offer.price + offer.delivery + offer.platformFee - (offer.discount || 0);
}

export function getStartingFrom(productId) {
  const productOffers = offers[productId];
  if (!productOffers) return null;
  const payables = Object.values(productOffers)
    .map(finalPayable)
    .filter((v) => v != null);
  return payables.length ? Math.min(...payables) : null;
}

export function getBestOffer(productId) {
  const productOffers = offers[productId];
  if (!productOffers) return null;
  let best = null;
  let bestRetailer = null;
  for (const [rid, offer] of Object.entries(productOffers)) {
    const fp = finalPayable(offer);
    if (fp == null) continue;
    if (!best || fp < best.final) {
      best = { ...offer, final: fp };
      bestRetailer = rid;
    }
  }
  return best ? { offer: best, retailerId: bestRetailer } : null;
}

export function getAIRecommendation(productId) {
  const recs = {
    "atta-5kg": {
      text: "Buying the 5 kg pack instead of two 2.5 kg packs saves about ₹18 on average across stores.",
      type: "pack_size",
    },
    "milk-1l": {
      text: "Sharma General Store is currently out of stock. QuickBasket has the next-best final price with 15-min delivery.",
      type: "stock",
    },
    "onion-1kg": {
      text: "Onion prices are rising this week. Consider buying 2 kg now — historical data shows +12% average increase mid-week.",
      type: "trend",
    },
    "rice-5kg": {
      text: "ValueBazaar has a ₹25 coupon applied. Final payable is still higher than Sharma due to delivery — local wins today.",
      type: "coupon",
    },
    "oil-1l": {
      text: "BigMart’s current coupon expires tonight. Lock in ₹142 + fees before it reverts to ₹155.",
      type: "time_sensitive",
    },
  };
  return (
    recs[productId] || {
      text: "Prices look stable. The highlighted Best Price is the lowest final payable right now.",
      type: "default",
    }
  );
}
