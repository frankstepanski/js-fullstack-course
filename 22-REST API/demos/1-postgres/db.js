// db.js

/**
 * PostgreSQL Connection Pool
 *
 * pg is the Node.js library for connecting to PostgreSQL.
 * It provides a Pool class that manages multiple reusable database connections.
 *
 * A connection pool works like this:
 *   - When the app starts, Pool creates a set of open connections to the database
 *   - When a query runs, it borrows a connection from the pool
 *   - When the query finishes, the connection is returned to the pool for reuse
 *
 * This is faster and more efficient than opening and closing a new connection
 * for every single query.
 *
 * new Pool() creates the pool and connects it to the database using DATABASE_URL.
 * DATABASE_URL is read from the .env file and looks like:
 *   postgresql://username:password@host:port/database
 *
 * process.on('SIGINT') listens for Ctrl+C (the signal sent when you stop the server).
 * When triggered, it calls pool.end() to gracefully close all open database connections
 * before the process exits. This ensures no connections are left hanging on the server.
 */

import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Listen for SIGINT, the signal sent when the user presses Ctrl+C in the terminal.
// Without this, the process would exit immediately and leave DB connections hanging.
process.on('SIGINT', async () => {
  await pool.end(); // Drain and close all connections in the pool before exiting
  process.exit(0);  // 0 = "no errors", tells the OS the process shut down cleanly
});

export default pool;