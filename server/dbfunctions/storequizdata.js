import { pool } from "../db";

export const storequiz = async (quiz) => {  

    const quizid = await pool.query(`