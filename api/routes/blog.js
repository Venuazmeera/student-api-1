const express = require('express');  
const router = express.Router();
const mongoose = require('mongoose');
const blogModel = require('../models/blog');

// get all method..
router.get('/', (req, res, next) => {
  blogModel.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs.map(doc => {
          return {
            title: doc.title,
            content: doc.content,
            Name: doc.Name,
            images: doc.images,
            _id: doc._id,
            timestamp: doc.timestamp
          }
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

  
  // post a new task
  router.post('/', (req, res, next) => {
    // Create a new blog document with request body data
    const blog = new blogModel({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      content: req.body.content,
      Name: req.body.Name,
      images: req.body.images,
      timeStamp: new Date() // add the current date and time
    });

    // save the new blog to the database
    blog
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Blog created successfully",
        createdBlog: {
          title: result.title,
          content: result.content,
          Name: result.Name,
          _id: result._id,
          timestamp: result.timestamp // Include the timestamp in the response
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
  });

// create a PUT route for updating a course by ID..
router.put('/:id', (req, res) => {
  const blogId = req.params.id;

  blogModel.findByIdAndUpdate(blogId, req.body, { new: true })
    .exec()
    .then((updatedBlog) => {
      res.status(200).json({
        message: 'blog post update successfully'
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
});


// delete api method...
  router.delete('/:id', (req, res) => {
    const blogId = req.params.id;
  
    blogModel.findByIdAndDelete(blogId)
      .exec()
      .then(() => {
        res.status(200).json({ message: 'Blog post deleted successfully' });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error });
      });
  });
  

  module.exports = router;