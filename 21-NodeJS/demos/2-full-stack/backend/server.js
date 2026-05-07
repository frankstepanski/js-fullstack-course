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
 * - Working with async file operations
 * - Returning JSON responses
 * - Enabling CORS for cross-origin requests
 */

import http from "http"; // Core Node module
import { getAllNotes, addNote } from "./notesService.js";

const PORT = 3000;


/**
 * ⚠️ IMPORTANT: Change this if your frontend runs on a different port.
 * Example:
 *   http://localhost:3000 (Notes Server)
 *   http://localhost:5500 (Frontend - Live Server)
 */
const FRONTEND_ORIGIN = "http://127.0.0.1:5500";


/**
 * Helper function to send JSON responses
 */
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(data));
}

/**
 * Create HTTP Server
 * 
 * This function runs EVERY time a request hits the server.
 */
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  console.log(`Incoming Request: ${method} ${url}`);

  // ==============================
  // 🌍 CORS HEADERS
  // ==============================
  // CORS (Cross-Origin Resource Sharing) is a browser security rule
  // that blocks requests from a different domain unless the server
  // explicitly allows it. These headers do that:
  // Access-Control-Allow-Origin  → which frontend domain is allowed
  // Access-Control-Allow-Methods → which HTTP methods are allowed (GET, POST, etc.)
  // Access-Control-Allow-Headers → which request headers are allowed
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ==============================
  // 🛑 HANDLE CORS PREFLIGHT REQUEST
  // ==============================
  // Before sending a POST request with JSON, the browser automatically
  // sends a "preflight" OPTIONS request first — it's asking the server:
  // "Are you okay with me sending this?"
  //
  //   BROWSER                        SERVER
  //      |                              |
  //      |-- OPTIONS /notes ----------->|  "Can I send JSON here?"
  //      |<-- 204 No Content -----------|  "Yes, go ahead!"
  //      |                              |
  //      |-- POST /notes (JSON) ------->|  (real request)
  //      |<-- 200 OK (response) --------|
  //
  // We must respond to it before the browser will send the real request.
  // 204 means "Yes, go ahead" — success, but nothing to send back.
  // The return exits early so the rest of the handler is skipped.
  if (method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // ==============================
  // ROUTE: GET /notes
  // ==============================
  if (method === "GET" && url === "/notes") {
    try {
      const notes = await getAllNotes(); // async file read
      return sendJson(res, 200, notes);
    } catch (error) {
      return sendJson(res, 500, { error: "Failed to fetch notes" });
    }
  }

  // ==============================
  // ROUTE: POST /notes
  // ==============================
  if (method === "POST" && url === "/notes") {
    let body = "";

    // Collect incoming data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // When request is finished sending data
    req.on("end", async () => {
      try {
        const parsed = JSON.parse(body);

        if (!parsed.text) {
          return sendJson(res, 400, { error: "Text is required" });
        }

        const newNote = await addNote(parsed.text);

        return sendJson(res, 201, newNote);
      } catch (error) {
        return sendJson(res, 400, { error: "Invalid JSON" });
      }
    });

    return;
  }

  // ==============================
  // 404 ROUTE
  // ==============================
  sendJson(res, 404, { message: "Route not found" });
});

/**
 * Start server
 */
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});