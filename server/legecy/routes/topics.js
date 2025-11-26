import express from 'express'
import { alltopics } from '../dbfunctions/gettopics.js';

const router = express.Router();

router.get('/', async(req,res)=>{
         try {
            console.log("starting");
            
            const response = await alltopics();
            console.log(response);
            
            console.log("running");
            

            res.json(response);
         } catch (error) {
            res.status(400).json({"error" : error});
            
         }
})

export default router;






