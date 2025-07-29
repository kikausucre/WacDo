const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorize = require('../middleware/roleMiddleware');
const auth = require('../middleware/auth');


router.post('/register',auth, userController.createUser);
router.post('/login', userController.userLogin);
router.get('/users', auth, authorize('admin'), userController.getUsers);
router.delete('/users/:id', auth, authorize('admin'), userController.delUsers);

module.exports = router;

