// Dependencies
const express = require('express');     //  Used for simplified code expressions
const mongoose = require('mongoose');   //  Used to access the cloud db
const morgan = require('morgan');       //  Used to log requests and responses in the terminal when running in development environment
const { render } = require('ejs');      //  Used to embed javascript in the html

// Import Routers
const courseRoutes = require('./routes/courseRoutes');

// DB Models
const Course = require('./models/course');
const Registration = require('./models/registration');
const Student = require('./models/student');
const Subject = require('./models/subject');

// Get config settings
const config = require('./config');

// Setup express application
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('view engine', 'ejs');

// Connect to MongoDB
const dbUri = 'mongodb+srv://' + config.database.username + ':' + config.database.password + '@sdev255longsworth.oemxn7p.mongodb.net/Aardvark?retryWrites=true&w=majority';
mongoose.connect(dbUri)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// Route requests to appropriate pages
//  Home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
});

// Go to modify course page
app.get('/update/:id', (req, res) => {
    const id = req.params.id;
    let subjects = {};
    
    Subject.find().sort({ title: 1 })
        .then(sResult => {
            subjects = sResult;
        })
        .then(() => {
            Course.findById(id)
                .then(cResult => {
                    res.render('update', { course: cResult, subjects: subjects, title: 'Modify Course' });
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).render('404', { title: '404' });
                });                
            })                  
        .catch((err) => {
            console.log(err);
        });
});

//  Page for students to register for courses
app.get('/students', (req, res) => {
    res.render('students', { title: 'Students' });
});

app.get('/staff', (req, res) => {
    let subjects = {};

    Subject.find().sort({ title: 1 })
        .then(sResult => {
            subjects = sResult;            
        })
        .then(() => {
            Course.find().sort({ cname: 1 })
                .then((cResult) => {                    
                    res.render('staff', {courses: cResult, subjects: subjects, title: 'Staff' });
                })
                .catch((err) => {
                    console.log(err);
                });
            })                
        .catch((err) => {
            console.log(err);
        });
});

app.use('/courses', courseRoutes);
//app.use('/staff', staffRoutes);

// 404 Page, default route for any uncaught requests
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });    
});