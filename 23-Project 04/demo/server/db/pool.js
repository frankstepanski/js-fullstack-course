/*
  db/pool.js — PostgreSQL connection pool

  What it does:
  - reads the DATABASE_URL from the environment (set in .env)
  - creates a single shared Pool of connections
  - exports that pool so every service file can import and reuse it

  Why a pool instead of a single client:
  - a pool keeps several connections open and lends them out as needed
  - this is far more efficient than opening and closing a fresh connection
    on every database query
*/

import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
