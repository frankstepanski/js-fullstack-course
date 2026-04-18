// db.js

import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});

export default pool;
