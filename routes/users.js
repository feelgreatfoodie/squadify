const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')


const checkForExisitingEmail = (req, res, next) => {
  // console.log('hola, me llamo: ', req.body, 'type', typeof(req.body))
  const { email_address } = req.body
  // console.log('email_address ', email_address)
  knex('users')
    .where('email_address', email_address)
    .then(user => {
      // console.log('hola me llamo: ', user.length)
      if (user.length === 1) {
        res.status(400).send('Email address already registered')
      }
      else next()
    })
}

const getUsers = (req, res, next) => {
  const { id } = req.params

  if (id) {
    knex('users')
      .where('id', id)
      .first()
      .then(user => {
        res.status(200).send(user)
      })
      .catch(err => {
        next(err)
      })
  } else {
    knex('users')
      .then(users => {
        res.status(200).send(users)
      })
      .catch(err => {
        next(err)
      })
  }
}

const postUser = (req, res, next) => {

console.log('whazzzzup')
  const {
    first_name,
    last_name,
    email_address,
    password
  } = req.body

  console.log('hola, me llamo: ', req.body)

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
        // console.log('bueno: ', process.env.JWT_KEY)
        const token = jwt.sign({
          'id': user[0].id
        }, process.env.JWT_KEY)
        console.log('token: ', token)
        res.cookie(`token=${token}; Path=\/;.HttpOnly`)
        res.status(200).send(user)
      })
      .catch(err => {
        next(err)
      })
  })
}

const updateUser = (req, res, next) => {
  knex('user')
    .where('id', id)
    .update({first_name, last_name, email_address})
    .returning('*')
    .first()
    .then(user => {
      res.status(200).send(user)
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
    .first()
    .then(user => {
      res.status(200).send(user)
    })
    .catch(err => {
      next(err)
    })
}

router.get('/', getUsers)
router.get('/:id', getUsers)
router.post('/', checkForExisitingEmail, postUser)
router.patch('/:id', getUsers, updateUser)
router.delete('/:id', getUsers, deleteUser)

module.exports = router
