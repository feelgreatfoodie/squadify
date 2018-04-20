const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const checkForExistingEmail = (req, res, next) => {
  const {
    email_address
  } = req.body
  knex('users')
    .where('email_address', email_address)
    .then(user => {
      if (user.length === 1) {
        next()
      } else {
        res.status(400).send('Bad email or password')
      }
    })
}

const checkPassword = (req, res, next) => {
  const KEY = req.body.password

  knex('users')
    .where('email_address', req.body.email_address)
    .first()
    .then((user) => {
      bcrypt.compare(KEY, user.hashed_password, function(err, passwordRes) {
        if (passwordRes === true) {
          const token = jwt.sign({
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'image_url': user.user_image_url,
            'about_user': user.about_user
          }, process.env.JWT_KEY)
          res.cookie(`token=${token}; Path=\/;.HttpOnly`)
          res.status(200).send(user)
        } else {
          res.setHeader('content-type', 'text/plain');
          res.status(400)
          res.send("Bad email or password")
        }
      })
    })
    .catch((err) => {
      res.setHeader('content-type', 'text/plain');
      res.status(400)
      res.send("Bad email or password")
    })
}

router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Login'
  })
})

router.post('/', checkForExistingEmail, checkPassword)

module.exports = router
