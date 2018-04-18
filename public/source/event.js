$(document).ready(function() {
  'use strict';




  // eslint-disable-next-line max-statements
  $('#joinButton').click((event) => {
    event.preventDefault();
    console.log('register submit event', event);
    var eventUser = {}


    const eventId = window.location.pathname.match(/[0-9]+/)[0]
    const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTUyNDAwNDM0M30.Tfj_J1i792CEbwu2ofmRC3wx9ltsZ-Dpb-AZeoyCmyQ"

    console.log('eventId=', eventId);

    eventUser = {
      "eventId": eventId,
      "userToken": userToken,
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