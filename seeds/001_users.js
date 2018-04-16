exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return Promise.all([
            // Inserts seed entries
        knex('users').insert([{
          id: 1,
          first_name: "Edmond",
          last_name: "Dantes",
          email_address: "edmonddantes@mercedes.com",
          hashed_password: "$2a$10$y2pXTMDpQiZter2isn9t9eJYZYpUOfrldEh5xSt06.wWLpi.zvC52",
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 2,
          first_name: "Rodion",
          last_name: "Raskolnikov",
          email_address: "onepoundheavier@ussr.justice.org",
          hashed_password: "$2a$10$Fhg0e4BoT1dDaw846w7Bn.zPPWIMufgIKWeoB5Py2VoXLpjrcG3Ti",
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 3,
          first_name: "Steve",
          last_name: "Rogers",
          email_address: "thecaptain @mcuhq.com",
          hashed_password: "$2a$10$jsitaILM0OI15oPGEXoxO.sFZ1d/xEEf70iFAq3PqL/vZ2Mfyj5QS",
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 4,
          first_name: "Natalia",
          last_name: "Romanova",
          email_address: "blackwidow@mcuhq.com",
          hashed_password: "$2a$10$U2.ZXLrRS7gqnK5nRmKdjuaHmBsRrsCGKL4s6x0e7lJb2lQQMJA4e",
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 5,
          first_name: "Mercedes",
          last_name: "Iguanada",
          email_address: "mercedes@mercedes.com",
          hashed_password: "$2a$10$FRzKvSWMdPaVhEfztI3ewevYXrYUMzt1uNXUQTIlx6HTIU7BvJ3by",
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 6,
          first_name: "Daisy",
          last_name: "Buchanan",
          email_address: "gildedlady@limansions.com",
          hashed_password: "$2a$10$EtGSen95xoyEahquwSUZzOFg.anEj5rPKpj5afi.Y.ysq8dFFlf.a",
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }, {
          id: 7,
          first_name: "Nick",
          last_name: "Carraway",
          email_address: "theobserver@limansions.com",
          hashed_password: "$2a$10$QtTqzI6mr381hMpEs10S/OuL74kMoNg49U7O1OxtgajFtkJaOi4t.",
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
          }])
          .then(() => {
              return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
            })
          ])
        })
    }
