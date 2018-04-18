var express = require('express');
var router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});


const checkForExistingEmail = (req, res, next) => {
  console.log("checkForExistingEmail");
  const {
    email_address
  } = req.body
  knex('users')
    .where('email_address', email_address)
    .then(user => {
      if (user.length === 1) {
        next()
      } else {
        res.status(400).send('User does not exist')
      }
    })
}

function checkPassword(req, res) {
  // console.log("checkPassword");
  const KEY = req.body.password
  //console.log("then user and key=", KEY);
  //console.log("email=", KEY);
  // console.log("KEY", KEY)
  // console.log("email", req.body.email)
  knex('users')
    .where('email_address', req.body.email_address)
    .first()
    .then((user) => {
      // console.log(rows);
      //console.log("user", user);
      bcrypt.compare(KEY, user.hashed_password, function(err, passwordRes) {
        // res == true
        // console.log('key', KEY);
        // console.log('input hashed', rows.hashed_password);
        // console.log('res', passwordRes);

        //console.log("passwordRes=", passwordRes);
        if (passwordRes === true) {
          const token = jwt.sign({
            'id': user.id
          }, process.env.JWT_KEY)
          console.log('token assigned: ', token)
          res.cookie(`token=${token}; Path=\/;.HttpOnly`)
          res.status(200).send(user)
        } else {
          res.setHeader('content-type', 'text/plain');
          res.status(400)
          res.send("Bad email or password")
          //res.send(user)
        }
      });
    })
    .catch((err) => {
      //res.statusCode(400)
      res.setHeader('content-type', 'text/plain');
      res.status(400)
      //res.send(err)
      res.send("Bad email or password")
    })
}


const postUser = (req, res, next) => {
  const {
    first_name,
    last_name,
    email_address,
    password
  } = req.body

  bcrypt.hash(password, 10, (err, hashed_password) => {
    const newUser = {
      'first_name': first_name,
      'last_name': last_name,
      'email_address': email_address,
      'hashed_password': hashed_password
    }

    knex('users')
      .insert(newUser)
      .returning(['id', 'first_name', 'last_name', 'email_address'])
      .then(user => {
        const token = jwt.sign({
          'id': user[0].id
        }, process.env.JWT_KEY)
        console.log('token: ', token)
        res.cookie(`token=${token}; Path=\/;.HttpOnly`)
        res.status(200).send(user)
      })
      .catch(err => {
        next(err)
      })
  })
}

router.post('/', checkForExistingEmail, checkPassword)

module.exports = router;