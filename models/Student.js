const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
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

// Fire function after doc is saved to database
studentSchema.post('save', function (doc, next) {
    console.log('New user was created and saved.', doc);
    next();
});

// Fire function before doc is saved to database
studentSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Student = mongoose.model('student', studentSchema);
module.exports = Student;
