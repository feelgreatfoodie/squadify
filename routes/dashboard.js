var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  let userFullName = 'User name'

  if (req.cookies.token !== undefined) {
    console.log("req.cookies.token", req.cookies.token);
    console.log("process.env.JWT_KEY).id", process.env.JWT_KEY)
    tokenObject = jwt.verify(req.cookies.token, process.env.JWT_KEY)
    console.log(tokenObject);
    userFullName = `${tokenObject.first_name} ${tokenObject.last_name}`
  }

  res.render('dash', {
    title: 'Dashboard',
    userFullName: userFullName
  });
});

module.exports = router;