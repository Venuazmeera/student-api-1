//first import the express
const express = require("express");
//define the router
 const router = express.Router();
//next mongoose is required
const mongoose = require("mongoose");

//import the schema here
const UserSignup = require('../models/UserProfile');



//post method goes here

router.post('/', (req, res, next)=>{
    console.log("User profile is called")
    console.log(req.body.username);
    console.log(req.body)
    const userSignup = new UserSignup({
        _id: new mongoose.Types.ObjectId,
        username: req.body.username,
        password: req.body.password,
        mobileNo: req.body.mobileNo,
        //address:  req.body.address,
        firstName: req.body.firstName,
        lastName: req.body.lastName

           });

     var username = req.body.username;
  //first check if user is alredy existed 
  UserSignup.findOne({username:username}).select().exec().then(doc =>{
      

  
     
    if(doc == null){

        userSignup.save().then( result=> {
            res.status(200).json({
               message: "User signed up susccessfully",
               status:"success",
               Id: result._id
            });
  
     }) .catch(err => {
        console.log(err);
        res.status(500).json({
             error: err
              });
         })

    }else{
      
        res.status(200).json({message:"user aleredy exists",
                              status:"failed"
    
                             })

    }
    
/*
       userSignup.save().then( result=> {
          res.status(200).json({
             message: "User signed up susccessfully",
             Id: result._id
          });
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({
         error: err
          });
     })
*/

    });


});
 





router.post('/login', (req, res, next)=>{
  //  const username = req.params.username;
  //  const password = req.params.password;
     
    
  
      var username=req.body.username;
      console.log(username)
   UserSignup.findOne({username:username}).select().exec().then( doc => {
    console.log(username)
    var user  = req.body.username;
    var pass  = req.body.password;


   
   
    if(user == doc.username && pass == doc.password){
        
     // res.status(200).json({Authentication: doc._id})
      res.status(200).json({Authentication: doc._id,
                             message: "Success"})
    }
    else
    { 
       
        res.status(400).json({ Authentication: 'Failed to login please check username and password',
                               message:'failed'
                                });

    }

   }).catch(err => {
       console.log(err);
       
       res.status(500).json({error: err});
   });


});




//get user profile
router.get('/:username', (req, res, next) =>{
    UserSignup.findOne({username:req.params.username})
    .exec()
    .then(doc =>{
     
        res.status(200).json({
            userName: doc.username,
            FirstName: doc.firstName,
            lastName: doc.lastName,
            mobileno: doc.mobileNo,
            address: doc.address
           });
 
    })
    .catch(err =>{
        res.status(500).json({
          error: err,
          message:"profile Not Found"
        });
    });
 
     
 });
 





      
    

module.exports = router; 