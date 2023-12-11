const Registration = require('../models/Registration');
const Course = require('../models/Course');
const User = require('../models/User');

module.exports.student_index = (req, res) => {
    res.render('students', { title: 'Students' });
};

module.exports.registration_create_post = (req, res) => {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const registration = new Registration(userId, courseId);
    
    registration.save()
        .then((result) => {
            res.redirect('/students');
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports.registration_update_post = (req, res) => {
    const id = req.params.id;
    Registration.updateOne({ _id: id }, { courseId: req.body.courseId })
        .then((result) => {
            res.redirect('/students');
        })
        .catch((err) => {
            console.log(err);
            res.status(404).render('404', { title: '404' });
        });
};

module.exports.registration_delete_post = (req, res) => {
    const id = req.params.id;

    Registration.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/students' });
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', { title: '404' });
        });
};

module.exports.registrations_get = (req, res) => {
    let schedule = {};

    const userId = req.params.userId;

    try {
        schedule = Registration.find().where('userId').equals(userId);
        // Add logic to do something with the schedule
    }
    catch (err) {
        console.log(err);
        res.status(404).render('404', { title: '404' });
    }
};