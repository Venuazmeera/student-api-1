const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Professor_user = require('../models/professor');


router.post('/signup',(req, res, next) => {
    Professor_user.find({ email: req.body.email })
    .exec()
    .then(user =>{
        if(user.length >= 1) {
            return res.status(409).json({
                message: "email already exists"
            });
        }else{
            const user = new Professor_user({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: req.body.password
            });
            user
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Professor user created'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    })
});

router.delete('/:userId', (req, res, next) => {
    Professor_user.remove({_id: req.params.userId})
    .exec()
    .then( result =>{
        res.status(200).json({
            message: "Professor user deleted"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;