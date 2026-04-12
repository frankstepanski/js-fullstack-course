/*
---------------------------------------------------------
Express Application Configuration
---------------------------------------------------------

This file sets up and configures the Express application.

Its responsibilities are to:

1. Import middleware for security and logging
2. Enable JSON request parsing
3. Connect route modules to BASE URL paths
4. Register centralized error handling

Important:
This file DOES NOT start the server.
It only creates and configures the Express app.

The actual server starts in `server.js`.
*/

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

/*
---------------------------------------------------------
Route Imports
---------------------------------------------------------

Each route file defines relative endpoint paths.

The BASE URL paths for those routes are defined
in THIS file using app.use().

Express builds full endpoints by combining:

    Base Path (defined here)
            +
    Route Path (defined inside route file)

Example:

app.use("/students", studentRoutes);

If inside studentRoutes we have:

    router.get("/:id")

The final endpoint becomes:

    GET /students/:id
*/

import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

/*
---------------------------------------------------------
Swagger Documentation Setup
---------------------------------------------------------

Swagger provides interactive API documentation.

After starting the server, visit:

    http://localhost:3000/docs
*/

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/*
---------------------------------------------------------
Error Handling Middleware
---------------------------------------------------------
*/

import { errorHandler } from "./middleware/errorHandler.js";

/*
---------------------------------------------------------
Create Express Application
---------------------------------------------------------
*/

const app = express();

/*
---------------------------------------------------------
Global Middleware
---------------------------------------------------------
*/

// Allows requests from different domains
app.use(cors());

// Adds security-related HTTP headers
app.use(helmet());

// Logs incoming HTTP requests in the terminal
app.use(morgan("dev"));

/*
---------------------------------------------------------
Body Parsing Middleware
---------------------------------------------------------
*/

app.use(express.json());

/*
---------------------------------------------------------
API Routes
---------------------------------------------------------
*/

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

/*
---------------------------------------------------------
Swagger API Documentation Route
---------------------------------------------------------
*/

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School REST API (MongoDB)",
      version: "1.0.0",
      description: "API documentation for the School system using MongoDB"
    }
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
---------------------------------------------------------
Error Handling Middleware
---------------------------------------------------------

This must be the LAST middleware in the pipeline.
*/

app.use(errorHandler);

export default app;
