const express = require('express')
const router = express.Router()
const knex = require('../knex')

const getEvents = (req, res, next) => {
  knex('events')
    .then(events => {
      res.status(200).send(events)
    })
    .catch((err) => {
     next(err)
   })
}

const verifyEvent = (req, res, next) => {
  const { id } = req.params
  knex('events')
    .where('id', id)
    .then(event => {
      if (event.length === 0) res.status(404).send()
      else next()
    })
}

const getEventsById = (req, res, next) => {
  const { id } = req.params
  knex('events')
    .where('id', id)
    .first()
    .then(event => {
      res.status(200).send(event)
    })
    .catch((err) => {
     next(err)
   })
}

router.get('/', getEvents)

router.get('/:id', verifyEvent, getEventsById)

module.exports = router;
