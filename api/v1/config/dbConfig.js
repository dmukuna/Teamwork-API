import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
let conn;

if (isProduction) {
  conn = process.env.DATABASE_URL;
} else if (isDevelopment) {
  conn = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
} else {
  conn = process.env.DATABASE_URL_TEST;
}

const pool = new Pool({
  connectionString: conn,
});

pool.on('error', (err, client) => {
  client.release();
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
