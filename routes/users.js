var express = require('express');
const usersWebController = require('../controllers/usersWebController');
var router = express.Router();


/* GET home page. */
router.post('/', usersWebController.create);
router.post('/login',usersWebController.login)

module.exports = router;