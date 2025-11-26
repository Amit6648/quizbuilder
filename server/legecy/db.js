import pkg from 'pg';
const { Client } = pkg;

export const pool =  new Client({
  connectionString: process.env.SUPABASE_DB_URL
});

pool.connect().then(console.log("connected"));



