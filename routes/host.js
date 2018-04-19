const express = require('express')
const router = express.Router()
const knex = require('../knex')


const postEvent = (req, res, next) => {
  const {
    eventTitle,
    eventDescription,
    eventDateTime,
    duration,
    eventLocation,
    eventDifficulty,
    eventImage
  } = req.body

  const users_id = jwt.verify(req.cookies.token, process.env.JWT_KEY).id

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

  knex('events')
    .insert(newEvent)
    .returning(['event_id', 'owner_id', 'title', 'location', 'difficulty', 'image_url', 'start_date_time', 'duration_minutes', 'description'])
    .then(event => {
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
