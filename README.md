# Kumusii Prototype

Interactive grocery price-comparison prototype (demo / stakeholder review).

## Tech

- React 18 + Vite 5
- Tailwind CSS 4
- Recharts
- React Router
- Lucide icons
- Mock data only (no backend)

## Screens

1. **Home / Search** — live filter, product cards, starting-from prices  
2. **Product Comparison** — retailer table, final payable, Best Price badge, savings banner, AI tip  
3. **Price History** — Recharts line chart (~18 days)  
4. **Shopping Lists** — create / rename / delete, quantities, localStorage  
5. **Smart Basket** — single-retailer vs split-basket optimisation  
6. **Merchant Portal** — dummy login, edit price/stock  
7. **Admin Dashboard** — summary cards + scraper health

## Run locally

```bash
cd kumusii-prototype
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Demo path

1. Search or tap a popular product → comparison  
2. Note Best Price + savings banner  
3. Open **Price history**  
4. Go to **Lists** → Run Smart Basket on “Monthly Grocery”  
5. **Merchant** → sign in with anything → edit a price  
6. **Admin** → view connector health

## Notes

- All prices and history are hardcoded mock data  
- “Buy on [Retailer]” is intentionally disabled  
- Lists persist in `localStorage` under `kumusii_lists`  
- Brand colour: teal (`#0D9488`); savings accents: green  
