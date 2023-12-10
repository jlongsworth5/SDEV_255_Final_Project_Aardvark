const Registration = require('../models/Registration');
const Course = require('../models/Course');
const User = require('../models/User');

module.exports.student_index = (req, res) => {
    res.render('students', { title: 'Students' });
};

// Add logic to register for courses and view schedules