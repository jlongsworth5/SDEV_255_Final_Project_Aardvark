const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    teacherId: {
        type: ObjectId,
        required: true,
    },
    courseId: {
        type: ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;