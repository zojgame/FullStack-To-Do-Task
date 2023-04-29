const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter')
const taskRouter = require('./routers/taskRouter')
const cors = require('cors') 
require('dotenv').config()

const url = process.env.DATABASE;


const application = express();
application.use(cors())

application.use(express.json())
application.use('/auth', authRouter)
application.use('/task', taskRouter)

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const start = async() => {
    try {
        await mongoose.connect(url);
        application.listen(PORT, () => console.log(`server started on ${HOST}/${PORT}`));   
    } catch (error) {
        console.log(error)
    }
}

start();