

const mongoose = require('mongoose');

const CourseContentSchema = new mongoose.Schema({
    week: { type:String },
    readingmeterial: { type: String },
    assignment: { type:String },
    additionalContent: { type: String },
    annoncement: { type:String },
    startDate: { type: String, required: true },
    endDate: { type:String, required:true }
});

const WeeklyCourseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    CourseName: {type:String, required: true},
    ProfessorName : { type: String, required:true},
    CourseDate : { type: String, required:true},
    Coursetimings: { type: String, required:true},
    Accessclass: { type: String, required:true},
    Discription: { type: String, required: true},
    CourseImage: { type: String},
    CourseContent:{ type:[CourseContentSchema]}

});


module.exports = mongoose.model('WeeklyCourse', WeeklyCourseSchema);

