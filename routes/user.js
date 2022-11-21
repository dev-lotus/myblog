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

//  UPDATE USER MY LOCATION
router.patch('/updateMyLocation/:id', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        user.myLocation ={"lng":req.body.lng,"lat":req.body.lat};      
        const u1 = await user.save();
        
        res.status(200).json(true);
    
    }catch (err) {
        res.status(502).send('Error ' + err);
    }
       
});

//  UPDATE USER PROFILE PICTURE
router.patch('/updateMyProfilePicture/:id', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        user.profilePicture =req.body.profilePicture;      
        const u1 = await user.save();
        
        res.status(200).json(true);
    
    }catch (err) {
        res.status(502).send('Error ' + err);
    }
       
});

//  UPDATE USER DATA
router.put('/updateUserData/:id', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        user.firstName =req.body.firstName;   
        user.lastName =req.body.lastName;      
        user.aboutYou =req.body.aboutYou;   
        user.mobileNumber =req.body.mobileNumber;  
        user.likes =req.body.likes;   
        user.dislikes =req.body.dislikes;  
        const u1 = await user.save();
        
        res.status(200).json(true);
    
    }catch (err) {
        res.status(502).send('Error ' + err);
    }
       
});

//  UPDATE REWARD POINTS
router.put('/updateRewardPoints/:id', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        user.rewardPoints +=req.body.rewardPoints;   
       
        const u1 = await user.save();
        
        res.status(200).json(true);
    
    }catch (err) {
        res.status(502).send('Error ' + err);
    }
       
});




//  GET USER LOCATION
router.get('/getMyLocation/:id', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const lng = user.myLocation.lng;
        const lat =  user.myLocation.lat;  
         
         res.status(200).json(
            {
            "status": true,
             "lng":lng, 
             "lat":lat
            }
            );
    
    }catch (err) {
        res.status(502).send('Error ' + err);
    }
       
});


// GET USER BY ID
router.get('/getUserDataById/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json([user]);

    } catch (err) {
        res.send('Error ' + err);
    }
})

// HIGHEST REWARD POINT

router.get("/getHighestRewardPointMember", async(req,res)=>{
    try{
        const user = await User.find({}).sort({rewardPoints:-1}).limit(1);
        res.json(user);

    }catch(err)
    {
        res.status(502).send('Error ' + err);
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