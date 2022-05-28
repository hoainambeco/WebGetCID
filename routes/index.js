var express = require('express');
var router = express.Router();
var AuthMiddleware = require('../middleware/auth.midllware')
const user = {
  userNam: 'nam',
  password: 'nam'
};
/* GET home page. */
router.get('/',AuthMiddleware.ChuaDangNhap, function(req, res, next) {
  res.render('index', {
    loginCSS: "/stylesheets/login.css",
    homeCSS: "/stylesheets/home.css",
    nucleoiconsCSS: "/stylesheets/assets/nucleo-icons.css",
    css: "stylesheets/assets/css/black-dashboard.css?v=1.0.0",
    demo: "stylesheets/assets/demo/demo.css",
  })
});
router.post('/login',AuthMiddleware.ChuaDangNhap, function (req, res, next){
  if (req.body.loginusername === user.userNam & req.body.loginpassword === user.password){
    req.session.user = user;
    res.redirect('/home')
  }
  else {
    res.render('index', {
      loginCSS: "/stylesheets/login.css",
      homeCSS: "/stylesheets/home.css",
      nucleoiconsCSS: "/stylesheets/assets/nucleo-icons.css",
      css: "stylesheets/assets/css/black-dashboard.css?v=1.0.0",
      demo: "stylesheets/assets/demo/demo.css",
      message: "Invalid"
    })
  }
});
module.exports = router;
