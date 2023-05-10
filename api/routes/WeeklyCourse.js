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

//api to add new weekly course

router.post('/addWeek', (req, res, next) =>{
    const addWeek = {
        _id: new mongoose.Types.ObjectId(),
        week: req.body.week,
        readingmeterial: req.body.readingmeterial,
        assignment: req.body.assignment,
        additionalContent: req.body.additionalContent,
        announcement: req.body.announcement,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }
    console.log(req.body.week);
    //form the query to push new into existing data
    var query = {$push: {CourseContent: addWeek}}
    console.log(req.body._id);
    console.log(addWeek)
    //now find exiting course by it's doucument Id and push the data

    WeeklyCourse.findByIdAndUpdate({_id: req.body._id}, query)
    .select()
    .exec()
    .then(doc => {//console.log(doc)
        if (doc){
            res.status(200).json({
                massage: "success",
                data: doc
            })
        }else{
            res.status(200).json({
                massage:"no matching docs found"
            })
        }
    })
    .catch(err=>{
        res.status(420).json({
            massage: "failed",
            error: err
        })
    })
});



//update onli weekly course by ID

// router.patch('/updateOnlyWeek/:w_courseId/:weekId',(req, res, next) => {
//     const id = req.params.w_courseId;
//     const weekId = req.params.weekId;

//     const updateOps = {};
//     for (const ops of req.body) {
//      updateOps[ops.propName] = ops.value;
//     }
//     // WeeklyCourse.updateMany({_id:'642aa89548ad434bdbe0c4e4','CourseContent._id':'642aa89548ad434bdbe0c4e5'} , { $set: updateOps }) 

//     WeeklyCourse.updateMany({_id: id,'CourseContent._id':weekId} , { $set: updateOps }) 
//      .exec()
//      .then( result => {
//          console.log(result);
//          res.status(200).json(result);
//      })
//      .catch(err => {
//          console.log(err);
//          res.status(500).json({
//              error: err
//          });
//      });
 
//  });


//put method is working

router.put('/updateWeek/:id', (req, res, next) => {
    const weekId = req.params.id;
    const update = {
      _id: new mongoose.Types.ObjectId(),
      week: req.body.week,
      readingmeterial: req.body.readingmeterial,
      assignment: req.body.assignment,
      additionalContent: req.body.additionalContent,
      announcement: req.body.announcement,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    WeeklyCourse.findOneAndUpdate(
      { "CourseContent._id": weekId },
      { $set: { "CourseContent.$": update } },
      { new: true }
    )
    .select()
    .exec()
    .then(updatedDoc => {
      if (updatedDoc) {
        res.status(200).json({
          message: "Week updated successfully",
          data: updatedDoc
        });
      } else {
        res.status(404).json({
          message: "Week not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Failed to update week",
        error: err
      });
    });
  });
 //this is working 
// router.delete('/deleteWeek/:weekId', (req, res, next) => {
//     const { weekId } = req.params;
  
//     WeeklyCourse.updateOne(
//       { "CourseContent._id": weekId },
//       { $pull: { CourseContent: { _id: weekId } } },
//       { new: true }
//     )
//       .exec()
//       .then((doc) => {
//         if (doc) {
//           res.status(200).json({
//             message: 'Weekly Course deleted successfully',
//             data: doc,
//           });
//         } else {
//           res.status(404).json({
//             message: 'Weekly Course not found',
//           });
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).json({
//           message: 'Server Error',
//           error: err,
//         });
//       });
//   });

router.delete('/deleteWeek/:weekId', (req, res, next) => {
  const  weekId = req.params.weekId;
  console.log(weekId)
  const convertedId = mongoose.Types.ObjectId(weekId);

  WeeklyCourse.updateOne(
    { "CourseContent._id": convertedId },
    { $pull: { CourseContent: { _id: convertedId } } },
    { new: true }
  )
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: 'Weekly Course deleted successfully',
          data: doc,
        });
      } else {
        res.status(404).json({
          message: 'Weekly Course not found',
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: 'Server Error',
        error: err,
      });
    });
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