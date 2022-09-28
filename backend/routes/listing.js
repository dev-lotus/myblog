const express = require('express');
const router = express.Router();
const FreeListing = require('../models/freeListing');
const User = require('../models/user');

// GET LISTING BY USER TOKEN

router.get('/get/freeListing/:id', async(req,res)=>{
    try{
        const allList = await FreeListing.find({
            userToken:req.params.id
        });
        res.status(200).json([allList]);
    }catch(err){
        res.status(502).send('Error '+err);
    }
});

// ADD FREE LISTING
router.post('/add/freeListing', async(req,res)=>{

    try{
        const freeList = new FreeListing({
            userToken: req.body.userToken,
            picture: req.body.picture,
            title: req.body.title,
            category:req.body.category,
            description: req.body.description,
            pickUpTime:req.body.pickUpTime,
            listFor: req.body.listFor,
            location: req.body.location
        })

        const f1= await freeList.save();
        res.status(200).json(true);
    
    } catch(err){
        res.status(200).send('Error '+ err);
    }
});

// UPDATE FREE LISTING ITEM

router.put('/update/freeListing/:id', async(req,res)=>{
    try{
        const freeList = await FreeListing.findById(req.params.id);
        freeList.picture =  req.body.picture;
        freeList.title = req.body.title;
        freeList.category = req.body.category;
        freeList.description = req.body.description;
        freeList.pickUpTime = req.body.pickUpTime;
        freeList.listFor= req.body.listFor;
        freeList.location=req.body.location;

        const f1 = await freeList.save();
         res.status(200).json(true);
    }catch(err){
        res.status(502).send('Error ' + err);
    }
});

// DELETE FREE LISTING 
router.delete('/delete/freeListing/:id', async(req,res)=>{
    try{
        const freeList = await FreeListing.findById(req.params.id);
        const f1 = await freeList.remove();

        res.status(200).json(true);
    
    }catch(err){
        res.status(200).json('Error '+ err);
    }
})

module.exports = router;