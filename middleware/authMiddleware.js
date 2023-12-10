const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists and is valid
    if(token) {
        jwt.verify(token, 'aardvarkValleyInstitute', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'aardvarkValleyInstitute', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
};

const requireTeacher = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists and is valid
    if(token) {
        jwt.verify(token, 'aardvarkValleyInstitute', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                // check if the user is a teacher
                let user = await User.findById(decodedToken.id);
                if (user.isTeacher) {                    
                    console.log(decodedToken);
                    res.locals.user = user;
                    next();
                }
                else {
                    res.redirect('/');
                }
            }
        })
    }
    else {
        res.redirect('/login');
    }

}

module.exports = { requireAuth, checkUser, requireTeacher }