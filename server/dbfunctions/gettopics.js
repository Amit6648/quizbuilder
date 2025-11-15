import { pool } from "../db.js";
import { teacher_id } from "../teacherdata.js";


export const alltopics = async () => {
  try {
    const topics = await pool.query(`
        SELECT s.id, s.source_name,  JSON_AGG(JSON_BUILD_OBJECT
       ('id' , t.id, 'topic_name', t.topic_name))
       as topics FROM sources s
       LEFT JOIN topics t ON s.id =  t.source_id
	   GROUP BY s.id, s.source_name`
    )
    console.log("done");

    console.log(topics.rows);

    return topics.rows;

  } catch (error) {
    console.log(error);

  }
}

