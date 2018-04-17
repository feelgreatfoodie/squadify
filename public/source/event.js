$(document).ready(function() {
  'use strict';


  console.log("event id", eventId);

  // eslint-disable-next-line max-statements
  $('#joinButton').click((event) => {
    event.preventDefault();
    console.log('register submit event', event);
    var eventUser = {}

    const eventId = window.QUERY_PARAMETERS.id;
    const userId = 0

    eventUser = {
      "eventId": eventId,
      "userId": userId,
    }
    console.log('eventUser=', eventUser);

    const options = {
      contentType: 'application/json',
      data: JSON.stringify(eventUser),
      dataType: 'json',
      type: 'POST',
      url: `/events/${eventId}`
    };

    $.ajax(options)
      .done(() => {
        console.log("ajax done", user);
        //window.location.href = '/favorites.html';
      })
      .fail(($xhr) => {
        alert(
          'Something broke', $xhr.responseText
        );
      });
  });
});