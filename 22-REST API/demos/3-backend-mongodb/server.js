/*
---------------------------------------------------------
Server Entry Point
---------------------------------------------------------

This file starts the Express server.

Responsibilities:

1. Load environment variables
2. Connect to MongoDB
3. Import the Express application
4. Start the server on a specific port

Unlike the PostgreSQL version which connects via a
connection pool automatically, MongoDB requires an
explicit async connection before the server starts.
*/

import "dotenv/config";
import chalk from "chalk";
import app from "./app.js";
import { connectDB } from "./db/db.js";

const PORT = process.env.PORT || 3000;

/*
---------------------------------------------------------
Why wrap everything in an async function?
---------------------------------------------------------

Connecting to MongoDB is asynchronous — it takes a moment
to establish the connection. We need to WAIT for that
connection to succeed before the server starts accepting
requests.

If we just called app.listen() immediately, the server
would start taking requests before the database was ready,
and every query would fail.

The async function lets us use `await connectDB()` to
pause here until the connection is confirmed, then start
the server.
*/

async function startServer() {

  await connectDB();

  app.listen(PORT, () => {

    console.log(chalk.green("--------------------------------------------------"));
    console.log(chalk.green(`🚀 Server running on port ${PORT}`));
    console.log(chalk.blue(`🌐 API URL: http://localhost:${PORT}`));
    console.log(chalk.green("--------------------------------------------------"));

  });

}

startServer();
