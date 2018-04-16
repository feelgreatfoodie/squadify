var express = require('express');
var router = express.Router();
const knex = require('../knex');

const getEvents = (req, res, next) => {

  knex('events')
    .orderBy('start_date_time', 'asc')
    .then(events => {
      res.send('events')
    })

}

router.get('/', function(req, res, next) {
  res.render('events', { title: 'WarDogs - events' });
});

router.get('/:id', function(req, res, next) {
  const { id } = req.params
  res.render('events', { title: `Event #${id}`})
})

module.exports = router;
