const Teacher = require('../models/teacher');
const Student = require('../models/student');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { userName: '', password: '' };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    };

    // validation errors
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    };

    if (err.message.includes('incorrect email')){
        errors.email = 'that email is not registered';
    }
    
    if (err.message.includes('incorrect password')){
        errors.password = 'that password is incorrect';
    }

    return errors;
}

// Set expiration for login cookie to one day
const maxAge = 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, 'aardvarkValleyInstitute', {
        expiresIn: maxAge
    });
};

// handle requests
module.exports.signup_get = (req, res) => {

};

module.exports.login_get = (req, res) => {

};

module.exports.signup_post = async (req, res) => {

};

module.exports.login_post = async (req, res) => {

};

module.exports.logout_get = (req, res) => {

};