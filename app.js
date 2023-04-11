//importing express in to our project app
const express = require('express');
const app = express();
const morgan = require('morgan'); //morgan is for next function we are using in our routes after req,res,next
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// importing courses router in app from router folder
const coursesRoutes = require('./api/routes/courses');
const WeeklyCourseRoutes = require('./api/routes/WeeklyCourse');
const userSignupRoutes = require('./api/routes/Signup')


//mongo db connection
mongoose.connect('mongodb+srv://venuazmeera:mongo_venu69@cluster0.7ewrhqm.mongodb.net/?retryWrites=true&w=majority');

//appling pakages to our incoming requests
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//for not getting cores errors
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
    "Access-Control-Allow-Headers", "*"
    //"Origin, X-Requested-With, Content-Type, Accept, Authorization"
   ); 
   if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

//routes which should handle requests 
//if you create anothor route mension here 

app.use('/courses', coursesRoutes);
app.use('/weeklyCourse', WeeklyCourseRoutes);
app.use('/Signup', userSignupRoutes);


// For error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;