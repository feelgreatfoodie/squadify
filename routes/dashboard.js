const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const knex = require('../knex')

/* GET home page. */

const getHostingCount = (req, res, next) => {
  res.locals.hostingCount = ''
  const owner_id = jwt.verify(req.cookies.token, process.env.JWT_KEY).id
  knex('events')
    .where({
      owner_id: owner_id,
    })
    .count('id')
    .first()
    .then(count => {
      console.log("count", count.count)
      if (count.count > 0) {
        res.locals.hostingCount = count.count
      } else {
        res.locals.hostingCount = ""
      }
      next()
    })
}

const getParticipatingCount = (req, res, next) => {
  res.locals.participatingCount = ''
  const user_id = jwt.verify(req.cookies.token, process.env.JWT_KEY).id
  knex('events_users')
    .where({
      users_id: user_id,
    })
    .count('users_id')
    .first()
    .then(count => {
      console.log("count", count.count)
      if (count.count > 0) {
        res.locals.participatingCount = count.count
      } else {
        res.locals.participatingCount = ""
      }
      next()
    })
}


const renderDash = (req, res, next) => {
  // let userFullName = 'User name'
  // let tokenObject = ''
  // let about_user = ''

  console.log("second res.locals.hostingCount");

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

router.get('/', getHostingCount, getParticipatingCount, renderDash)

module.exports = router;