const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
    },
    courseId: {
        type: ObjectId,
        required: true,
    }

}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
