const express = require('express')
const router = express.Router()
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');


const verifyEvent = (req, res, next) => {
  const {
    id
  } = req.params
  knex('events')
    .where('id', id)
    .then(event => {
      if (event.length === 0) res.status(404).send(`No event found with id ${id}`)
      else {
        //console.log("event", event);
        res.locals.host_id = event[0].owner_id
        next()
      }
    })
}


const verifyJoined = (req, res, next) => {
  if (!req.cookies.token)
    next()

  const events_id = req.params.id
  const users_id = jwt.verify(req.cookies.token, process.env.JWT_KEY).id
  console.log("events_id", events_id);
  console.log("users_id", users_id);
  res.locals.registered = false;

  knex('events_users')
    .where({
      events_id,
      users_id
    })
    .then(match => {
      if (match.length > 0) {
        res.locals.registered = true;
        next()
      } else next()
    })
}

const verifyUserEvent = (req, res, next) => {
  const events_id = req.body.eventId
  const users_id = jwt.verify(req.cookies.token, process.env.JWT_KEY).id
  res.locals.registered = false;
  knex('events_users')
    .where({
      events_id,
      users_id
    })
    .then(match => {
      if (match.length > 0) {
        // alert('Already registered!')
        //deleteEvent(req, res, next)
        res.locals.registered = true;
        //res.status(200).send()
        //res.status(400).send('Already registered!')
        next()
      } else next()
    })
}

const getEvents = (req, res, next) => {
  const {
    id
  } = req.params
  if (id) {
    knex('events')
      .where('events.id', id)
      .innerJoin('users', 'events.owner_id', 'users.id')
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
    .insert({
      events_id,
      users_id
    })
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
    .where({
      events_id,
      users_id
    })
    .del()
    .returning('*')
    .then(entry => {
      res.status(200).send(entry)
    })
    .catch(err => {
      next(err)
    })
}

const toggleJoinEvent = (req, res, next) => {
  const events_id = req.body.eventId
  const users_id = jwt.verify(req.body.userToken, process.env.JWT_KEY).id

  console.log("res.locals.registered", res.locals.registered);

  if (res.locals.registered) {

    knex('events_users')
      .where({
        events_id,
        users_id
      })
      .del()
      .returning('*')
      .then(entry => {
        res.status(200).send(res.locals.registered)
      })
      .catch(err => {
        next(err)
      })
  } else {
    knex('events_users')
      .insert({
        events_id,
        users_id
      })
      .returning('*')
      .then(entry => {
        res.status(200).send(res.locals.registered)
        next()
      })
      .catch(err => {
        next(err)
      })

  }
}


const emailEventHostOnJoin = (req, res, next) => {
  console.log("emailEventHostOnJoin");
  console.log(res.locals.host_id);
  const user = jwt.verify(req.cookies.token, process.env.JWT_KEY)

  knex('users')
    .where({
      id: res.locals.host_id,
    })
    //.del()
    .then(host => {
      console.log("user", host);
      console.log("host.email_address", host[0].email_address);
      //res.status(200).send(host)
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rocky.mntn.pols@gmail.com',
          pass: '********'
        }
      });

      let mailOptions = {
        from: 'rocky.mntn.pols@gmail.com',
        to: host[0].email_address,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    })
    .catch(err => {
      next(err)
    })
}


const updateEvent = (req, res, next) => {
  const {
    id
  } = req.params
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
  let registered = "Join Event"
  let buttonClass = "btn-success"
  if (res.locals.registered) {
    registered = "Leave Event"
    buttonClass = "btn-danger"
  }

  res.render('events', {
    title: 'Event Detail',
    registered: registered,
    buttonClass: buttonClass
  })
}

router.get('/', getEvents)
router.get('/:id', verifyEvent, verifyJoined, renderEventPage)
router.get('/data/:id', verifyEvent, getEvents)
router.post('/', postEvent)
router.post('/:id', verifyEvent, verifyUserEvent, toggleJoinEvent)
//router.post('/unJoin/:id', verifyEvent, unJoinEvent)
router.patch('/:id', verifyEvent, updateEvent)
router.delete('/:id', verifyEvent, deleteEvent)

module.exports = router;