const { Router } = require('express');
const studentController = require('../controllers/studentController');
const router = Router();

router.get('/', studentController.student_index);

module.exports = router;