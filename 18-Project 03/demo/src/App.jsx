import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Specials from "./pages/Specials.jsx";
import Order from "./pages/Order.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";

export default function App() {

  /* App.jsx typically holds:
   * - Global layout
   *  - Routing
   * - Shared UI (header, footer, nav)
   *
   * It should NOT contain heavy business logic.
   * That logic belongs in page or component files.
  */

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        {/* Redirect unknown routes back home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
