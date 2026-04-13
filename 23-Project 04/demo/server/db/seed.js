/*
  db/seed.js — database seeding script

  What it does:
  1. Reads the SQL schema file and runs all CREATE TABLE IF NOT EXISTS statements
  2. Clears any existing rows in every table (so re-running is safe)
  3. Inserts the demo data that was previously stored in db.json

  How to run:
    npm run seed

  Why seed data matters:
  - a freshly created database has empty tables
  - seed data gives the app real-looking content to display
  - running the seed again resets everything back to this known state,
    which is useful during development
*/

import "dotenv/config";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pg from "pg";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// --- seed data (mirrors db.json) ---

const pizzas = [
  {
    id: "1",
    name: "The Classic Margherita",
    description: "Tomato sauce, fresh mozzarella, basil, and a drizzle of olive oil.",
    prices: { medium: 12, large: 15 },
    imageSrc: "../images/pizza-margherita.png",
    imageAlt: "Classic margherita pizza with tomato, mozzarella, and basil",
    imageCaption: "Simple, fresh, and delicious.",
  },
  {
    id: "2",
    name: "Moonlight Supreme",
    description: "Pepperoni, sausage, mushrooms, onions, and bell peppers on our signature crust.",
    prices: { medium: 16, large: 19 },
    imageSrc: "../images/pizza-supreme.png",
    imageAlt: "Supreme pizza with pepperoni, sausage, mushrooms, and peppers",
    imageCaption: "Loaded with toppings for big appetites.",
  },
  {
    id: "3",
    name: "Stargazer Veggie",
    description: "Spinach, olives, roasted red peppers, mushrooms, and feta cheese.",
    prices: { medium: 14, large: 17 },
    imageSrc: "../images/pizza-veggie.png",
    imageAlt: "Vegetarian pizza with spinach, olives, mushrooms, and peppers",
    imageCaption: "Colorful veggies on a crispy base.",
  },
  {
    id: "4",
    name: "Comet BBQ Chicken",
    description: "BBQ sauce, grilled chicken, red onions, and cilantro, topped with mozzarella and cheddar.",
    prices: { medium: 15, large: 18 },
    imageSrc: "../images/pizza-bbq.png",
    imageAlt: "BBQ chicken pizza with red onions and cilantro",
    imageCaption: "Smoky, tangy, and cheesy.",
  },
];

const specials = [
  {
    id: "1",
    dayLabel: "Monday",
    title: "2-for-1 Medium Pizzas",
    descriptionHtml: "Buy one medium pizza, get a second one <strong>50% off</strong>.",
    tagline: "Start the week with a deal ✨",
  },
  {
    id: "2",
    dayLabel: "Wednesday",
    title: "Free Drink with Any Large",
    descriptionHtml: "Order any large pizza and get a <strong>free soft drink</strong>.",
    tagline: "Midweek recharge 🥤",
  },
  {
    id: "3",
    dayLabel: "Friday Night",
    title: "Family Combo Feast",
    descriptionHtml: "<strong>2 large pizzas + breadsticks</strong> for one family-friendly price.",
    tagline: "Perfect for movie night 🎬",
  },
];

const contactCards = [
  {
    id: "1",
    type: "visit",
    title: "Visit Us",
    addressLines: ["123 Moonlight Lane", "Fictional City, Web 00000"],
    phoneDisplay: "(555) 987-6543",
    phoneHref: "tel:+15559876543",
    emailDisplay: "hello@moonlightpizza.example",
    emailHref: "mailto:hello@moonlightpizza.example",
    paragraphs: null,
    actions: null,
  },
  {
    id: "2",
    type: "info",
    title: "Get in Touch",
    addressLines: null,
    phoneDisplay: null,
    phoneHref: null,
    emailDisplay: null,
    emailHref: null,
    paragraphs: [
      "Have a question about your order, planning a party, or curious about our (fictional) catering options? We'd love to hear from you.",
      "For now, this is just a demo page, but it shows how you might highlight different ways to contact a real restaurant.",
    ],
    actions: [
      { kind: "primary", label: "Call Us", href: "tel:+15559876543" },
      { kind: "secondary", label: "Email Us", href: "mailto:hello@moonlightpizza.example" },
    ],
  },
];

const testimonials = [
  { id: "1", name: "Alex P.", quote: "The best crust I've ever had. Seriously addictive!", rating: 5 },
  { id: "2", name: "Jordan M.", quote: "Late-night slices that never miss. A true neighborhood favorite.", rating: 5 },
  { id: "3", name: "Sam K.", quote: "Friendly staff and creative specials every week.", rating: 4 },
  { id: "4", name: "Taylor R.", quote: "I stop by after work at least twice a week. The Margherita is elite.", rating: 5 },
  { id: "5", name: "Morgan L.", quote: "Perfect balance of crispy crust and gooey cheese. Never disappoints.", rating: 4 },
  { id: "6", name: "Chris J.", quote: "The Comet BBQ Chicken is my go-to. Smoky, tangy, and so good.", rating: 5 },
];

// Initial cart with a couple of demo items
const cartItems = [
  { key: "1-medium", pizzaId: "1", name: "The Classic Margherita", size: "medium", price: 12, quantity: 1, subtotal: 12 },
  { key: "3-medium", pizzaId: "3", name: "Stargazer Veggie", size: "medium", price: 14, quantity: 3, subtotal: 42 },
];

// --- helpers ---

async function runSchema(client) {
  const sql = readFileSync(join(__dirname, "schema.sql"), "utf-8");
  await client.query(sql);
  console.log("Schema applied.");
}

async function clearTables(client) {
  // Truncate in an order that avoids FK issues (no FKs here, but good habit)
  await client.query("TRUNCATE orders, cart, testimonials, contact_cards, specials, pizzas");
  console.log("Tables cleared.");
}

async function seedPizzas(client) {
  for (const p of pizzas) {
    await client.query(
      `INSERT INTO pizzas (id, name, description, prices, image_src, image_alt, image_caption)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [p.id, p.name, p.description, JSON.stringify(p.prices), p.imageSrc, p.imageAlt, p.imageCaption]
    );
  }
  console.log(`Seeded ${pizzas.length} pizzas.`);
}

async function seedSpecials(client) {
  for (const s of specials) {
    await client.query(
      `INSERT INTO specials (id, day_label, title, description_html, tagline)
       VALUES ($1, $2, $3, $4, $5)`,
      [s.id, s.dayLabel, s.title, s.descriptionHtml, s.tagline]
    );
  }
  console.log(`Seeded ${specials.length} specials.`);
}

async function seedContactCards(client) {
  for (const c of contactCards) {
    await client.query(
      `INSERT INTO contact_cards
         (id, type, title, address_lines, phone_display, phone_href, email_display, email_href, paragraphs, actions)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        c.id,
        c.type,
        c.title,
        c.addressLines ? JSON.stringify(c.addressLines) : null,
        c.phoneDisplay,
        c.phoneHref,
        c.emailDisplay,
        c.emailHref,
        c.paragraphs ? JSON.stringify(c.paragraphs) : null,
        c.actions ? JSON.stringify(c.actions) : null,
      ]
    );
  }
  console.log(`Seeded ${contactCards.length} contact cards.`);
}

async function seedTestimonials(client) {
  for (const t of testimonials) {
    await client.query(
      `INSERT INTO testimonials (id, name, quote, rating) VALUES ($1, $2, $3, $4)`,
      [t.id, t.name, t.quote, t.rating]
    );
  }
  console.log(`Seeded ${testimonials.length} testimonials.`);
}

async function seedCart(client) {
  await client.query(
    `INSERT INTO cart (id, items) VALUES ($1, $2)`,
    ["1", JSON.stringify(cartItems)]
  );
  console.log("Seeded cart.");
}

// --- main ---

async function seed() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await runSchema(client);
    await clearTables(client);
    await seedPizzas(client);
    await seedSpecials(client);
    await seedContactCards(client);
    await seedTestimonials(client);
    await seedCart(client);
    await client.query("COMMIT");
    console.log("Seeding complete.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seeding failed:", err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
