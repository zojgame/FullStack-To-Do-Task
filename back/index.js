const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter')
const taskRouter = require('./routers/taskRouter')
const cors = require('cors') 
require('dotenv').config()

const url = "mongodb+srv://admin:admin@cluster0.eecck2a.mongodb.net/test";


const application = express();
application.use(cors())

application.use(express.json())
application.use('/auth', authRouter)
application.use('/task', taskRouter)

const PORT = process.env.PORT || 8080;

const start = async() => {
    try {
        await mongoose.connect(url);
        application.listen(PORT, () => console.log(`server started on localhost:${PORT}`));   
    } catch (error) {
        console.log(error)
    }
}

start();