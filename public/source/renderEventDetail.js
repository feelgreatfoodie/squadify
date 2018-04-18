$(document).ready(function() {
  console.log('running renderEventDetail')
  const pathing = window.location.pathname
  const eventId = window.location.pathname.match(/[0-9]+/)[0]
  console.log(pathing)
  console.log(eventId)
  $.ajax({
    url: `/events/data/${eventId}`,
    type: 'GET',
    success: (data) => {
      console.log(data)
      // UPDATE DOM!

      let eventDate = new Date(data.start_date_time).toDateString()
      $('#event-image').append(`<img src=${data.image_url}>`)
      $('#event-title').append(`<div>${data.title}</div>`)
      $('#event-description').append(`<div>${data.description}</div>`)
      $('#event-location').append(`<div>${data.location}</div>`)
      $('#event-date').append(`<div>${eventDate}</div>`)
      $('#event-duration').append(`<div>${data.duration_minutes}</div>`)
      // TODO: add 'difficulty' as a value in event database
      console.log("TOP SECRET: 'difficulty' is actually just the owner_id, which is:", data.owner_id)
      $('#event-difficulty').append(`<div>${data.owner_id}</div>`)

      // $('#event-detail').append(`
      //   <div class="col-md-4">
      //     <h2>${data.title}</h2>
      //     <p>Location: ${data.location}</p>
      //     <p>Start time: ${data.start_date_time}</p>
      //     <p>${data.description}</p>
      //     <p><a id="join-button" class="btn btn-secondary" href="" role="button">Join event &raquo;</a></p>
      //   </div>
      // `)

      // for (var i = 0; i < data.length; i++) {
      //   $('#event-detail').append(`
      //     <div class="col-md-4">
      //       <h2 class="titlerestrict">${data[i].title}</h2>
      //       <p class="descrestrict">${data[i].description}</p>
      //       <p><a class="btn btn-secondary" href="/events/${data[i].id}" role="button">View details &raquo;</a></p>
      //     </div>
      //     `)
      // }

      // $('.del').click(deleteHandler)

    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log('OOPS:', errorThrown)
    }
  })
})
//})
//
// function deleteHandler(event) {
//   var id = $(event.target).parent().attr('data-recordid')
//   console.log('id', id)
//
//   $.ajax({
//     url: `/minidiscs/${id}`,
//     type: 'DELETE',
//     success: (data) => {
//       console.log(data)
//     },
//     error: function(jqXhr, textStatus, errorThrown) {
//       console.log('OOPS:', errorThrown)
//     }
//   })
// }
