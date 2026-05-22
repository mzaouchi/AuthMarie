const express = require('express')
const ConnectDB = require('./Config/ConnnectDB')
const userRouter = require('./Routes/User')

const app = express()

require('dotenv').config()

ConnectDB()

app.use(express.json())

app.use('/user',userRouter)



app.listen(process.env.port, console.log(`Server is running on the port ${process.env.port}`) )