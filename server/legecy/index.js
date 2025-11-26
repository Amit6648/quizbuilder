import express from 'express';
const app = express();
import extractor from './routes/textextractor.js';
import getalltopic from './routes/topics.js'
import getquiz from './routes/getselectedtopics.js'

app.use(express.json())


app.use('/upload', extractor);

app.use('/getalltopics',getalltopic );

app.use('/getquiz', getquiz);

app.listen(3000, () => {
    console.log("working");
});


