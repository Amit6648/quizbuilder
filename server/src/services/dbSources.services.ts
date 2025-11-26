import client from "../config/prisma.js";
import { teacher_id } from "../teacherdata.js";
import {topics } from "../types/gemini.types.js";


export const saveSourceAndTopics = async(ogsource: topics)=>{
    const result = await client.sources.create({
        data : {
            teacher_id : teacher_id,
            source_name : ogsource.source_name,
            topics :{
                create : ogsource.topics.map(topic=>({
                    topic_name : topic.topic_name,
                    topic_data : topic.topic_content
                }))
            }
        },
        include : {
            topics : true
        }


    });
    
    return result;
}