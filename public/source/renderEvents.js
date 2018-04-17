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
          <div class="col-md-4">
            <h2>${data[i].title}</h2>
            <p>${data[i].description}</p>
            <p><a class="btn btn-secondary" href="" role="button">View details &raquo;</a></p>
          </div>
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