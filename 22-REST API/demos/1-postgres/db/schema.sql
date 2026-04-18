-- schema.sql
-- Creates the notes table inside your current database.
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
--
-- ─────────────────────────────────────────────────
-- NOTE: There is no CREATE DATABASE here.
-- Your Neon database (neondb) already exists.
-- This file only creates the tables inside it.
-- ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notes (
  id   SERIAL PRIMARY KEY,
  text TEXT NOT NULL
);