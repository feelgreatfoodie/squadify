const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/', (req, res, next) => {
  res.clearCookie('token')
  res.status(200).redirect('/')
})

module.exports = router;
