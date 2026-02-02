import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

/* ===== base.css ===== */
/* ============================
   Base styles (site-wide)
   - Font import
   - Global defaults
   - Basic typography and spacing
============================ */

/* Import Google Font (Poppins)
   Note: @import must come before all other rules */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");

/* Global defaults:
   - Use border-box sizing so width includes padding + border
   - These rules apply to every element on the page */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Page-level defaults for the whole site */
body {
  /* Main font stack: Poppins first, then system fallbacks */
  font-family: "Poppins", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;

  /* Remove browser default spacing so we can control it ourselves */
  margin: 0;
  padding: 0;

  /* Light background and dark text for good contrast */
  background-color: #faf5ef;
  color: #222;
}

/* Default styling for content sections */
section {
  background-color: #ffffff;
  margin: 1.5rem 0;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

/* Heading colors to create a simple hierarchy */
h2 {
  margin-top: 0;
  color: #d35400;
}

h3 {
  color: #34495e;
}

/* Base article spacing (non-grid layouts) */
article {
  padding-top: 1rem;
  margin-top: 1rem;
}

/* Basic typography and spacing for lists and paragraphs */
ul {
  padding-left: 1.25rem;
}

ul li {
  margin-bottom: 0.25rem;
}

p {
  line-height: 1.5; /* make paragraphs easier to read */
}


/* ===== layout.css ===== */
/* ============================
   Layout styles (shared on all pages)
   - Mobile-first defaults
   - Enhance for larger screens with a media query
============================ */

/* Main layout container
   - On mobile: full width with padding
   - On larger screens: max-width + centered (see media query) */
main {
  margin: 0 auto;
  padding: 1rem;
}

/* ============================
   Header hero section
   - Background image + dark overlay
============================ */

header {
   background-image: url("/images/pizza-hero.jpg"); /* path to your new pizza image */

   background-color: rgba(0, 0, 0, 0.3); 
   background-blend-mode: darken; /* blends the background-color with the background image */

   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;

   color: #fff;          /* white text on dark overlay */
   padding: 2.5rem 1rem;   /* a bit smaller on mobile */
}

/* ============================
   Header inner layout (mobile)
   - Brand stacked above nav
   - Both centered
============================ */

.header-inner {
  margin: 0 auto;
  max-width: 100%;

  display: flex;
  flex-direction: column;   /* stack brand and nav */
  align-items: center;      /* center horizontally */
  gap: 1rem;
  text-align: center;       /* center text inside brand */
}

/* Brand (logo + tagline) */
.brand h1 {
  font-size: 2.7rem;        /* slightly bigger for small screens */
  margin: 0 0 0.25rem;
}

.brand p {
  font-size: 0.95rem;
  margin: 0;
  opacity: 0.9;
}

/* ============================
   Navigation styles (mobile-first)
   - Nav appears under logo
   - Links centered and wrap nicely
============================ */

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-wrap: wrap;          /* allow wrapping on small screens */
  gap: 0.5rem;
  justify-content: center;  /* center nav under the logo */
}

nav a {
  display: inline-block;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;         /* pill shape */
  background: rgba(0, 0, 0, 0.35);
  color: #ffe066;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

nav a:hover {
  background: rgba(0, 0, 0, 0.65);
}

/* ============================
   Footer
============================ */

footer {
  background-color: #2b2d42;
  color: #fff;
  padding: 1.5rem 1rem;
  text-align: center;
}

footer p {
  margin: 0;
  font-size: 0.9rem;
}

/* ============================
   MEDIA QUERY: larger screens
   - Apply at ~768px and up
   - Brand left, nav right
============================ */

@media (min-width: 1000px) {
  main {
    max-width: 1200px;      /* constrain content width on larger screens */
  }

  header {
    padding: 4rem 1rem;     /* taller hero on desktop */
  }

  .header-inner {
    max-width: 1200px;
    flex-direction: row;    /* brand | nav side by side */
    align-items: center;
    justify-content: space-between;
    text-align: left;       /* reset brand text alignment */
  }

  .brand h1 {
    font-size: 2.3rem;
  }

  .brand p {
    font-size: 1rem;
  }

  nav ul {
    justify-content: flex-end;  /* push nav to the right on desktop */
    gap: 0.75rem;
  }

  nav a {
    font-size: 1.05rem;
  }
}


/* ===== about.css ===== */
/* ============================
   About section layout
   - Mobile-first
   - Stack content by default
   - Switch to two columns on larger screens
============================ */

#about {
  padding: 1.25rem 1rem;   /* slightly smaller on mobile */
}

/* MOBILE DEFAULT:
   - Stack text and hours card vertically */
.about-layout {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Left column (on desktop), top block (on mobile) */
.about-text {
  flex: 2;
}

.about-text p {
  margin-bottom: 0.75rem;
}

/* Small tagline above the main copy */
.about-tagline {
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #b45b1f;
  margin-bottom: 0.9rem;
}

/* Hours card */
.about-hours {
  flex: 1;
  background-color: #fffaf2;
  border-radius: 10px;
  padding: 1rem 1.1rem;
  border: 1px solid #f1e0c8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  /* On mobile, let it be full width */
  min-width: 0;
  max-width: 100%;
}

.about-hours h3 {
  margin: 0 0 0.6rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #d35400;
}

/* Hours list: stacked rows with two sides:
   left = day, right = time */
.hours-list {
  margin: 0;
  padding: 0;
}

.hours-row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.3rem 0;
  border-bottom: 1px dashed #f1e0c8;
  font-size: 0.95rem;
}

.hours-row:last-child {
  border-bottom: none;
}

.hours-row dt {
  font-weight: 600;
}

.hours-row dd {
  margin: 0;
  text-align: right;
}

/* ============================
   About page – reviews section
============================ */

.about-reviews {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f1e0c8;
}

.about-reviews h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #34495e;
}

.reviews-list {
  display: grid;
  gap: 0.75rem;
}

.review-card {
  background-color: #fffaf2;
  border-radius: 8px;
  padding: 0.9rem 1rem;
  border: 1px solid #f1e0c8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.review-quote {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.review-meta {
  margin: 0;
  font-size: 0.85rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  color: #555;
}

.review-rating {
  font-size: 0.85rem;
  color: #e0a800; /* gold-ish stars */
}



/* ============================
   MEDIA QUERY: larger screens
   - Switch About section to 2 columns
============================ */

@media (min-width: 768px) {
  #about {
    padding: 1.75rem 2rem;
  }

  .about-layout {
    flex-direction: row;       /* text | hours side by side */
    align-items: flex-start;
    gap: 2rem;
  }

  .about-hours {
    min-width: 240px;
    max-width: 280px;          /* only constrain width on larger screens */
  }
}


/* ===== menu.css ===== */
/* ============================
   Menu page layout (mobile-first)
   - Default: single-column list
   - Larger screens: 2-column grid
   - Each card: image + text
============================ */

/* MOBILE DEFAULT:
   - One card per row */
.menu-columns {
  display: grid;                  /* CSS Grid for the overall layout */
  grid-template-columns: 1fr;     /* single column on small screens */
  gap: 1rem;                      /* space between cards */
  align-items: stretch;
}

/* Individual menu cards */
.menu-columns article {
  margin: 0;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  background-color: #fffdf8;
  border: 1px solid #f1e0c8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* Card heading (e.g., “Margherita Pizza”) */
.menu-columns h3 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
}

/* Inside each card:
   MOBILE DEFAULT: stack image above text */
.menu-card-content {
  display: flex;
  flex-direction: column;   /* image on top, text below */
  align-items: flex-start;
  gap: 0.75rem;
}

/* Image container (figure) */
.menu-card-content figure {
  flex: 0 0 auto;
  margin: 0;
  padding: 0.4rem;
  border-radius: 12px;
  background-color: #fff;   /* white card inside the creamy card */
  border: 1px solid #f1e0c8;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  text-align: center;
  width: 100%;              /* let it fill the card width on mobile */
}

/* Menu item image */
.menu-card-content img {
  display: block;
  width: 100%;             /* fill the figure width */
  height: auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}

/* Small caption under the image (optional) */
.menu-card-content figcaption {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #777;
}

/* Text column under the image on mobile */
.menu-card-text {
  flex: 1;
}

/* Description + price text */
.menu-card-text p {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
  line-height: 1.45;
}

/* Last paragraph often used for price or highlight line */
.menu-card-text p:last-of-type {
  margin-top: 0.25rem;
  font-weight: 500;
}

/* ============================
   MEDIA QUERY: larger screens
   - 2 columns
   - Image + text side by side
============================ */

@media (min-width: 768px) {
  .menu-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2 equal-width columns */
    gap: 1.25rem;
  }

  .menu-card-content {
    flex-direction: row;   /* image | text side by side */
    align-items: flex-start;
    gap: 0.9rem;
  }

  .menu-card-content figure {
    flex: 0 0 130px;       /* fixed image column width on larger screens */
    width: auto;           /* let flexbox control the width now */
  }
}


/* ===== specials.css ===== */
/* ============================
   Specials page layout (mobile-first)
   - Responsive grid of “special” cards
   - 1 column on small screens
   - Automatically becomes 2–3 columns on larger screens
============================ */

/* Specials section layout */
.specials-grid {
  display: grid;
  /* auto-fit + minmax:
     - Each card must be at least 220px wide
     - The grid automatically adds more columns as space allows
     - On small screens: 1 column
     - On wider screens: 2 or 3 columns, no media queries needed */
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  align-items: stretch;
}

/* Individual specials cards */
.special-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
  border: 1px solid #f2e2cc;

  display: flex;           /* stack content vertically inside the card */
  flex-direction: column;
  margin-top: 0;           /* override base article margin so rows line up evenly */
}

/* Consistent spacing inside each card */
.special-card h3 {
  margin: 0 0 0.75rem;
}

.special-card p {
  margin: 0 0 0.5rem;
}

/* Optional styling for the "day" label */
.special-day {
  margin-bottom: 0.5rem;
}

/* Tag line at the bottom (e.g., “Dine-in only”) */
.special-tag {
  margin-top: auto;        /* push this to the bottom of the card */
  margin-bottom: 0;
  font-size: 0.9rem;
  color: #7f7f7f;
}


/* ===== order.css ===== */
/* ============================
   Order page – menu + cart layout
   - Mobile-first (stacked)
   - Larger screens: menu left, cart right
============================ */


/* Main order section tweaks */
#order {
  /* #order already gets the section card styling from base.css */
}

/* Short intro under the h2 */
#order-description {
  margin: 0.25rem 0 1.25rem;
  font-size: 0.95rem;
  color: #555;
}

/* Layout wrapper for menu + cart */
.order-layout {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column; /* mobile-first: stacked */
  gap: 1rem;
}

/* Shared panel styling for Menu + Cart
   (these should look like matching cards) */
.order-menu,
.order-cart {
  background-color: #fff6ea;
  border-radius: 10px;
  border: 1px solid #f1e0c8;
  padding: 1.25rem 1.5rem;

  /* Remove the generic section margin from base.css on the inner menu section */
  margin: 0;
}

/* Panel headings */
.order-menu h3,
.order-cart h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #2b2d42;
}

/* Subtext under Menu heading */
#menu-status {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: #555;
}

/* ============================
   Menu list styles
============================ */

.menu-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Each menu item as a soft card */
.pizza-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  padding: 0.9rem 1rem;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #f1e0c8;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* Left side: name + description */
.pizza-card__body {
  flex: 1;
}

.pizza-card__title {
  margin: 0 0 0.25rem;
  font-weight: 600;
  font-size: 1rem;
  color: #2b2d42;
}

.pizza-card__description {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  color: #555;
}

.pizza-card__prices {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

.pizza-card__prices strong {
  color: #d35400;
}

/* Right side: size select + button */
.pizza-card__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  min-width: 150px;
}

.pizza-card__actions label {
  font-size: 0.85rem;
}

/* Basic pill button */
.btn {
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background-color: #e67e22;
  color: #fff;
}

.btn-primary:hover {
  background-color: #cf711f;
}

/* ============================
   Cart styles
============================ */

.cart-list {
  list-style: none;
  padding-left: 0;
  margin: 0 0 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Empty state text */
.cart-empty {
  font-size: 0.9rem;
  color: #666;
}

/* Cart item row */
.cart-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #f1e0c8;
}

/* Top row: name + size */
.cart-item__info {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.cart-item__info strong {
  font-size: 0.95rem;
  color: #2b2d42;
}

.cart-item__size {
  font-size: 0.8rem;
  color: #777;
}

/* Bottom row: qty, subtotal, remove */
.cart-item__controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.cart-item__controls label {
  font-size: 0.85rem;
}

.cart-item__controls input[type="number"] {
  width: 3rem;
  padding: 0.2rem 0.3rem;
  font-size: 0.85rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.cart-item__subtotal {
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: 600;
  color: #d35400;
}

.cart-item__remove {
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  border: none;
  font-size: 0.8rem;
  background-color: #ff7675;
  color: #fff;
  cursor: pointer;
}

.cart-item__remove:hover {
  background-color: #e76260;
}

/* Cart total & actions */
.cart-total {
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: #2b2d42;
}

.cart-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

#cart-clear {
  padding: 0.45rem 1.2rem;
  border-radius: 999px;
  border: none;
  background-color: #f1f1f1;
  color: #444;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

#cart-clear:hover {
  background-color: #e0e0e0;
}

#cart-checkout {
  padding: 0.45rem 1.4rem;
  border-radius: 999px;
  border: none;
  background-color: #e67e22;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

#cart-checkout:hover {
  background-color: #cf711f;
}

.order-status {
  margin-top: 0.6rem;
  font-size: 0.9rem;
  color: #444;
}

/* ============================
   Responsive layout
   - Switch to two columns at 900px+
   - Make panels equal height
============================ */

@media (min-width: 900px) {
  .order-layout {
    flex-direction: row;
    align-items: stretch; /* 🔑 panels now share height */
  }

  .order-menu,
  .order-cart {
    display: flex;
    flex-direction: column;
  }

  .order-menu {
    flex: 2;
  }

  .order-cart {
    flex: 1;
    max-width: 360px;
  }

  .menu-list,
  .cart-list {
    flex: 1; /* let lists grow to fill vertical space */
  }

  /* Slightly denser cart items on desktop */
  .cart-item {
    flex-direction: row;
    align-items: center;
  }

  .cart-item__controls {
    margin-left: auto;
    justify-content: flex-end;
  }
}

/* ============================
   Mobile tweaks
============================ */

@media (max-width: 899px) {
  .pizza-card {
    flex-direction: column;
    align-items: stretch;
  }

  .pizza-card__actions {
    align-items: flex-start;
  }
}


/* ===== contact.css ===== */
/* ============================
   Contact page styles (mobile-first)
   - Default: stacked cards
   - Larger screens: cards side by side
   - Button-style links for actions
============================ */

/* Contact section uses the page background
   (we remove the default section styling from base.css) */
#contact {
  background: transparent;
  box-shadow: none;
  padding: 0;
}

/* MOBILE DEFAULT:
   - Stack contact cards in a single column */
.contact-layout {
  display: flex;
  flex-direction: column;  /* cards on top of each other */
  gap: 1rem;
  align-items: stretch;
  margin-top: 1rem;
}

/* Each contact "card" box */
.contact-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.contact-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #d35400;
}

/* Use normal font style instead of italic for address text */
#contact address {
  font-style: normal;
}

/* Contact links (phone, email, etc.) */
#contact a {
  color: #d35400;
  text-decoration: none;
}

#contact a:hover {
  text-decoration: underline;
}

/* ============================
   Contact actions
   - “Call” / “Email” buttons
============================ */

.contact-actions {
  margin-top: 1rem;
  display: flex;      /* lay buttons out in a row */
  gap: 0.75rem;
  flex-wrap: wrap;    /* let them wrap on small screens */
}

/* Button-style links */
.contact-button {
  display: inline-block;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  border-radius: 999px;          /* pill shape */
  border: none;
  background-color: #e67e22;
  color: #fff !important;
  font-weight: 600;
  text-decoration: none !important;
  cursor: pointer;
}

.contact-button:hover {
  background-color: #cf711f;
}

/* ============================
   MEDIA QUERY: larger screens
   - Place cards side by side
============================ */

@media (min-width: 768px) {
  .contact-layout {
    flex-direction: row;   /* cards in a row on larger screens */
    gap: 1.5rem;
  }

  .contact-card {
    flex: 1;               /* cards share space evenly */
  }
}


`;
