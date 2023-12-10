const { Router } = require('express');
const staffController = require('../controllers/staffController');
const router = Router();

// Declare authorization middleware
const { requireTeacher } = require('../middleware/authMiddleware'); 

router.get('/', requireTeacher, staffController.staff_index);

module.exports = router;