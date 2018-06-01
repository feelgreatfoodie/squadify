var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {

  let userFirstName = 'Adventurer'

  if (req.cookies.token !== undefined) {
    userFirstName = jwt.verify(req.cookies.token, process.env.JWT_KEY).first_name
  }

  res.render('index', {
    title: 'Squadify',
    userFirstName: userFirstName
  })
})

module.exports = router;
