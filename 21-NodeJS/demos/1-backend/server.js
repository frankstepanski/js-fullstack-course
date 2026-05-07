// server.js

/**
 * This file creates an HTTP server using Node's built-in "http" module.
 *
 * This is NOT using Express.
 * This is pure Node.
 *
 * It demonstrates:
 * - Creating a server
 * - Handling routes manually
 * - Working with JSON responses
 * - Handling a POST request with a body
 *
 * 📌 WHY /api PREFIX?
 * All routes are prefixed with /api as a convention. This:
 *   - Makes it clear which URLs are API calls
 *   - Prevents clashes if you ever add a frontend to the same server
 *   - Makes versioning easier later (e.g. /api/v2/user)
 *
 * ⚠️ NOTE: There is no frontend here.
 * You can test all routes using a tool like:
 *   - Postman       (https://www.postman.com) - most popular, free GUI
 *   - Insomnia      (https://insomnia.rest)   - clean and lightweight
 *   - Thunder Client (VS Code extension)      - good if you want to stay in your editor
 *   - curl          (terminal)                - built into Mac/Linux, no install needed
 *
 * Example curl command:
 *   curl http://localhost:3000/api/user
 */

import http from "http"; // Core Node module — no install needed

const PORT = 3000;


// ==============================
// 🛠️ HELPER: sendJson
// ==============================
// Instead of repeating res.writeHead() and res.end() in every route,
// this helper does it in one step.
//
// statusCode → the HTTP status (200, 201, 404, etc.)
// data       → the JavaScript object to send back as JSON
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json", // Tells the client to expect JSON
  });

  res.end(JSON.stringify(data)); // Convert object → JSON string and send
}


// ==============================
// 🚀 CREATE THE SERVER
// ==============================
// This callback runs every time a request hits the server.
// We destructure method and url from the request object
// so we can use them to match routes below.
const server = http.createServer((req, res) => {
  const { method, url } = req;

  console.log(`Incoming Request: ${method} ${url}`);


  // ==============================
  // ROUTE: GET /api/health
  // ==============================
  // 📌 /api prefix → makes it clear this is an API endpoint, not a webpage.
  // Confirms the server is running. Nothing more.
  // Returns: { status: "ok" }
  // ⚠️ Keep this simple — never expose versions, db info, or internals.
  // Try it: GET http://localhost:3000/api/health
  if (method === "GET" && url === "/api/health") {
    return sendJson(res, 200, { status: "ok" });
  }


  // ==============================
  // ROUTE: GET /api/user
  // ==============================
  // 📌 /api prefix → makes it clear this is an API endpoint, not a webpage.
  // Returns a fake user object with id, name, email, and age.
  // In a real app this would fetch a user from a database.
  // Returns: { id, name, email, age }
  // Try it: GET http://localhost:3000/api/user
  if (method === "GET" && url === "/api/user") {
    return sendJson(res, 200, {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      age: 28,
    });
  }


  // ==============================
  // ROUTE: GET /api/product
  // ==============================
  // 📌 /api prefix → makes it clear this is an API endpoint, not a webpage.
  // Returns a fake product object with id, name, price, and stock status.
  // In a real app this would fetch a product from a database.
  // Returns: { id, name, price, inStock }
  // Try it: GET http://localhost:3000/api/product
  if (method === "GET" && url === "/api/product") {
    return sendJson(res, 200, {
      id: 101,
      name: "Mechanical Keyboard",
      price: 89.99,
      inStock: true,
    });
  }


  // ==============================
  // ROUTE: GET /api/weather
  // ==============================
  // 📌 /api prefix → makes it clear this is an API endpoint, not a webpage.
  // Returns a fake weather report for a hardcoded city.
  // In a real app this would call a weather API like OpenWeatherMap.
  // Returns: { city, temperature, unit, condition }
  // Try it: GET http://localhost:3000/api/weather
  if (method === "GET" && url === "/api/weather") {
    return sendJson(res, 200, {
      city: "New York",
      temperature: 72,
      unit: "Fahrenheit",
      condition: "Partly Cloudy",
    });
  }


  // ==============================
  // ROUTE: POST /api/message
  // ==============================
  // 📌 /api prefix → makes it clear this is an API endpoint, not a webpage.
  // Pretends to receive a message and sends back a fake success response.
  // In a real app this would save the message to a database.
  // Returns: { success, message, id, createdAt }
  //
  // ⚠️ You cannot test POST requests in a browser URL bar.
  // Use one of these tools instead:
  //   - Postman        (https://www.postman.com) — most popular, free GUI
  //   - Insomnia       (https://insomnia.rest)   — clean and lightweight
  //   - Thunder Client (VS Code extension)       — good if you want to stay in your editor
  //   - curl (terminal):
  //       curl -X POST http://localhost:3000/api/message
  if (method === "POST" && url === "/api/message") {
    return sendJson(res, 201, {
      success: true,
      message: "Message received!",
      id: 42,
      createdAt: new Date().toISOString(),
    });
  }


  // ==============================
  // 404 — ROUTE NOT FOUND
  // ==============================
  // If nothing above matched, send a 404.
  // This is the "catch-all" at the bottom.
  sendJson(res, 404, { error: "Route not found" });
});


// ==============================
// START THE SERVER
// ==============================
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`   Try these routes:`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/user`);
  console.log(`   GET  http://localhost:${PORT}/api/product`);
  console.log(`   GET  http://localhost:${PORT}/api/weather`);
  console.log(`   POST http://localhost:${PORT}/api/message  ← use Postman/Insomnia/curl`);
});
