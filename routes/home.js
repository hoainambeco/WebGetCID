var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home.controller');
var AuthMiddleware = require('../middleware/auth.midllware')
/* GET users listing. */
router.get('/',AuthMiddleware.YeuCauDangNhap, homeController.home)
router.post('/',AuthMiddleware.YeuCauDangNhap, homeController.iid)
module.exports = router;
