const express =require('express');
const app = express();
const userRouter = require('./routers/userRouter');

app.use(express.json());//used to parse the incoming requests with JSON payloads and is based upon the bodyparser

app.use('/api/user', userRouter);

module.exports = app;