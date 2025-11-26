
import express  from 'express'
import { gettopicsbyid } from "../dbfunctions/getselectedtopics.js";
import { genrate } from '../services/gemini.service.js';
const router = express.Router();

router.post('/', async(req,res)=>{
  const array = await  req.body.ids;
  

  const topics = await gettopicsbyid(array);

    const content = topics.map(topic => topic.topic_data).join('\n\n');
  console.log(content);

  const quiz = await genrate(content);
  console.log(quiz);
  res.json({"quiz" : content});
  
})

export default router;