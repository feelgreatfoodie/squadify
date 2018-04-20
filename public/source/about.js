$(document).ready(function() {
  //$('#btn-go').click((event) => {
  $.ajax({
    url: '/about/us',
    type: 'GET',
    success: (data) => {
      // UPDATE DOM!
      for (let i = 0; i < data.length; i++) {
        $('#team').append(`
          <div class="card mx-auto col-lg-3" style="width: 18rem;">
            <img class="card-img-top team-img" src=${data[i].user_image_url} alt="Card image cap">
            <div class="card-body">
            <h5 class="titlerestrict">${data[i].first_name} ${data[i].last_name}</h5>
            <p class="card-text descrestrict aboutEmail">${data[i].email_address}</p>
            </div>
          </div>
          `)
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
    }
    else if (data === 'signout') {
      $('#hostEventButton').attr('href', '/host')
    }
  }
})

})
