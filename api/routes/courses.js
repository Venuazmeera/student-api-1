const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//importing schema from models folder
const Course = require('../models/courses');

router.get('/', (req, res, next) => {
   Course.find()
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
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        CourseName: req.body.Coursename,
        ProfessorName: req.body.ProfessorName,
        CourseDiscription: req.body.CourseDiscription,
        CourseBook: req.body.CourseBook

    });
    course
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                massage: 'Handling POST requests to /courses',
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
router.get('/:courseId',(req, res, next) => {
    const id = req.params.courseId;
   Course.findById(id)
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
 
router.patch('/:courseId',(req, res, next) => {
   const id = req.params.courseId;
   const updateOps = {};
   for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
   }
   Course.updateMany({ _id: id }, { $set: updateOps }) 
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

router.delete('/:courseId',(req, res, next) => {
    const id = req.params.courseId;
    Course.remove({ _id: id })
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