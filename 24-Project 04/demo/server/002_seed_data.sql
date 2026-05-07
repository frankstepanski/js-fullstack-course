-- seed.sql
-- Clears existing rows and inserts demo data for all tables.
-- Safe to re-run: TRUNCATE resets everything to this known state.

TRUNCATE orders, cart, testimonials, contact_cards, specials, pizzas;

-- ============================================================
-- pizzas
-- ============================================================

INSERT INTO pizzas (id, name, description, prices, image_src, image_alt, image_caption) VALUES
  ('1', 'The Classic Margherita',
   'Tomato sauce, fresh mozzarella, basil, and a drizzle of olive oil.',
   '{"medium": 12, "large": 15}',
   '../images/pizza-margherita.png',
   'Classic margherita pizza with tomato, mozzarella, and basil',
   'Simple, fresh, and delicious.'),

  ('2', 'Moonlight Supreme',
   'Pepperoni, sausage, mushrooms, onions, and bell peppers on our signature crust.',
   '{"medium": 16, "large": 19}',
   '../images/pizza-supreme.png',
   'Supreme pizza with pepperoni, sausage, mushrooms, and peppers',
   'Loaded with toppings for big appetites.'),

  ('3', 'Stargazer Veggie',
   'Spinach, olives, roasted red peppers, mushrooms, and feta cheese.',
   '{"medium": 14, "large": 17}',
   '../images/pizza-veggie.png',
   'Vegetarian pizza with spinach, olives, mushrooms, and peppers',
   'Colorful veggies on a crispy base.'),

  ('4', 'Comet BBQ Chicken',
   'BBQ sauce, grilled chicken, red onions, and cilantro, topped with mozzarella and cheddar.',
   '{"medium": 15, "large": 18}',
   '../images/pizza-bbq.png',
   'BBQ chicken pizza with red onions and cilantro',
   'Smoky, tangy, and cheesy.');

-- ============================================================
-- specials
-- ============================================================

INSERT INTO specials (id, day_label, title, description_html, tagline) VALUES
  ('1', 'Monday',      '2-for-1 Medium Pizzas',
   'Buy one medium pizza, get a second one <strong>50% off</strong>.',
   'Start the week with a deal ✨'),

  ('2', 'Wednesday',   'Free Drink with Any Large',
   'Order any large pizza and get a <strong>free soft drink</strong>.',
   'Midweek recharge 🥤'),

  ('3', 'Friday Night', 'Family Combo Feast',
   '<strong>2 large pizzas + breadsticks</strong> for one family-friendly price.',
   'Perfect for movie night 🎬');

-- ============================================================
-- contact_cards
-- ============================================================

INSERT INTO contact_cards
  (id, type, title, address_lines, phone_display, phone_href, email_display, email_href, paragraphs, actions)
VALUES
  ('1', 'visit', 'Visit Us',
   '["123 Moonlight Lane", "Fictional City, Web 00000"]',
   '(555) 987-6543', 'tel:+15559876543',
   'hello@moonlightpizza.example', 'mailto:hello@moonlightpizza.example',
   NULL, NULL),

  ('2', 'info', 'Get in Touch',
   NULL, NULL, NULL, NULL, NULL,
   '["Have a question about your order, planning a party, or curious about our (fictional) catering options? We''d love to hear from you.", "For now, this is just a demo page, but it shows how you might highlight different ways to contact a real restaurant."]',
   '[{"kind": "primary", "label": "Call Us", "href": "tel:+15559876543"}, {"kind": "secondary", "label": "Email Us", "href": "mailto:hello@moonlightpizza.example"}]');

-- ============================================================
-- testimonials
-- ============================================================

INSERT INTO testimonials (id, name, quote, rating) VALUES
  ('1', 'Alex P.',    'The best crust I''ve ever had. Seriously addictive!',                        5),
  ('2', 'Jordan M.', 'Late-night slices that never miss. A true neighborhood favorite.',            5),
  ('3', 'Sam K.',    'Friendly staff and creative specials every week.',                            4),
  ('4', 'Taylor R.', 'I stop by after work at least twice a week. The Margherita is elite.',       5),
  ('5', 'Morgan L.', 'Perfect balance of crispy crust and gooey cheese. Never disappoints.',       4),
  ('6', 'Chris J.',  'The Comet BBQ Chicken is my go-to. Smoky, tangy, and so good.',             5);

-- ============================================================
-- cart  (demo cart with two items)
-- ============================================================

INSERT INTO cart (id, items) VALUES
  ('1', '[
    {"key": "1-medium", "pizzaId": "1", "name": "The Classic Margherita", "size": "medium", "price": 12, "quantity": 1, "subtotal": 12},
    {"key": "3-medium", "pizzaId": "3", "name": "Stargazer Veggie",        "size": "medium", "price": 14, "quantity": 3, "subtotal": 42}
  ]');
