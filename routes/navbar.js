var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

/* GET navbar info. */
router.get('/', function(req, res, next) {
  let loginOrSignoutText = 'Log in / Register'

  if (req.cookies.token !== undefined) {
    loginOrSignoutText = 'Sign out'
  }

  res.send(loginOrSignoutText);
});

module.exports = router;
