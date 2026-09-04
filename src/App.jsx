import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./hooks/useToast";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductComparison from "./pages/ProductComparison";
import PriceHistory from "./pages/PriceHistory";
import ShoppingLists from "./pages/ShoppingLists";
import SmartBasket from "./pages/SmartBasket";
import MerchantPortal from "./pages/MerchantPortal";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductComparison />} />
            <Route path="/product/:productId/history" element={<PriceHistory />} />
            <Route path="/lists" element={<ShoppingLists />} />
            <Route path="/smart-basket/:listId" element={<SmartBasket />} />
            <Route path="/merchant" element={<MerchantPortal />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
