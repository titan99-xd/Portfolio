import mysql from "mysql2/promise";
import type { PoolOptions } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const config: PoolOptions = {
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  connectionLimit: 10,
};

const pool = mysql.createPool(config);

export default pool;
