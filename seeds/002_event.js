exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('events').insert([{
              id: 1,
              owner_id: 7,
              title: "Hiking Mount Sanitas with rescue dogs",
              location: "Mount Sanitas",
              difficulty: '2',
              image_url: "https://g81-wardogs.herokuapp.com/assets/sanitas.jpg",
              start_date_time: '2018-04-21T09:00:00Z',
              duration_minutes: 60,
              description: "Come one, come all! Let’s hike Mt. Sanitas this Saturday morning. Bring water and snacks. We’ll bring the furry friends! Get ready to grab a leash and have your heart melted as you clamber up our rocky neighbor to the west. If you love the dogs too much to give them back, they are available for adoption!!"
            },
            {
              id: 2,
              owner_id: 5,
              title: "Walk with wolves!",
              location: "Nederland, CO",
              difficulty: '5',
              image_url: "https://g81-wardogs.herokuapp.com/assets/wolves.jpg",
              start_date_time: "2018-04-28T12:00:00Z",
              duration_minutes: 60,
              description: "Come meet the pack! The day will begin with a guided tour, where you will learn the story of each of our pack members, as well as a brief lesson on the history of the species. Afterwards, you'll have a chance enter some of the wolf habitats to interact one-on-one, where you may even get a kiss! Starting in June, our experiences will include a Sunset Hike and provide you with an unforgettable summer experience! These special hikes will be slightly longer than our traditional nature walk so you can fully witness the expansive beauty of the Arapaho National Forest as the sun settles behind its mountains at 'golden hour'. A truly breathtaking sight, a stunning final activity, and an exceptional photo opportunity as you conclude your time connecting with the pack! We look forward to having you join us for this once-in-a-lifetime experience!"
            },
            {
              id: 3,
              owner_id: 8,
              title: "Hang Gliding",
              location: "Flatirons",
              difficulty: '3',
              image_url: "https://g81-wardogs.herokuapp.com/assets/hangGliding.jpg",
              start_date_time: "2018-04-22T12:00:00Z",
              duration_minutes: 60,
              description: "Take a tandem flight with an accredited instructor in a hang glider built for two. I'll handle the takeoff and landing, and you'll get to enjoy the amazing experience of soaring in a hang glider on a 20- to 50-minute flight. I’ll point out landmarks from above and explain how to maneuver the glider. If you’re up for it—and conditions allow—you may even get to take the controls for a bit."
            },
            {
              id: 4,
              owner_id: 7,
              title: "Earth Treks Monday night",
              location: "Golden, CO",
              difficulty: '2',
              image_url: "https://g81-wardogs.herokuapp.com/assets/earthTreks.jpg",
              start_date_time: "2018-04-23T18:30:00Z",
              duration_minutes: 60,
              description: "Let's meetup and climb at Earth Treks. Meet at the tables in the back by the bouldering area at 6:30pm. We'll pair or triple off and get some climbing in! P.S. Beginners and advanced climbers are always welcome. We typically have a mixed group of top rope and lead climbers of abilities from 5.6 to 5.12. If it is your first time to Earth Treks, show up a bit early to fill out the waiver and take the top rope belay test. You can still climb even if you don't know how to belay, so don't hesitate to join!"
            },
            {
              id: 5,
              owner_id: 2,
              title: "Bicycling Boulder with Eric",
              location: "Boulder, CO",
              difficulty: '3',
              image_url: "https://g81-wardogs.herokuapp.com/assets/bicycling.jpg",
              start_date_time: "2018-04-26T12:00:00Z",
              duration_minutes: 120,
              description: "Peddle yourself around town with Boulder's go to connoiseur of the outdoors! Become immersed in the spectacular nature surrounding the city, have didactic and thought-provoking conversations on a range of topics covering society, exercise science, computers, politics, and much, much more."
            },
            {
              id: 6,
              owner_id: 6,
              title: "Camp Cooking with Gordon",
              location: "Golden, CO",
              difficulty: '5',
              image_url: "https://g81-wardogs.herokuapp.com/assets/masterchef.jpg",
              start_date_time: "2018-04-28T18:30:00Z",
              duration_minutes: 120,
              description: "Come find out how bad of a cook you are and how terrible your dishes taste while being berated by the 20 Michelin Starred chef of your dreams / daymares! Begin by asking Alexa 'how does my beouf bourguinon taste?' to get a feel for the fun that will be had at this tasty event. If you are up to snuff on your kitchen skills, you might actually receive a heartwarming compliment that will really just make your day!"
            }
          ])
        .then(() => {
          return knex.raw(`SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));`)
        })
      ])
    })
}
