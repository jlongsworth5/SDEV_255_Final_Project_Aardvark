const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    }
},
{ timestamps: true });

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;