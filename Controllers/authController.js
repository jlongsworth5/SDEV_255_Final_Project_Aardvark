const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { firstName: '', lastName: '', userName: '', password: '' };

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
        errors.userName = 'That email is not registered';
    }
    
    if (err.message.includes('incorrect password')){
        errors.password = 'That password is incorrect';
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
    res.render('signup');
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = async (req, res) => {
    const { firstName, lastName, userName, password } = req.body;
    
    try {
        const student = await Student.create({ firstName, lastName, userName, password });
        res.status(201).json(student);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(404).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { userName, password } = req.body;
    
    console.log(email,password);
    res.render('user login');
};

module.exports.logout_get = (req, res) => {
    res.render('logout');
};