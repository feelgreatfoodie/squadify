const express = require('express');
const router = express.Router();
const knex = require('../knex')

const getTeam = (req, res, next) => {
  knex('users')
    .where('id', '<', 5 )
    .select(['first_name', 'last_name', 'user_image_url', 'email_address', 'github', 'linkedIn'])
    .then(users => {
      res.send(users)
    })
}

router.get('/', function(req, res, next) {
  res.render('about', { title: 'About The Development Team' })
})

router.get('/us', getTeam)

module.exports = router;
