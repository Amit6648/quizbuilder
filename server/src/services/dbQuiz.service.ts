import client  from "../config/prisma.js";
import { teacher_id } from "../teacherdata.js";
import { questions } from "../types/gemini.types.js";

export const storeQuiz  = async(quiz : questions ) =>{
   const result = await client.quiz_info.create({
       data : {
            teacher_id : teacher_id,
            title : quiz.title

       }
   })
}