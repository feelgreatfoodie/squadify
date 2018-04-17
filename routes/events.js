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
  // res.render('events', { id, title: 'WarDogs' })
}

const getEventDetail = (req, res, next) => {
  const { id } = req.params
  res.render('events', { id, title: 'WarDogs' })
}

router.get('/', getEvents)

// router.get('/:id', verifyEvent, getEventsById)

router.get('/:id', verifyEvent, getEventDetail)

// function (req, res, next) {
//   const { id } = req.params
//   // const { stuff } = getEventsById(req, res, next)
//   res.render('events', { id, stuff, title: 'WarDogs' })
// });

module.exports = router;
