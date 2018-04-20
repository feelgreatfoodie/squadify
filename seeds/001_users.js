exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      return Promise.all([
            // Inserts seed entries
        knex('users').insert([{
          id: 1,
          first_name: "Christian",
          last_name: "Bourlier",
          email_address: "christianbourlier@gmail.com",
          hashed_password: "$2b$10$tY1M/HeKgkq0ST8nnDfyp.noPA3.YF5J5ITxn0NOjvkPlMDIefRUS",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/christian1.jpg',
          about_user: "Full-Stack Software Engineer, Entrepreneur, and professional poker player with 20 years of relationship based sales/management experience. Passion to build teams, create leaders, and strengthen every collaboration.",
          github:"https://github.com/feelgreatfoodie",
          linkedIn: "https://www.linkedin.com/in/christianbourlier/"
        },{
          id: 2,
          first_name: "Eric",
          last_name: "Budd",
          email_address: "ericbudd@gmail.com",
          hashed_password: "$2b$10$G7gkb9t2lNdODI/m5UjxDe3MKTSymnm5RIu9yBuQVM.S57npdxovW",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/eric.jpg',
          about_user: "Dynamic, analytical full-stack web developer with experience in product and technical customer management. Strong organizational, speaking and problem-solving skills; a leader who works toward consensus and practical solutions.",
          github: "https://github.com/ericmbudd/",
          linkedIn: "http://linkedin.com/in/ericmbudd/"
        },{
          id: 3,
          first_name: "Zach",
          last_name: "Stevens",
          email_address: "zachstevens39@gmail.com",
          hashed_password: "$2b$10$oql58yKNg6gl5YkmbDMe7O7y2wpoL.GpbPRr6atY1jiMb6qMrTaFe",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/zach.jpg',
          about_user: "Full stack web developer with experience in gamifying the problem solving process and seeking inventive solutions.",
          github: "https://www.github.com/q3104558",
          linkedIn: "https://www.linkedin.com/in/zach-stevens/"
        },{
          id: 4,
          first_name: "Michael",
          last_name: "Shields",
          email_address: "thedevhut@gmail.com",
          hashed_password: "$2b$10$RsM/zo5RyyNL0EGSB4O9U.fN1Nqej77Luy0Pr6ZNzEELFsFKe/Lxi",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/michael.jpg',
          about_user: "Full stack web developer with experience in financial analytics and operations.",
          github: "http://github.com/shieldsy123",
          linkedIn: "http://linkedin.com/in/mtshields"
        },{
          id: 5,
          first_name: "Edmond",
          last_name: "Dantes",
          email_address: "edmonddantes@mercedes.com",
          hashed_password: "$2a$10$y2pXTMDpQiZter2isn9t9eJYZYpUOfrldEh5xSt06.wWLpi.zvC52",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/edmond.jpg',
          about_user: "I love being out in open spaces. I am particularly adept at spelunking, swimming, and my impersonations of the recently deceased are not to be missed."
        }, {
          id: 6,
          first_name: "Gordon",
          last_name: "Ramsay",
          email_address: "gordon@ramsay.com",
          hashed_password: "$2b$10$EcWNikpBPnj.JDup2RKFZe3v26Qa3qX/RVqcvEpWPc0D8i5J6DWBu",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/gordon.jpg',
          about_user: "I'm here to tell you how dreadfully awful your cooking is."
        }, {
          id: 7,
          first_name: "Steve",
          last_name: "Rogers",
          email_address: "thecaptain@mcuhq.com",
          hashed_password: "$2a$10$jsitaILM0OI15oPGEXoxO.sFZ1d/xEEf70iFAq3PqL/vZ2Mfyj5QS",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/steve.jpg',
          about_user: "Besides being an adventure and outdoors lover, I occasionally help save the world from imminent peril. My friends think I'm a bit old-school, but what can I say? They just don't make things like they used to."
        }, {
          id: 8,
          first_name: "Natalia",
          last_name: "Romanova",
          email_address: "blackwidow@mcuhq.com",
          hashed_password: "$2a$10$U2.ZXLrRS7gqnK5nRmKdjuaHmBsRrsCGKL4s6x0e7lJb2lQQMJA4e",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/natalia.jpg',
          about_user: "I get to my happy place by being outdoors with friends and by beating the crap out of bad guys!"
        }, {
          id: 9,
          first_name: "Mercedes",
          last_name: "Iguanada",
          email_address: "mercedes@mercedes.com",
          hashed_password: "$2a$10$FRzKvSWMdPaVhEfztI3ewevYXrYUMzt1uNXUQTIlx6HTIU7BvJ3by",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/mercedes.jpg',
        }, {
          id: 10,
          first_name: "Daisy",
          last_name: "Buchanan",
          email_address: "gildedlady@limansions.com",
          hashed_password: "$2a$10$EtGSen95xoyEahquwSUZzOFg.anEj5rPKpj5afi.Y.ysq8dFFlf.a",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/daisy.jpg',
          about_user: "I enjoy drinks, revelry, drama, and love triangles."
        }, {
          id: 11,
          first_name: "Nick",
          last_name: "Carraway",
          email_address: "theobserver@limansions.com",
          hashed_password: "$2a$10$QtTqzI6mr381hMpEs10S/OuL74kMoNg49U7O1OxtgajFtkJaOi4t.",
          user_image_url: 'https://g81-wardogs.herokuapp.com/assets/nick.jpg'
        }
        ])
          .then(() => {
              return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
            })
          ])
        })
    }
