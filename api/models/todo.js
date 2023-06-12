const mongoose = require('mongoose');    //import mongoose...this schema page

//this line means todo list schema.. 
//schema means design , structure
const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task: {type: String},
    priority:{type: String},
    date: {type: String},
    category: {type: String},
});
// this task,priority,date,category are called data

module.exports = mongoose.model('todo', todoSchema);