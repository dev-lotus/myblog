const express = require('express')
const router = express.Router();
const Request = require('../models/request');

router.post('/add/newRequest', async(req,res)=>{
    try{
        const newRequest = new Request({
            listId:req.body.listId,
            listedUserToken:req.body.listedUserToken,
            requesterUserToken:req.body.requesterUserToken,
            request_message:req.body.request_message,
            acceptance_status:req.body.acceptance_status
        })

        const r1= await newRequest.save();
        res.status(200).json(true);
    
    }catch(err){
        res.status(200).send('Error '+ err);
    }
})

module.exports = router;