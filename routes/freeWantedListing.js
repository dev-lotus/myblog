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

module.exports = router;