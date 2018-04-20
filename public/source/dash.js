$(document).ready(function() {
  $.ajax({
    url: `/events/owner/`,
    type: 'GET',
    success: (data) => {
      for (var i = 0; i < data.length; i++) {
        $('#collapseHost').append(`<ul class="list-group event-detail pl-5">${data[i].title}</ul>`)
      }
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log('OOPS:', errorThrown)
    }
  })


  $.ajax({
    url: `/events/joined/`,
    type: 'GET',
    success: (data) => {
      for (var i = 0; i < data.length; i++) {
        $('#collapseJoined').append(`<ul class="list-group event-detail pl-5">${data[i].title}</ul>`)
      }
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