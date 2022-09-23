const express = require('express')
const router = express.Router();
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)

    } catch (err) {
        res.send('Error ' + err);
    }
})

// ADD A USER
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        description: req.body.description
    })

    try {
        const u1 = await user.save();
        res.json(u1);
    } catch (err) {
        res.send('Error ' + err);
    }
})

// GET USER BY ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)

    } catch (err) {
        res.send('Error ' + err);
    }
})

// UPDATE 
router.patch('/:id', async(req,res)=>{
try{
    const user = await User.findById(req.params.id);
    user.description = req.body.description;
    const u1 = await user.save();
    
    res.json(u1);

}catch(err){
    res.send('Error ' + req);
}
})

//DELETE
router.delete('/:id', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const u1 = await user.remove();
        res.json("success");

    }catch(err){
        res.send('Error '+ err );
    }
})

module.exports = router;