var express = require('express')
var router = express.Router()
const jwt = require('jsonwebtoken')


// router.get('/', function(req, res, next) {
//   if (req.cookies.token === undefined) {
//     res.status(400).send('User is not signed in!')
//   }
//   res.clearCookie('token')
//   res.redirect('/')
// });


router.get('/', (req, res, next) => {
  // res.clearCookie('token', { path: '/' });
  res.clearCookie('token');
  res.status(200).redirect('/');
});

module.exports = router;
