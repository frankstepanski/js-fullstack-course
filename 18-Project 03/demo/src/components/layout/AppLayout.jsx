import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import styles from "./layout.module.css";

/**
 * AppLayout:
 * - Shared layout wrapper for every page
 * - Keeps UI DRY (no copy/paste headers across pages)
 */
export default function AppLayout({ children }) {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.main} id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
