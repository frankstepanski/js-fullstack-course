-- seed.sql
-- Inserts sample data into the notes table.
--
-- Run this after setup.sql to populate the database with test data.
--
-- ─────────────────────────────────────────────────
-- BEEKEEPER STUDIO
-- ─────────────────────────────────────────────────
-- 1. Open Beekeeper Studio and connect to your Neon database
-- 2. Open a new query tab
-- 3. Paste this file and click Run
--
-- ─────────────────────────────────────────────────
-- NEON SQL EDITOR
-- ─────────────────────────────────────────────────
-- 1. Open your project in the Neon dashboard
-- 2. Click SQL Editor in the left sidebar
-- 3. Paste this file and click Run
-- ─────────────────────────────────────────────────
 
INSERT INTO notes (text) VALUES
  ('Buy groceries'),
  ('Call the dentist'),
  ('Finish the project');