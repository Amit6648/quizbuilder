import { teacher_id } from "../teacherdata.js";
import { pool } from "../db.js";

export const inserttopicandsource = async (data) => {


    try {
        console.log("data storing starting");
        


        const sourceresult = await pool.query(
            `INSERT INTO sources
            (teacher_id, source_name)
            VALUES ($1, $2)
            RETURNING id`,
            [teacher_id, data.source_name]
        )

        const source_id = sourceresult.rows[0].id;


        const topicsvalues = data.topics.map(t => [source_id, t.topic_name, t.topic_content]);

        const insertpromises = topicsvalues.map(values =>
            pool.query(`
                INSERT INTO topics (source_id, topic_name, topic_data)
                VALUES($1,$2,$3)
                `,
                values)
        );

        await Promise.all(insertpromises);

      console.log("data is stored");
      

    } catch (error) {
        console.log(error);
        return {"there is a error " : error};

    }

}


