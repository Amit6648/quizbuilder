import express from 'express';
import uploadfile from './routers/uploadfile.router.js'
import getalltopics from './routers/getTopics.router.js'


const app = express();

app.use(express.json());

app.use('/uploadFile', uploadfile );

app.use('/getTopics', getalltopics )



app.listen(3000, () => {
    console.log("working");
})