const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const url = 'mongodb://localhost:27017/AlienDBex'

// Initliaze express server 
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected');
})

app.use('/', (req,res)=>{
    res.json({
     "status": "Live working fine !"
    });
 });

// Router 
const userRouter = require('./routes/user')
app.use('/user', userRouter)



app.listen(9000, () => {
    console.log('Server is listening on port 9000')
})