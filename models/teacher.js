const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
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

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;