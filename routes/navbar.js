var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

/* GET navbar info. */
router.get('/', function(req, res, next) {
  let loginOrSignout = 'login'

  if (req.cookies.token !== undefined) {
    loginOrSignout = 'signout'
  }

  res.send(loginOrSignout);
});

module.exports = router;
