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

  if (req.cookies.token !== undefined) {
    tokenObject = jwt.verify(req.cookies.token, process.env.JWT_KEY)
    userFullName = `${tokenObject.first_name} ${tokenObject.last_name}`
    about_user = tokenObject.about_user
  }

  res.render('dash', {
    title: 'Dashboard',
    userFullName: userFullName,
    userImg: `${tokenObject.image_url}`,
    about_user: about_user,
    hostingCount: res.locals.hostingCount,
    participatingCount: res.locals.participatingCount
  })
}



router.get('/', getHostingCount, getParticipatingCount, renderDash)

module.exports = router;