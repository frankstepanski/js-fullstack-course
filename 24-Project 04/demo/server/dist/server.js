import "dotenv/config";
import chalk from "chalk";
import app from "./app.js";
import pool from "./db/pool.js";
const PORT = process.env.PORT || 3000;
async function start() {
    // Step 1: verify DB is reachable before accepting any traffic
    // If the DB is down, there's no point starting the server
    try {
        await pool.query("SELECT 1");
        console.log(chalk.green("✅ Database connection successful."));
    }
    catch (err) {
        console.error(chalk.red("❌ Failed to connect to the database:"), err.message);
        process.exit(1);
    }
    // Step 2: start the HTTP server
    // app.listen() is event-driven, not promise-based, so it cannot be caught with try/catch
    // It returns immediately without waiting for success or failure
    const server = app.listen(PORT, () => {
        // Fires once the server has successfully bound to the port and is ready for traffic
        console.log(chalk.green(`✅ Express server running on port ${PORT}`));
    });
    // Fires only if the server fails to bind to the port (e.g. port already in use,
    // permission denied). Without this, Node would crash with an unhandled error event.
    server.on("error", (err) => {
        console.error(chalk.red("❌ Failed to start server:"), err.message);
        process.exit(1);
    });
}
start();
