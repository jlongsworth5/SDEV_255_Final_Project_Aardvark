const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Subject: {
        type: String,
        required: true,
    },
    CreditValue: {
        type: Number,
        required: true,
    },
    CourseAbrv: {
        type: String,
        required: false,
    }
},
{ timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;