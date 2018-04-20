$(document).ready(function() {

  const pathing = window.location.pathname
  const eventId = window.location.pathname.match(/[0-9]+/)[0]

  $.ajax({
    url: `/events/data/${eventId}`,
    type: 'GET',
    success: (data) => {
      let fullName = `${data.first_name} ${data.last_name}`

      let eventDate = new Date(data.start_date_time).toDateString()
      let eventTime = data.start_date_time.slice(11, 16)
      $('#event-image').attr(`src`, `${data.image_url}`)
      $('#event-image').attr(`class`, `mx-auto`)
      $('#event-title').append(`<div>${data.title}</div>`)
      $('#event-description').append(`<div>${data.description}</div>`)
      $('#event-host').append(`<div>${fullName}</div>`)
      $('#event-location').append(`<div>${data.location}</div>`)
      $('#event-date').append(`<div>${eventDate}</div>`)
      $('#event-time').append(`<div>${eventTime}</div>`)
      $('#event-duration').append(`<div>${data.duration_minutes}</div>`)
      $('#event-difficulty').append(`<div>${data.difficulty}</div>`)

    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log('OOPS:', errorThrown)
    }
  })

  $.ajax({
    url: '/navbar',
    type: 'GET',
    success: (data) => {
      if (data === 'login') {
        $('#hostEventButton').attr('href', '/login')
        $('#dash-link').attr('class', 'hidden')
      } else if (data === 'signout') {
        $('#hostEventButton').attr('href', '/host')
      }
    }
  })

})
