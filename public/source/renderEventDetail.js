$(document).ready(function() {

  const pathing = window.location.pathname
  const eventId = window.location.pathname.match(/[0-9]+/)[0]

  $.ajax({
    url: `/events/data/${eventId}`,
    type: 'GET',
    success: (data) => {

      console.log(data);

      let fullName = `${data.first_name} ${data.last_name}`

      let eventDate = new Date(data.start_date_time).toDateString()
      $('#event-image').attr(`src`, `${data.image_url}`)
      $('#event-title').append(`<div>${data.title}</div>`)
      $('#event-description').append(`<div>${data.description}</div>`)
      $('#event-host').append(`<div>${fullName}</div>`)
      $('#event-location').append(`<div>${data.location}</div>`)
      $('#event-date').append(`<div>${eventDate}</div>`)
      $('#event-duration').append(`<div>${data.duration_minutes}</div>`)
      $('#event-difficulty').append(`<div>${data.difficulty}</div>`)

    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log('OOPS:', errorThrown)
    }
  })
})