// src/test/server.js
//
// Creates the MSW server instance used in tests.
//
// We use setupServer() from "msw/node" because tests run in Node.js
// (not a real browser). The server intercepts fetch() calls made by
// your components and returns your fake responses instead.

import { setupServer } from "msw/node";
import { handlers } from "./handlers.js";

// Create the server with our default handlers
export const server = setupServer(...handlers);
