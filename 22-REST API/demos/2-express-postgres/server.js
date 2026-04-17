// server.js

import app from "./app.js";
import { testConnection } from "./services/notesService.js";

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);

  try {
    await testConnection();
    console.log("✅ Connected to PostgreSQL");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
});