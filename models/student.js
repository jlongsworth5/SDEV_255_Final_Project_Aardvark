const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter a first name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a last name'],
    },
    userName: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }

}, { timestamps: true });

const Student = mongoose.model('student', studentSchema);
module.exports = Student;
