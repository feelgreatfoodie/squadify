const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')

const postEvent = (req, res, next) => {
  console.log('this is the req.body: ', req.body)
  const {
    eventTitle,
    eventDescription,
    eventDateTime,
    duration,
    eventLocation,
    eventDifficulty,
    eventImage
  } = req.body
console.log('this is the req.cookies', req.cookies.token)
  const users_id = jwt.verify(req.cookies.token, process.env.JWT_KEY).id
console.log('this is the users_id', users_id)
  const newEvent = {
    'owner_id': users_id,
    'title': eventTitle,
    'location': eventLocation,
    'difficulty': eventDifficulty,
    'image_url': eventImage,
    'start_date_time': eventDateTime,
    'duration_minutes': duration,
    'description': eventDescription
  }
console.log('hola, me llamo: ', newEvent)
  knex('events')
    .insert(newEvent)
    .returning(['id', 'owner_id', 'title', 'location', 'difficulty', 'image_url', 'start_date_time', 'duration_minutes', 'description'])
    .then(event => {
      console.log('wasssssup!!!', event)
      res.status(200).send(event)
    })
    .catch(err => {
      next(err)
    })
}

router.get('/', function(req, res, next) {
  res.render('host', {
    title: 'Host An Event'
  })
})

router.post('/', postEvent)
module.exports = router;
