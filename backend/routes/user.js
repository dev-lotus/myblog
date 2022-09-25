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
router.post('/addUser', async (req, res) => {

    // Pre User if already exist or not
    const userExist = await User.findOne({emailAddress:req.body.emailAddress});
    
    if(userExist)
    {
        return res.status(200).json(userExist);
    }else{
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress
        })
    
        try {
            const u1 = await user.save();
            res.status(200).json(u1);
        } catch (err) {
            res.status(502).send('Error ' + err);
        }
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
    user.aboutYou = req.body.aboutYou;
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