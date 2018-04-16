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

router.get('/:id', getEventsById)

module.exports = router;
