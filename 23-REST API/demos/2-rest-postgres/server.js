/*
---------------------------------------------------------
Server Entry Point
---------------------------------------------------------

This file starts the Express server.

Responsibilities:

1. Load environment variables
2. Import the Express application
3. Start the server on a specific port

This file should stay small and simple.
Most application logic lives in other files.
*/


/*
---------------------------------------------------------
Load Environment Variables
---------------------------------------------------------

This automatically loads variables from the .env file
and makes them available through process.env.

Example:
process.env.DB_USER
process.env.DB_PASSWORD
*/

import "dotenv/config";


/*
---------------------------------------------------------
Import Modules
---------------------------------------------------------

chalk is used to color terminal output so server logs
are easier to read.
*/

import chalk from "chalk";


/*
---------------------------------------------------------
Import the Express Application
---------------------------------------------------------

The app.js file sets up:
- middleware
- routes
- error handling
*/

import app from "./app.js";


/*
---------------------------------------------------------
Determine Server Port
---------------------------------------------------------

Use the PORT value from the .env file if it exists.

Otherwise default to port 3000.
*/

const PORT = process.env.PORT || 3000;


/*
---------------------------------------------------------
Start the Server
---------------------------------------------------------

app.listen() starts the Express server and allows
it to accept incoming HTTP requests.

Once the server starts, the callback runs and
prints a message in the terminal.
*/

app.listen(PORT, () => {

  console.log(chalk.green("--------------------------------------------------"));
  console.log(chalk.green(`🚀 Server running on port ${PORT}`));
  console.log(chalk.blue(`🌐 API URL: http://localhost:${PORT}`));
  console.log(chalk.green("--------------------------------------------------"));

});