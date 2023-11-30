// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const { render } = require('ejs');

// DB Models
const Course = require('./models/course');
const Registration = require('./models/registration');
const Section = require('./models/section');
const Student = require('./models/student');
//const Subject = require('./models/subject');
const Teacher = require('./models/teacher');

// Get config settings
const Config = require('./config');

// Setup express application
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Connect to MongoDB
const dbUri = 'mongodb+srv://' + Config.database.username + ':' + Config.database.password + '@sdev255longsworth.oemxn7p.mongodb.net/Aardvark?retryWrites=true&w=majority';
mongoose.connect(dbUri)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// Respond to requests
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
});

app.get('/courses', (req, res) => {
    Course.find().sort({ cname: 1 })
        .then((result) => {
            res.render('courses', {courses: result, title: 'Courses' });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/courses/:id', (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .then(result => {
            res.render('details', { course: result, title: 'Modify Course' });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/staff', (req, res) => {
    Course.find().sort({ cname: 1 })
    .then((result) => {
        res.render('staff', {courses: result, title: 'Staff' });
    })
    .catch((err) => {
        console.log(err);
    });    
});

app.get('/students', (req, res) => {
    res.render('students', { title: 'Students' });
});

// CRUD routes
// Create a course
app.post('/courses', (req, res) => {
    const course = new Course(req.body);

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

// 404 Page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });    
});