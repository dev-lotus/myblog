const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/AlienDBex'

// Initliaze express server 
const app = express()

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected');
})

app.use(express.json())

// Router 
const userRouter = require('./routes/user')
// Middleware
app.use('/user', userRouter)

app.listen(9000, () => {
    console.log('Server started')
})