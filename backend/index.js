const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); 
const bodyParser = require('body-parser')
const url = 'mongodb+srv://lotusbiswas:lotusbiswas@cluster0.1tsbbdz.mongodb.net/?retryWrites=true&w=majority'

// Initliaze express server 
const app = express();app.use(cors());
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
const userRouter = require('./routes/user');
const listing = require('./routes/listing');
const requestRouter = require('./routes/request') 
app.use('/user', userRouter);
app.use('/user/listing', listing);
app.use('/user/request', requestRouter);

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});