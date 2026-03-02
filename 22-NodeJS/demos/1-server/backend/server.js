// server.js

/**
 * This file creates an HTTP server using Node's built-in "http" module.
 * 
 * This is NOT Express.
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
  // These headers tell the browser:
  // "It is safe to allow requests from this frontend."
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

 // ==============================
  // 🛑 HANDLE PREFLIGHT REQUEST
  // ==============================
  // When sending JSON with POST,
  // the browser first sends an OPTIONS request.
  // We must respond to it or the request will fail.
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