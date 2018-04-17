const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const checkForExisitingEmail = (req, res, next) => {
  const { email } = req.body
  knex('users')
    .select('email_address')
    .where('email_address', email)
    .first()
    .then(user => {
      if(user) res.status(400).send('Email address already registered')
      else next()
    })
}

const getUser = (req, res, next) => {
  const { id } = req.params
  knex('users')
    .where('id', id)
    .first()
    .then(user => {
      res.status(200).send(user)
    })
}

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', checkForExisitingEmail, function(req, res, next) {
  res.status(200).send('success!')
})

router.get('/:id', getUser)

module.exports = router;
