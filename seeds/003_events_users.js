exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events_users').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('events_users').insert([{
          events_id: 1,
          users_id: 7
        }, {
          events_id: 1,
          users_id: 8
        }, {
          events_id: 1,
          users_id: 2
        }, {
          events_id: 2,
          users_id: 5
        }, {
          events_id: 2,
          users_id: 3
        }, {
          events_id: 3,
          users_id: 8
        }, {
          events_id: 3,
          users_id: 6
        }, {
          events_id: 4,
          users_id: 3
        }, {
          events_id: 4,
          users_id: 6
        }, {
          events_id: 4,
          users_id: 7
        }, {
          events_id: 5,
          users_id: 2
        }, {
          events_id: 5,
          users_id: 9
        }, {
          events_id: 6,
          users_id: 6
        }, {
          events_id: 6,
          users_id: 1
        }, {
          events_id: 5,
          users_id: 10
        }, {
          events_id: 6,
          users_id: 7
        }
      ])
      ])
    })
}
