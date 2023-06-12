const mongoose = require('mongoose');    //import mongoose...this schema page

// this schema is blog's schema
const BlogSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String},
    content: {type: String, Number},
    Name: {type: String},
    images: {type: String},
    timestamp: { type: Date, default: Date.now }  //add the timestamp field with dafault value as current date and time
});

module.exports = mongoose.model('Blog', BlogSchema);