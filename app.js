// Dependencies
const express = require('express');     //  Used for simplified code expressions
const mongoose = require('mongoose');   //  Used to access the cloud db
const morgan = require('morgan');       //  Used to log requests and responses in the terminal when running in development environment
const { render } = require('ejs');      //  Used to embed javascript in the html

// DB Models
const Course = require('./models/course');
const Registration = require('./models/registration');
const Student = require('./models/student');
const Subject = require('./models/subject');
const Teacher = require('./models/teacher');

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

//  Course listings
app.get('/courses', (req, res) => {
    Course.find().sort({ cname: 1 })
        .then((result) => {
            res.render('courses', {courses: result, title: 'Courses' });
        })
        .catch((err) => {
            console.log(err);
        });
});

//  Retrieve a single course details, used to delete or modify a course
app.get('/courses/:id', (req, res) => {
    const id = req.params.id;    
    
    Course.findById(id)
        .then(result => {
            res.render('details', { course: result, title: 'Course Details' });
        })
        .catch(err => {
            console.log(err);
        });       
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
                });                
            })                  
        .catch((err) => {
            console.log(err);
        });
});

//  Page for teachers to add courses
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

//  Page for students to register for courses
app.get('/students', (req, res) => {
    res.render('students', { title: 'Students' });
});

// CRUD routes
// Create a course
app.post('/courses', (req, res) => {
    const course = new Course(req.body);
    course.cname = course.cname.toUpperCase();

    course.save()
        .then((result) => {
            res.redirect('/courses');
        })
        .catch((err) => {
            console.log(err);
        });
});

// Update a course
app.post('/courses/:id', (req, res) => { 
    const id = req.params.id;
    Course.updateOne({ _id: id }, { cname: req.body.cname, cdescript: req.body.cdescript, sarea: req.body.sarea, chours: req.body.chours })
        .then((result) => {
            res.redirect('/courses');
        })
        .catch((err) => {
            console.log(err);
        });
});

// Delete a course
app.delete('/courses/:id', (req, res) => {
    const id = req.params.id;

    Course.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/courses' });
        })
        .catch(err => {
            console.log(err);
        });
});

// 404 Page, default route for any uncaught requests
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });    
});