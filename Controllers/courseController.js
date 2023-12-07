const Course = require('../models/course');
const Subject = require('../models/subject');

const course_index = (req, res) => {
    Course.find().sort({ cname: 1 })
        .then((result) => {
            res.render('courses', {courses: result, title: 'Courses' });
        })
        .catch((err) => {
            console.log(err);
        });
};

const course_details = (req, res) => {
    const id = req.params.id;    
    
    Course.findById(id)
        .then(result => {
            res.render('details', { course: result, title: 'Course Details' });
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', { title: '404' });
        });       
};

const course_create_post = (req, res) => {
    const course = new Course(req.body);
    course.cname = course.cname.toUpperCase();

    course.save()
        .then((result) => {
            res.redirect('/courses');
        })
        .catch((err) => {
            console.log(err);
        });
};

const course_update_post = (req, res) => {
    const id = req.params.id;
    Course.updateOne({ _id: id }, { cname: req.body.cname.toUpperCase(), cdescript: req.body.cdescript, sarea: req.body.sarea, chours: req.body.chours })
        .then((result) => {
            res.redirect('/courses');
        })
        .catch((err) => {
            console.log(err);
            res.status(404).render('404', { title: '404' });
        });
};

const course_delete = (req, res) => {
    const id = req.params.id;

    Course.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/courses' });
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', { title: '404' });
        });
};

module.exports = {
    course_index,
    course_details,
    course_create_post,
    course_update_post,
    course_delete
}