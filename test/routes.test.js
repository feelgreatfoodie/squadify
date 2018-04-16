'use strict';

process.env.NODE_ENV = 'test';

const {
  suite,
  test
} = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../app');
const {
  addDatabaseHooks
} = require('./utils')
suite('events routes', addDatabaseHooks(() => {
  test('GET /events', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/events')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
          id: 1,
          owner_id: 3,
          title: "Hiking Mount Sanitas with rescue dogs",
          location: "Mount Sanitas",
          start_date_time: '2018-04-21T09:00:00Z',
          duration_minutes: 60,
          description: "Come one, come all! Let’s hike Mt. Sanitas this Saturday morning. Bring water and snacks. We’ll bring the furry friends! Get ready to grab a leash and have your heart melted as you clamber up our rocky neighbor to the west. If you love the dogs too much to give them back, they are available for adoption!!"
        },
        {
          id: 2,
          owner_id: 2,
          title: "Walk with wolves!",
          location: "Nederland, CO",
          start_date_time: "2018-04-28T12:00:00Z",
          duration_minutes: 60,
          description: "Come meet the pack! The day will begin with a guided tour, where you will learn the story of each of our pack members, as well as a brief lesson on the history of the species. Afterwards, you'll have a chance enter some of the wolf habitats to interact one-on-one, where you may even get a kiss! Starting in June, our experiences will include a Sunset Hike and provide you with an unforgettable summer experience! These special hikes will be slightly longer than our traditional nature walk so you can fully witness the expansive beauty of the Arapaho National Forest as the sun settles behind its mountains at 'golden hour'. A truly breathtaking sight, a stunning final activity, and an exceptional photo opportunity as you conclude your time connecting with the pack! We look forward to having you join us for this once-in-a-lifetime experience!"
        },
        {
          id: 3,
          owner_id: 4,
          title: "Hang Gliding",
          location: "Flatirons",
          start_date_time: "2018-04-22T12:00:00Z",
          duration_minutes: 60,
          description: "Take a tandem flight with an accredited instructor in a hang glider built for two. I'll handle the takeoff and landing, and you'll get to enjoy the amazing experience of soaring in a hang glider on a 20- to 50-minute flight. I’ll point out landmarks from above and explain how to maneuver the glider. If you’re up for it—and conditions allow—you may even get to take the controls for a bit."
        },
        {
          id: 4,
          owner_id: 3,
          title: "Earth Treks Monday night",
          location: "Golden, CO",
          start_date_time: "2018-04-23T18:30:00Z",
          duration_minutes: 60,
          description: "Let's meetup and climb at Earth Treks. Meet at the tables in the back by the bouldering area at 6:30pm. We'll pair or triple off and get some climbing in! P.S. Beginners and advanced climbers are always welcome. We typically have a mixed group of top rope and lead climbers of abilities from 5.6 to 5.12. If it is your first time to Earth Treks, show up a bit early to fill out the waiver and take the top rope belay test. You can still climb even if you don't know how to belay, so don't hesitate to join!"
        }
      ], done);

    /* eslint-enable max-len */
  });

  test('GET /users/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/users/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 1,
        title: 'Hiking Mount Sanitas with rescue dogs',
        location: 'Mount Sanitas',
        start_date_time: "2018-04-21T09:00:00Z",
        duration_minutes: 60,
        description: "Come one, come all! Let’s hike Mt. Sanitas this Saturday morning. Bring water and snacks. We’ll bring the furry friends! Get ready to grab a leash and have your heart melted as you clamber up our rocky neighbor to the west. If you love the dogs too much to give them back, they are available for adoption!!"
      }, done);

    /* eslint-enable max-len */
  });
}));

suite('users routes', addDatabaseHooks(() => {
  test('GET /users', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 1,
        first_name: "Edmond",
        last_name: "Dantes",
        email_address: "edmonddantes@mercedes.com",
        hashed_password: "$2a$10$y2pXTMDpQiZter2isn9t9eJYZYpUOfrldEh5xSt06.wWLpi.zvC52"
      }, {
        id: 2,
        first_name: "Rodion",
        last_name: "Raskolnikov",
        email_address: "onepoundheavier@ussr.justice.org",
        hashed_password: "$2a$10$Fhg0e4BoT1dDaw846w7Bn.zPPWIMufgIKWeoB5Py2VoXLpjrcG3Ti"
      }, {
        id: 3,
        first_name: "Steve",
        last_name: "Rogers",
        email_address: "thecaptain @mcuhq.com",
        hashed_password: "$2a$10$jsitaILM0OI15oPGEXoxO.sFZ1d/xEEf70iFAq3PqL/vZ2Mfyj5QS"
      }, {
        id: 4,
        first_name: "Natalia",
        last_name: "Romanova",
        email_address: "blackwidow@mcuhq.com",
        hashed_password: "$2a$10$U2.ZXLrRS7gqnK5nRmKdjuaHmBsRrsCGKL4s6x0e7lJb2lQQMJA4e"
      }, {
        id: 5,
        first_name: "Mercedes",
        last_name: "Iguanada",
        email_address: "mercedes@mercedes.com",
        hashed_password: "$2a$10$FRzKvSWMdPaVhEfztI3ewevYXrYUMzt1uNXUQTIlx6HTIU7BvJ3by"
      }, {
        id: 6,
        first_name: "Daisy",
        last_name: "Buchanan",
        email_address: "gildedlady@limansions.com",
        hashed_password: "$2a$10$EtGSen95xoyEahquwSUZzOFg.anEj5rPKpj5afi.Y.ysq8dFFlf.a"
      }, {
        id: 7,
        first_name: "Nick",
        last_name: "Carraway",
        email_address: "theobserver@limansions.com",
        hashed_password: "$2a$10$QtTqzI6mr381hMpEs10S/OuL74kMoNg49U7O1OxtgajFtkJaOi4t."
      }], done);

    /* eslint-enable max-len */
  });

  test('GET /events/:id', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/events/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        id: 1,
        first_name: "Edmond",
        last_name: "Dantes",
        email_address: "edmonddantes@mercedes.com",
        hashed_password: "$2a$10$y2pXTMDpQiZter2isn9t9eJYZYpUOfrldEh5xSt06.wWLpi.zvC52"
      }, done);

    /* eslint-enable max-len */
  });


  /*
    test('POST /books', (done) => {
      // eslint-disable max-len
      request(server)
        .post('/books')
        .set('Accept', 'application/json')
        .send({
          title: 'Think Python',
          author: 'Allen B. Downey',
          genre: 'Python',
          description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
          coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
        })
        .expect('Content-Type', /json/)
        .expect((res) => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, {
          id: 9,
          title: 'Think Python',
          author: 'Allen B. Downey',
          genre: 'Python',
          description: 'If you want to learn how to program, working with Python is an excellent way to start. This hands-on guide takes you through the language a step at a time, beginning with basic programming concepts before moving on to functions, recursion, data structures, and object-oriented design. This second edition and its supporting code have been updated for Python 3.',
          coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
        }, done);

      // eslint-enable max-len
    });

    test('PATCH /books/:id', (done) => {
      // eslint-disable max-len
      request(server)
        .patch('/books/1')
        .set('Accept', 'application/json')
        .send({
          title: 'Think like Python',
          author: 'Allen B. Downey',
          genre: 'Python stuff',
          description: 'More Python',
          coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
        })
        .expect('Content-Type', /json/)
        .expect((res) => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, {
          id: 1,
          title: 'Think like Python',
          author: 'Allen B. Downey',
          genre: 'Python stuff',
          description: 'More Python',
          coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
        }, done);

      // eslint-enable max-len
    });

    test('DELETE /books/:id', (done) => {
      // eslint-disable max-len
      request(server)
        .del('/books/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect((res) => {
          delete res.body.createdAt;
          delete res.body.updatedAt;
        })
        .expect(200, {
          title: 'JavaScript, The Good Parts',
          author: 'Douglas Crockford',
          genre: 'JavaScript',
          description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that\'s more reliable, readable, and maintainable than the language as a whole—a subset you can use to create truly extensible and efficient code.',
          coverUrl: 'https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/284/javascript_the_good_parts.jpg'
        }, done);

  // eslint-enable max-len
  });
  */
}));