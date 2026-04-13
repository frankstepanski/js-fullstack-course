import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import SpecialsPage from "./pages/SpecialsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/specials" element={<SpecialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/order" element={<OrderPage />} />
        {/* Back-compat with vanilla paths */}
        <Route path="/pages/menu.html" element={<Navigate to="/menu" replace />} />
        <Route path="/pages/specials.html" element={<Navigate to="/specials" replace />} />
        <Route path="/pages/contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="/pages/order.html" element={<Navigate to="/order" replace />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
