$(document).ready(function() {
  //$('#btn-go').click((event) => {
  console.log('running renderEvents');
  $.ajax({
    url: '/events',
    type: 'GET',
    success: (data) => {
      console.log(data)
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

      //$('.del').click(deleteHandler)

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
