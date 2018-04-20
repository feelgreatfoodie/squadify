const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  let userFullName = 'User name'
  let tokenObject = ''
  let about_user = ''

  if (req.cookies.token !== undefined) {
    tokenObject = jwt.verify(req.cookies.token, process.env.JWT_KEY)
    userFullName = `${tokenObject.first_name} ${tokenObject.last_name}`
    about_user = tokenObject.about_user
  }

  res.render('dash', {
    title: 'Dashboard',
    userFullName: userFullName,
    userImg: `${tokenObject.image_url}`,
    about_user: about_user
  })
})

module.exports = router;
