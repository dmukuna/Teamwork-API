import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
let conn;
let c;

if (isProduction) {
  conn = {connectionString :process.env.DATABASE_URL};

} else if (isDevelopment) {
  conn = {connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`};
} else {
  conn = {  
    user: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_DATABASE_TEST,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    ssl: true
  }
}

const pool = new Pool(conn);

pool.on('error', (err, client) => {
  client.release();
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
