const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const knex = require('../knex')

/* GET home page. */

const getHostingCount = (req, res, next) => {
  res.locals.hostingCount = ''
  const users_id = jwt.verify(req.cookies.token, process.env.JWT_KEY).id
  knex('users')
    .where({
      id: users_id,
    })
    .count('id')
    .then(count => {
      res.locals.hostingCount = count
    })
  next()
}

const getParticipatingCount = (req, res, next) => {
  res.locals.participatingCount = ''
  next()
}


const renderDash = (req, res, next) => {
    let userFullName = 'User name'
    let tokenObject = ''
    let about_user = ''

    const tokenObject = jwt.verify(req.cookies.token, process.env.JWT_KEY)
    const userFullName = `${tokenObject.first_name} ${tokenObject.last_name}`
    const about_user = tokenObject.about_user
    const userImg = tokenObject.image_url

    res.render('dash', {
      title: 'Dashboard',
      userFullName: userFullName,
      userImg: `${userImg}`,
      about_user: about_user,
      hostingCount: res.locals.hostingCount,
      participatingCount: res.locals.participatingCount
    })
  }

  <<
  << << < HEAD


router.get('/', getHostingCount, getParticipatingCount, renderDash) ===
  === =
  router.get('/', renderDash) >>>
  >>> > 22 f6ab9d521417b2fa6150c09b73d64f37e44138

module.exports = router;