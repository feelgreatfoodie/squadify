const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const checkForExisitingEmail = (req, res, next) => {
  const { email_address } = req.body
  knex('users')
    .where('email_address', email_address)
    .then(user => {
      if (user.length === 1) {
        res.status(400).send('Email address already registered')
      }
      else next()
    })
}

const checkForUser = (req, res, next) => {
  const { id } = req.params
  knex('users')
    .where('id', id)
    .then(user => {
      if (user.length < 1) {
        res.status(400).send(`No user found with id ${id}`)
      }
      else next()
    })
}

const getUsers = (req, res, next) => {
  const { id } = req.params

  if (id) {
    knex('users')
      .where('id', id)
      .select('id', 'first_name', 'last_name', 'email_address')
      .first()
      .then(user => {
        res.status(200).send(user)
      })
      .catch(err => {
        next(err)
      })
  } else {
    knex('users')
      .select('id', 'first_name', 'last_name', 'email_address')
      .then(users => {
        res.status(200).send(users)
      })
      .catch(err => {
        next(err)
      })
  }
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
          'id': user[0].id
        }, process.env.JWT_KEY)
        res.cookie(`token=${token}; Path=\/;.HttpOnly`)
        res.status(200).send(user)
      })
      .catch(err => {
        next(err)
      })
  })
}

const updateUser = (req, res, next) => {
  const { id } = req.params
  const { first_name, last_name, email_address, password } = req.body
  knex('users')
    .where('id', id)
    .update({first_name, last_name, email_address})
    .returning(['first_name', 'last_name', 'email_address'])
    .then(user => {
      res.status(200).send(user[0])
    })
    .catch(err => {
      next(err)
    })
}

const deleteUser = (req, res, next) => {
  const { id } = req.params
  knex('users')
    .where('id', id)
    .del()
    .returning(['first_name', 'last_name', 'email_address'])
    .then(user => {
      res.status(200).send(user[0])
    })
    .catch(err => {
      next(err)
    })
}

router.get('/', getUsers)
router.get('/:id', checkForUser, getUsers)
router.post('/', checkForExisitingEmail, postUser)
router.patch('/:id', checkForUser, updateUser)
router.delete('/:id', checkForUser, deleteUser)

module.exports = router
