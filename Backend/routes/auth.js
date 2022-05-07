const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');  
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "abcdefg";






// ROUTE1: Create a user using post "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Alteat 5 characters').isLength({ min: 5 }),

],async (req,res)=>{
    //if there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //whether the user with same email exists
    try {
      
    

    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error:"Sorry a user with this email already exist"})    }
        const salt = await bcrypt.genSalt(10); 
        const secPass = await bcrypt.hash(req.body.password,salt);
    
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });

    const data ={
      user:{
        id : user.id
      }
    }

    const authtoken = jwt.sign(data,JWT_SECRET);
  

     
    // .then(user => res.json(user))
    // .catch(err=> console.log(err));

    //res.json(user)
    res.json({authtoken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
      
    }



})

// ROUTE2: Authenticate a User using:Post "/api/auth/login", No login required
router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cannot be blank').exists()
], async(req,res)=>{


  //if there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credentials"});

      }

      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
         return res.status(400).json({error:"Please try to login with correct credentials"});
         

      }

      const data ={
      user:{
        id : user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    res.json({authtoken})
    
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
      
    }


});

// ROUTE3: get loggedin User using:Post "/api/auth/getuser",login required

router.post('/getuser', fetchuser, async(req,res)=>{

try {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
  
} catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");

  
}
});

module.exports = router