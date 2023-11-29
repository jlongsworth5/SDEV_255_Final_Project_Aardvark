const { ObjectId, Int32 } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    subjectId: {
        type: ObjectId,
        required: true,   
    },
    credits: {
        type: Int32,
        required: true,
    },
    abbreviatoin: {
        type: String,
        required: false,
    }

}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;