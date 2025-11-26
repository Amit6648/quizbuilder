import { pool } from "./db.js";

const res = pool.query(`select *  from sources `)

console.log(res.rows);
