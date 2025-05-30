// Database connection configuration
// for PostgreSQL database.
import { Client } from "pg";
import dotenv from "dotenv";

// Init
dotenv.config();

export const dbConnection = new Client({
  host: process.env.PG_DB_HOST || "localhost",
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWD,
  port: process.env.PG_DB_PORT || 5432,
  database: process.env.PG_DB_NAME,
});
