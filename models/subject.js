// Maybe remove this table, though it could be used to enforce a valid subject is entered. Or perhaps to populate a drop down option.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;