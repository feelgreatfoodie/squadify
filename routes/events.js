const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const boom = require('boom')


const verifyEvent = (req, res, next) => {
  const {
    id
  } = req.params
  knex('events')
    .where('id', id)
    .then(event => {
      if (event.length === 0) res.status(404).send(`No event found with id ${id}`)
      else next()
    })
}

const verifyUserEvent = (req, res, next) => {
  const events_id = req.body.eventId
  const users_id = jwt.verify(req.body.userToken, process.env.JWT_KEY).id
  knex('events_users')
    .where({events_id, users_id})
    .then(match => {
      if(match.length > 0) res.status(400).send('Already registered!')
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

  const {
    owner_id,
    title,
    location,
    start_date_time,
    duration_minutes,
    description
  } = req.body

  const newEvent = {
    'owner_id': owner_id,
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
  const events_id = req.body.eventId
  const users_id = jwt.verify(req.body.userToken, process.env.JWT_KEY).id
  knex('events_users')
    .insert({events_id, users_id})
    .returning('*')
    .then(entry => {
      res.status(200).send(entry)
    })
    .catch(err => {
      next(err)
    })
}

const unJoinEvent = (req, res, next) => {
  const events_id = req.body.eventId
  const users_id = jwt.verify(req.body.userToken, process.env.JWT_KEY).id
  knex('events_users')
    .where({events_id, users_id})
    .del()
    .returning('*')
    .then(entry => {
      res.status(200).send(entry)
    })
    .catch(err => {
      next(err)
    })
  }

const updateEvent = (req, res, next) => {
  const { id } = req.params
  const {
    owner_id,
    title,
    location,
    start_date_time,
    duration_minutes,
    description
  } = req.body

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
    .then(event => {
      res.status(200).send(event[0])
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
    .then(event => {
      res.status(200).send(event[0])
    })
    .catch(err => {
      next(err)
    })
}

const renderEventPage = (req, res, next) => {
  res.render('events', { title: 'Event Detail' })
}

router.get('/', getEvents)
router.get('/:id', verifyEvent, renderEventPage)
router.get('/data/:id', verifyEvent, getEvents)
router.post('/', postEvent)
router.post('/:id', verifyEvent, verifyUserEvent, joinEvent)
router.post('/unJoin/:id', verifyEvent, unJoinEvent)
router.patch('/:id', verifyEvent, updateEvent)
router.delete('/:id', verifyEvent, deleteEvent)

module.exports = router;
