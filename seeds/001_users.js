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
          image_url: 'https://g81-wardogs.herokuapp.com/assets/edmond.jpg'
        }, {
          id: 2,
          first_name: "Gordon",
          last_name: "Ramsay",
          email_address: "gordon@ramsay.com",
          hashed_password: "$2b$10$EcWNikpBPnj.JDup2RKFZe3v26Qa3qX/RVqcvEpWPc0D8i5J6DWBu",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/gordon.jpg'
        }, {
          id: 3,
          first_name: "Steve",
          last_name: "Rogers",
          email_address: "thecaptain@mcuhq.com",
          hashed_password: "$2a$10$jsitaILM0OI15oPGEXoxO.sFZ1d/xEEf70iFAq3PqL/vZ2Mfyj5QS",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/steve.jpg'
        }, {
          id: 4,
          first_name: "Natalia",
          last_name: "Romanova",
          email_address: "blackwidow@mcuhq.com",
          hashed_password: "$2a$10$U2.ZXLrRS7gqnK5nRmKdjuaHmBsRrsCGKL4s6x0e7lJb2lQQMJA4e",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/natalia.jpg'
        }, {
          id: 5,
          first_name: "Mercedes",
          last_name: "Iguanada",
          email_address: "mercedes@mercedes.com",
          hashed_password: "$2a$10$FRzKvSWMdPaVhEfztI3ewevYXrYUMzt1uNXUQTIlx6HTIU7BvJ3by",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/mercedes.jpg'
        }, {
          id: 6,
          first_name: "Daisy",
          last_name: "Buchanan",
          email_address: "gildedlady@limansions.com",
          hashed_password: "$2a$10$EtGSen95xoyEahquwSUZzOFg.anEj5rPKpj5afi.Y.ysq8dFFlf.a",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/daisy.jpg'
        }, {
          id: 7,
          first_name: "Nick",
          last_name: "Carraway",
          email_address: "theobserver@limansions.com",
          hashed_password: "$2a$10$QtTqzI6mr381hMpEs10S/OuL74kMoNg49U7O1OxtgajFtkJaOi4t.",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/nick.jpg'
        },{
          id: 8,
          first_name: "Christian",
          last_name: "Bourlier",
          email_address: "chrisbourlier@hotmail.com",
          hashed_password: "$2b$10$tY1M/HeKgkq0ST8nnDfyp.noPA3.YF5J5ITxn0NOjvkPlMDIefRUS",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/Christian.jpg'
        },{
          id: 9,
          first_name: "Eric",
          last_name: "Budd",
          email_address: "ericbudd@gmail.com",
          hashed_password: "$2b$10$G7gkb9t2lNdODI/m5UjxDe3MKTSymnm5RIu9yBuQVM.S57npdxovW",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/eric.jpg'
        },{
          id: 10,
          first_name: "Zach",
          last_name: "Stevens",
          email_address: "zachstevens39@gmail.com",
          hashed_password: "$2b$10$oql58yKNg6gl5YkmbDMe7O7y2wpoL.GpbPRr6atY1jiMb6qMrTaFe",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/zach.jpg'
        },{
          id: 11,
          first_name: "Michael",
          last_name: "Shields",
          email_address: "thedevhut@gmail.com",
          hashed_password: "$2b$10$RsM/zo5RyyNL0EGSB4O9U.fN1Nqej77Luy0Pr6ZNzEELFsFKe/Lxi",
          image_url: 'https://g81-wardogs.herokuapp.com/assets/michael.jpg'
        }
        ])
          .then(() => {
              return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
            })
          ])
        })
    }
