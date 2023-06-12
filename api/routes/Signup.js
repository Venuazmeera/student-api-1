//first import the express
const express = require("express");
//define the router
 const router = express.Router();
//next mongoose is required
const mongoose = require("mongoose");

//import the schema here
const UserSignup = require('../models/UserProfile');
const UserProfile = require("../models/UserProfile");



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
        lastName: req.body.lastName,
        role: req.body.role,
        school: req.body.school,
        emergency: req.body.emergency

           });

     var username = req.body.username;
  //first check if user is alredy existed 
  UserSignup.findOne({username:username}).select().exec().then(doc =>{
      

  
     
    if(doc == null){

        userSignup.save().then( result=> {
            console.log(result);

            res.status(200).json({
               message: "User signed up susccessfully",
               status:"success",
               Id: result._id,
               userData: result
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

// router.put('/:username', (req, res, next)=> {
//     const userId = req.params.id;
//     const update = {
//       _id: new mongoose.Types.ObjectId(),
//       school: req.body.school,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       mobileNo: req.body.mobileNo,
//       emergency: req.body.emergency
      
//     };
//     UserProfile.findOneAndUpdate(
//       { "UserProfile._id": userId },
//       { $set: { "UserProfile.$": update } },
//       { new: true }
//     )
//     .select()
//     .exec()
//     .then(updatedDoc => {
//       if (updatedDoc) {
//         res.status(200).json({
//           message: "user updated successfully",
//           data: updatedDoc
//         });
//       } else {
//         res.status(404).json({
//           message: "user not found"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({
//         message: "Failed to update user",
//         error: err
//       });
//     });
// })

 





router.post('/login', (req, res, next)=>{
  //  const username = req.params.username;
  //  const password = req.params.password;
     
    
  
      var username=req.body.username;
      console.log(username)
   UserSignup.findOne({username:username}).select().exec().then( doc => {
    console.log(username)
    var user  = req.body.username;
    var pass  = req.body.password;
    // var role = req.body.role;


   
   
    if(user == doc.username && pass == doc.password){
        
     // res.status(200).json({Authentication: doc._id})
      res.status(200).json({Authentication: doc._id,
        userData: doc,
        // added role for role based navigation
        role: doc.role,
        username: doc.username,
        school: doc.school,
        firstName: doc.firstName,
        lastName: doc.lastName,
        mobileNo: doc.mobileNo,
        emergency: doc.emergency,

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
            school: doc.school,
            emergency: doc.emergency,
            //address: doc.address
           });
 
    })
    .catch(err =>{
        res.status(500).json({
          error: err,
          message:"profile Not Found"
        });
    });
 
     
 });
 
 router.put('/:username', (req, res, next) => {
    const username = req.params.username;
    const updateFields = req.body; // Assuming the updated fields are sent in the request body
    
    UserSignup.findOneAndUpdate({ username: username }, updateFields, { new: true })
      .exec()
      .then(updatedDoc => {
        if (!updatedDoc) {
          return res.status(404).json({
            message: 'Profile not found'
          });
        }
        
        res.status(200).json({
          message: 'Profile updated successfully',
          updatedProfile: updatedDoc,
          school: updatedDoc.school,
          firstName: updatedDoc.firstName,
          lastName: updatedDoc.lastName,
          mobileNo: updatedDoc.mobileNo,
          emergency: updatedDoc.emergency,
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: err,
          message: 'An error occurred while updating the profile'
        });
      });
  });
  




      
    

module.exports = router; 