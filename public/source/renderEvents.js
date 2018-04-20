$(document).ready(function() {

  $.ajax({
    url: '/events',
    type: 'GET',
    success: (data) => {
      // UPDATE DOM!

      for (var i = 0; i < data.length; i++) {
        $('#events').append(`
          <div class="col-md-4 card bg-light text-black">
          <br>
            <img class="card-img" src=${data[i].image_url} alt="img">
            <div class="card-img-overlay">
            <br>
              <h5 class="titlerestrict">${data[i].title}</h5>
              <p class="card-text descrestrict">${data[i].description}</p>
              <p><a class="btn btn-secondary" href="/events/${data[i].id}" role="button">View details &raquo;</a></p>
          </div>
          <br>
          `)
      }
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log('OOPS:', errorThrown)
    }
  })

// if no registered user is logged in, the Host Event button will redirect to login
  $.ajax({
    url: '/navbar',
    type: 'GET',
    success: (data) => {
      if (data === 'login') {
        $('#hostEventButton').attr('href', '/login')
        $('#dash-link').attr('class', 'hidden')
      }
      else if (data === 'signout') {
        $('#hostEventButton').attr('href', '/host')
      }
    }
  })
})
