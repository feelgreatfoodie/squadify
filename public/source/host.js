$(document).ready(function() {
  'use strict';

  // eslint-disable-next-line max-statements
  $('#host').submit((event) => {
    event.preventDefault()

    const newEvent = {
      'eventTitle': $('#eventTitle').val().trim(),
      'eventDescription': $('#eventDescription').val().trim(),
      'eventDateTime': $('#eventDateTime').val().trim(),
      'duration': $('#duration').val().trim(),
      'eventLocation': $('#eventLocation').val().trim(),
      'eventDifficulty': $('#eventDifficulty').val().trim(),
      'eventImage': $('#eventImage').val().trim()
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify(newEvent),
      dataType: 'json',
      type: 'POST',
      url: '/host'
    }

    $.ajax(options)
      .done(function() {
        window.location.href = "/"
      })
      .fail(($xhr) => {
        // alert($xhr.responseText)
      })
  })
})
