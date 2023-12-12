const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
