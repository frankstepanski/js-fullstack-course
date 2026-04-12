/*
---------------------------------------------------------
Global Error Handling Middleware
---------------------------------------------------------

This middleware catches errors that occur anywhere in the
application (routes, controllers, or services).

In Express, error middleware must include four parameters:

(err, req, res, next)

When a controller calls:

    next(err)

Express skips the remaining middleware and sends the
error here.

This keeps error handling centralized instead of repeating
error logic in every controller.

This middleware also logs errors to a file so issues can
be reviewed later even if the server restarts.
*/

import fs from "fs";

export const errorHandler = (err, req, res, next) => {

  // Timestamp for log entries
  const timestamp = new Date().toISOString();

  // Build log entry
  const logEntry = `
        [${timestamp}]
        ${req.method} ${req.path}
        Message: ${err.message}
        Stack: ${err.stack}
    `;

  // Log to server console
  console.error(logEntry);

  // Write error to log file
  fs.appendFileSync("logs/error.log", logEntry);

  // Default HTTP status
  const status = err.status || 500;

  // Hide internal errors in production
  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong"
      : err.message || "Internal Server Error";

  // Send JSON error response
  res.status(status).json({
    error: message
  });

};
