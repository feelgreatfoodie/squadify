exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('events').insert([{
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
            }])
        .then(() => {
          return knex.raw(`SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));`)
        })
      ])
    })
}
