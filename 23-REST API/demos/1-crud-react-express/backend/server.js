// server.js

import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});