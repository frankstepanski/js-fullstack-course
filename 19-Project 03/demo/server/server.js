/*
  This file creates a separate backend server using JSON Server.

  What it does:
  - imports the json-server package
  - creates a server
  - uses db.json as a fake database
  - automatically creates API routes from that file
  - adds default middleware
  - starts the server on a port

  This lets your frontend make requests to a fake REST API,
  such as GET /posts or POST /posts.
 
  How a web server works:
  - a server needs instructions for how to handle requests
  - routing tells the server what to do for different URLs like /posts
  - middleware lets the server run helpful logic before the final response

  Why middleware is required:
  - middleware helps process requests before they reach the final route
  - it can add helpful built-in behavior like logging and CORS
  - without middleware, the server may still run, but it misses those helper features

  Why routing is required:
  - routing tells the server how to respond to paths like /posts or /users
  - without routing, the server can start, but it does not know what to return
    for API requests

  Simple request flow:
  request -> middleware -> route -> response
*/

import jsonServer from "json-server";

// Create the JSON Server app
const server = jsonServer.create();

// Create API routes automatically from db.json
// This router is what knows how to handle routes like /posts and /users
const router = jsonServer.router("db.json");

// Create default middleware, but do not look for a public folder
const middlewares = jsonServer.defaults();
server.use(middlewares);

// Attach the router to the server
// This is required so the server knows how to respond to routes from db.json
server.use(router);

// Use the hosting platform's port if provided, otherwise use 3000 locally
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests
server.listen(PORT, () => {
  console.log("JSON Server running");
});