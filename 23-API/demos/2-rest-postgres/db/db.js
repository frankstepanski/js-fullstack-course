/*
---------------------------------------------------------
Database Connection
---------------------------------------------------------

This file creates a connection pool to PostgreSQL.

A connection pool allows the application to reuse
database connections instead of creating a new one
for every request.

This improves performance and scalability.
*/

import pkg from "pg";

const { Pool } = pkg;

/*
Create a PostgreSQL connection pool.

The values come from environment variables
loaded earlier by dotenv in server.js.
*/

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,

  /*
  SSL is required for many cloud database providers
  such as Neon, Supabase, and AWS RDS.

  rejectUnauthorized: false allows encrypted
  connections without requiring a local certificate.
  */
  ssl: {
    rejectUnauthorized: false
  }
});