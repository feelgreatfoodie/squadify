$(document).ready(function() {
  'use strict';

  function displaySnackbar(message) {
    // Get the snackbar DIV
    console.log("run snackbar");
    console.log(message);
    var x = document.getElementById("snackbar");

    x.innerText = message
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }


  // eslint-disable-next-line max-statements
  $('#joinButton').click((event) => {
    event.preventDefault();
    let eventUser = {}

    if (!window.document.cookie) {
      window.location.href = "/login"
      return
    }

    const eventId = window.location.pathname.match(/[0-9]+/)[0]
    const userToken = window.document.cookie.slice(6)

    eventUser = {
      "eventId": eventId,
      "userToken": userToken,
    }
    const options = {
      contentType: 'application/json',
      data: JSON.stringify(eventUser),
      dataType: 'json',
      type: 'POST',
      url: `/events/${eventId}`
    }

    $.ajax(options)
      .done(function(registered) {
        if (registered === true) {
          $('#joinButton').text("Join Event")
          $('#joinButton').addClass('btn-success')
          $('#joinButton').removeClass('btn-danger')
          displaySnackbar("You are no longer attending.")
        } else {
          $('#joinButton').text("Leave Event")
          $('#joinButton').addClass('btn-danger')
          $('#joinButton').removeClass('btn-success')
          displaySnackbar("See you there!")
        }

      })
      .fail(($xhr) => {
        $('#joinButton').innerText = "Join Event"
        alert($xhr.responseText)
      })
  })
})
