const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Login'
  })
})

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
            'first_name': user.first_name
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

const postUser = (req, res, next) => {
  const {
    first_name,
    last_name,
    email_address,
    password
  } = req.body

  bcrypt.hash(password, 10, (err, hashed_password) => {
    const newUser = {
      'first_name': first_name,
      'last_name': last_name,
      'email_address': email_address,
      'hashed_password': hashed_password
    }

    knex('users')
      .insert(newUser)
      .returning(['id', 'first_name', 'last_name', 'email_address'])
      .then(user => {
        const token = jwt.sign({
          'id': user[0].id,
          'first_name': user[0].first_name
        }, process.env.JWT_KEY)
        res.cookie(`token=${token}; Path=\/;.HttpOnly`)
        res.status(200).send(user)
      })
      .catch(err => {
        next(err)
      })
  })
}

router.post('/', checkForExistingEmail, checkPassword)

module.exports = router
