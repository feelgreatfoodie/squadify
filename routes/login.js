var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("node env=", process.env.NODE_ENV);
  console.log("JWT_KEY=", process.env.JWT_KEY);
  res.render('login', {
    title: 'Login'
  });
});

module.exports = router;