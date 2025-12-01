import client from "../config/prisma.js";
import { teacher_id } from "../teacherdata.js";

export const allTopics = async () => {
    const topics = await client.sources.findMany({
        where: {
            teacher_id: teacher_id
        },

        select: {
            id: true,
            source_name: true,


            topics: {
                select: {
                    id: true,
                    topic_name: true
                },

                orderBy: {
                    topic_name: 'asc'
                }

            },
        },
        orderBy: {
            created_at: 'desc'
        }
    })

    return topics;

}


export const getTopicsById = async (array : string[]) => {
    const result = await client.topics.findMany({
      where : {
        id : {
            in : array
        }
      },

      select : {
        topic_name : true,
        topic_data : true
      },

      orderBy : {
        topic_name : 'asc'
      }
    })

    return result;
}