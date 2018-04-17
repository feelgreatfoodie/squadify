$(document).ready(function() {
  console.log('running renderEventDetail')
  const pathing = window.location.pathname;
  console.log(pathing)
  $.ajax({
    url: pathing,
    type: 'GET',
    success: (data) => {
      console.log(data)
      // UPDATE DOM!

      $('#event-detail').append(`
        <div class="col-md-4">
          <h2>${data.title}</h2>
          <p>Location: ${data.location}</p>
          <p>Start time: ${data.start_date_time}</p>
          <p>${data.description}</p>
          <p><a id="join-button" class="btn btn-secondary" href="" role="button">Join event &raquo;</a></p>
        </div>
      `)

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
