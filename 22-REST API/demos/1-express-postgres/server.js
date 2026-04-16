// server.js

/**
 * Entry point
 *
 * This file imports the Express app and starts the server.
 * It also tests the database connection on startup so any
 * connection issues are visible immediately in the terminal.
 *
 * Separating this from app.js means the app can be imported
 * in tests without actually starting a server.
 */

import app from "./app.js";
import { testConnection } from "./services/notesService.js";

const PORT = 3000;

/**
 * Start Server
 *
 * app.listen() starts the Express server on the specified PORT.
 * Once the server is running, we immediately test the database connection.
 *
 * This is important because the server can start successfully even if the
 * database is unreachable — without this check you would not know there
 * was a connection problem until the first request came in.
 *
 * testConnection() runs a simple "SELECT 1" query against PostgreSQL.
 * If it succeeds  → database is reachable and queries will work
 * If it fails     → something is wrong (bad connection string, network issue, etc.)
 *
 * The server continues running either way — the check is for visibility only.
 */
app.listen(PORT, async () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);

  try {
    await testConnection();
    console.log("✅ Connected to PostgreSQL");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
});