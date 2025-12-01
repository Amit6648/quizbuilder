import { Router } from "express";
import { getAllTopicsController, getTopicsByIdController } from "../controller/gettopics.controller.js";


const router = Router();

router.get('/all', getAllTopicsController);

router.post('/byId', getTopicsByIdController )

export default router;