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

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  try {
    await testConnection();
    console.log("✅ Connected to PostgreSQL");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
});