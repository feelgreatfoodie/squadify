const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

/* GET home page. */

const renderDash = (req, res, next) => {
  let hostingCount = ""
  let participatingCount = ""

  const tokenObject = jwt.verify(req.cookies.token, process.env.JWT_KEY)
  const userFullName = `${tokenObject.first_name} ${tokenObject.last_name}`
  const about_user = tokenObject.about_user
  const userImg = tokenObject.image_url

  res.render('dash', {
    title: 'Dashboard',
    userFullName: userFullName,
    userImg: `${userImg}`,
    about_user: about_user,
    hostingCount: hostingCount,
    participatingCount: participatingCount
  })
}

router.get('/', renderDash)

module.exports = router;
