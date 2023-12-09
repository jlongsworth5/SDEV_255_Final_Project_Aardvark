const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { firstName: '', lastName: '', email: '', password: '' };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    };

    // validation errors
    if (err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    };

    if (err.message.includes('incorrect email')){
        errors.email = 'That email is not registered';
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
    const { firstName, lastName, email, password, isTeacher } = req.body;
    
    try {
        const user = await User.create({ firstName, lastName, email, password, isTeacher });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(404).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    
    console.log(email,password);
    res.render('user login');
};

module.exports.logout_get = (req, res) => {
    res.render('logout');
};