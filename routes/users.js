const express = require('express')
const router = express.Router()
const knex = require('../knex')

const getUser = (req, res, next) => {
  const { id } = req.params
  knex('users')
    .where('id', id)
    .first()
    .then(user => {
      res.status(200).send(user)
    })
}

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', getUser)

module.exports = router;
