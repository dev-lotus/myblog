const express = require('express');
const router = express.Router();
const FreeListing = require('../models/freeListing');
const User = require('../models/user');

// GET ALL FREE LISTING 

router.get('/get/freeListing/', async(req,res)=>{
    try{
        const allList = await FreeListing.find();
        res.status(200).json(allList);
    }catch(err){
        res.status(502).send('Error '+err);
    }
});

// GET LISTING BY USER TOKEN

router.get('/get/freeListing/userToken/:id', async(req,res)=>{
    try{
        const allList = await FreeListing.find({
            userToken:req.params.id
        });
        res.status(200).json([allList]);
    }catch(err){
        res.status(502).send('Error '+err);
    }
});

// GET LISTING BY LISTING ID

router.get('/get/freeListing/listingId/:listId/:userToken', async(req,res)=>{
    try{
        const list = await FreeListing.find({
            _id:req.params.listId,
            userToken:req.params.userToken
        });
        
        res.status(200).json(list);
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

router.put('/update/freeListing/:listId/:userToken', async(req,res)=>{
    try{
        const freeList = await FreeListing.findOne({
            _id:req.params.listId,
            userToken:req.params.userToken
        });
        freeList.picture =  req.body.picture;
        freeList.title = req.body.title;
        freeList.category = req.body.category;
        freeList.description = req.body.description;
        freeList.pickUpTime = req.body.pickUpTime;
        freeList.listFor= req.body.listFor;
        freeList.location ={"lng":req.body.lng,"lat":req.body.lat};
        
        const u1 = await freeList.save();
        console.log(u1);
         res.status(200).json(true);
    }catch(err){
        res.status(502).send('Error ' + err);
    }
});

//  UPDATE USER PROFILE PICTURE
router.patch('/update/freeListingPicture/:listId/:userToken', async(req, res)=>{
    try{
        const freeList = await FreeListing.find({
            _id:req.params.listId,
            userToken:req.params.userToken
        });
        freeList.picture =req.body.picture;      
        const l1 = await freeList.save();
        
        res.status(200).json(true);
    
    }catch (err) {
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