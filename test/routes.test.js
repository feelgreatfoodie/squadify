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
        title: 'Hiking Mount Sanitas with rescue dogs',
        location: 'Mount Sanitas',
        start_date_time: "2018-04-21T09:00:00Z",
        duration_minutes: 60,
        description: "Come one, come all! Let’s hike Mt. Sanitas this Saturday morning. Bring water and snacks. We’ll bring the furry friends! Get ready to grab a leash and have your heart melted as you clamber up our rocky neighbor to the west. If you love the dogs too much to give them back, they are available for adoption!!"
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
        title: 'Hiking Mount Sanitas with rescue dogs',
        location: 'Mount Sanitas',
        start_date_time: "2018-04-21T09:00:00Z",
        duration_minutes: 60,
        description: "Come one, come all! Let’s hike Mt. Sanitas this Saturday morning. Bring water and snacks. We’ll bring the furry friends! Get ready to grab a leash and have your heart melted as you clamber up our rocky neighbor to the west. If you love the dogs too much to give them back, they are available for adoption!!"
      }, done);

    /* eslint-enable max-len */
  });

  test('POST /books', (done) => {
    /* eslint-disable max-len */
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

    /* eslint-enable max-len */
  });

  test('PATCH /books/:id', (done) => {
    /* eslint-disable max-len */
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

    /* eslint-enable max-len */
  });

  test('DELETE /books/:id', (done) => {
    /* eslint-disable max-len */
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

    /* eslint-enable max-len */
  });
}));