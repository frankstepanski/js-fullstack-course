import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

// No explicit types needed here — @types/pg provides full type definitions
// for Pool automatically, so TypeScript infers the correct types without annotation.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;