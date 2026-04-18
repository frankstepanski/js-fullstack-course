// server.js

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