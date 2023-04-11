const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//importing schema from models folder
const WeeklyCourse = require('../models/WeeklyCourse');


router.get('/', (req, res, next) => {
   WeeklyCourse.find()
    .exec()
    .then( docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const w_course = new WeeklyCourse({
        _id: new mongoose.Types.ObjectId(),
        CourseName: req.body.CourseName,
        ProfessorName: req.body.ProfessorName,
        CourseDate: req.body.CourseDate,
        Coursetimings: req.body.Coursetimings,
        Accessclass: req.body.Accessclass,
        Discription: req.body.Discription,
        CourseImage: req.body.CourseImage,
        CourseContent: req.body.CourseContent

    });
    w_course
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                massage: 'Handling POST requests to /Weeklycourse',
                courseCreated: result
            });
        })
        .catch(err => {
             console.log(err);
             res.status(500).json({
                error: err
             });
        })
});


//to get single course with ID
router.get('/:w_courseId',(req, res, next) => {
    const id = req.params.w_courseId;
   WeeklyCourse.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({massage: 'No valid entry found for given ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});    
 
router.patch('/:w_courseId',(req, res, next) => {
   const id = req.params.w_courseId;
   const updateOps = {};
   for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
   }
   WeeklyCourse.updateMany({ _id: id }, { $set: updateOps }) 
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

router.delete('/:w_courseId',(req, res, next) => {
    const id = req.params.w_courseId;
    WeeklyCourse.remove({ _id: id })
        .exec()
        .then( result => {
            res.status(200).json({massage: "Course deleted"});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;