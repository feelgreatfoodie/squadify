const express = require('express')
const router = express.Router()
const knex = require('../knex')


const verifyEvent = (req, res, next) => {
  const {
    id
  } = req.params
  knex('events')
    .where('id', id)
    .then(event => {
      if (event.length === 0) res.status(404).send()
      else next()
    })
}

const getEvents = (req, res, next) => {
  const {
    id
  } = req.params
  if (id) {
    knex('events')
      .where('id', id)
      .first()
      .then(event => {
        res.status(200).send(event)
      })
      .catch(err => {
        next(err)
      })
  } else {
    knex('events')
      .then(events => {
        res.status(200).send(events)
      })
      .catch((err) => {
        next(err)
      })
  }
}

const postEvent = (req, res, next) => {
  console.log('hola, me llamo: ', request)

  const {
    owner_id,
    title,
    location,
    start_date_time,
    duration_minutes,
    description
  } = request

  const newEvent = {
    'title': title,
    'location': location,
    'start_date_time': start_date_time,
    'duration_minutes': duration_minutes,
    'description': description
  }

  knex('events')
    .insert(newEvent)
    .returning(['id', 'title', 'location', 'start_date_time', 'duration_minutes', 'description'])
    .then(event => {
      res.status(200).send(event)
    })
    .catch(err => {
      next(err)
    })
}

const joinEvent = (req, res, next) => {
  console.log('hola')
}
const updateEvent = (req, res, next) => {
  knex('events')
    .where('id', id)
    .update({
      title,
      location,
      start_date_time,
      duration_minutes,
      description
    })
    .returning('*')
    .first()
    .then(event => {
      res.status(200).send(event)
    })
    .catch(err => {
      next(err)
    })
}

const deleteEvent = (req, res, next) => {
  const {
    id
  } = req.params
  knex('events')
    .where('id', id)
    .del()
    .returning('*')
    .first()
    .then(event => {
      res.status(200).send(event)
    })
    .catch(err => {
      next(err)
    })
}

router.get('/', getEvents)
router.get('/:id', verifyEvent, getEvents)
router.post('/', postEvent)
router.post('/:id', joinEvent)
router.patch('/:id', getEvents, updateEvent)
router.delete('/:id', getEvents, deleteEvent)

module.exports = router;
