import { pool } from "../db.js";


export const gettopicsbyid =async( idarray)=>{
    try {
        
        const topics = await Promise.all(idarray.map(id=>
            pool.query(`
                SELECT topic_data FROM topics
                WHERE topics.id = $1
                `,
                [id]
            )
        ));

        
        
        
        const topick = topics.flatMap(r => r.rows);
        return topick;
        
        
    } catch (error) {
        console.log(error);
        
    }
}

