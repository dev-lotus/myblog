const express = require('express');
const router = express.Router();
const FreeWanted = require('../models/freeWanted');


// GET ALL FREE BORROW

router.get('/get/all', async (req, res) => {
    try {
        const allList = await FreeWanted.find();
        res.status(200).json(allList);
    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});


// GET LISTING BY USER TOKEN

router.get('/get/userToken/:id', async (req, res) => {
    try {
        const allList = await FreeWanted.find({
            userToken: req.params.id
        });
        res.status(200).json(allList);
    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});

// GET LISTING BY LISTING ID

router.get('/get/listingId/:listId/:userToken', async (req, res) => {
    try {
        const list = await FreeWanted.find({
            _id: req.params.listId,
            userToken: req.params.userToken
        });

        res.status(200).json(list);
    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});


// ADD FREE BORROW
router.post('/add', async (req, res) => {

    try {
        const freeWanted = new FreeWanted({
            userToken: req.body.userToken,
            picture: req.body.picture,
            title: req.body.title,
            description: req.body.description,
            pickUpTime: req.body.pickUpTime,
            listFor: req.body.listFor,
            location: {
                "lng": req.body.lng,
                "lat": req.body.lat
            }
        })

        const f1 = await freeWanted.save();
        res.status(200).json(true);

    } catch (err) {
        res.status(200).send('Error ' + err);
    }
});


// UPDATE FREE WANTED ITEM

router.put('/update/:listId/:userToken', async (req, res) => {
    try {
        const freeWanted = await  FreeWanted.findOne({
            _id: req.params.listId,
            userToken: req.params.userToken
        });
        freeWanted.picture = req.body.picture;
        freeWanted.title = req.body.title;
        freeWanted.description = req.body.description;
        freeWanted.pickUpTime = req.body.pickUpTime;
        freeWanted.listFor = req.body.listFor;
        freeWanted.location = {
            "lng": req.body.lng,
            "lat": req.body.lat
        };

        const f1 = await freeWanted.save();
        console.log(f1);
        res.status(200).json(true);
    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});

//  UPDATE FREE WANTED LIST  PICTURE
router.patch('/update/freeWantedPicture/:listId/:userToken', async(req, res)=>{
    try{
        const freeWantedList = await FreeWanted.find({
            _id:req.params.listId,
            userToken:req.params.userToken
        });
        freeWantedList.picture =req.body.picture;      
        const l1 = await freeWantedList.save();
        
        res.status(200).json(true);
    
    }catch (err) {
        res.status(502).send('Error ' + err);
    }
       
});

// ON HOLD
router.patch('/update/onHoldListing/:id', async (req, res) => {
    try {
        const list = await FreeWanted.findOne({
            _id: req.params.id,
        });
        list.onHold = req.body.onHold;

        const l1 = await list.save();
        res.status(200).json(true);

    } catch (err) {
        res.status(200).send('Error ' + err);
    }
})


//  DISBALE LISTING VIEW STATUS
router.patch('/update/disableStatus/:listId/:userToken', async (req, res) => {
    try {
        const freeWantedList = await FreeWanted.findOne({
            _id: req.params.listId,
            userToken: req.params.userToken
        });
        freeWantedList.disable = req.body.disableStatus;
        const l1 = await freeWantedList.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }

});

//  UPDATE ADD LIKE TO LISTING
router.patch('/update/addLike/:listId', async (req, res) => {
    try {
        const freeWantedList = await FreeWanted.findByIdAndUpdate(req.params.listId,

            {
                $push: {
                    likes: {
                        "listId": req.params.listId,
                        "userToken": req.body.userToken
                    }
                }
            },

            {
                'upsert': true
            });

        const l1 = await freeWantedList.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }

});

// REMOVE LIKE FROM LISTING
router.patch('/update/removeLike/:listId', async (req, res) => {
    try {
        const freeWantedList = await FreeWanted.findByIdAndUpdate(req.params.listId,

            {
                $pull: {
                    likes: {
                        "listId": req.params.listId,
                        "userToken": req.body.userToken
                    }
                }
            });

        const l1 = await freeWantedList.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }

});

// DELETE FREE LISTING 
router.delete('/delete/:listId/:userToken', async(req,res)=>{
    try{
        const freeWantedList = await FreeWanted.findOne({
            _id:req.params.listId,
            userToken:req.params.userToken
        });

        const requestOne = await Request.findOne({
            listId: req.params.listId,
            listedUserToken:req.params.userToken
        });

        const f1 = await freeWantedList.remove();
        const r1 = await requestOne.remove();
        res.status(200).json(true);
    
    }catch(err){
        res.status(200).json('Error '+ err);
    }
});

module.exports = router;