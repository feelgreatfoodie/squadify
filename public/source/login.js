$(document).ready(function() {
  'use strict';

  console.log("load login");

  // eslint-disable-next-line max-statements
  $('#login').submit((event) => {
    event.preventDefault();
    console.log('login submit event', event);
    var user = {}

    const email = $('#inputEmailL').val().trim();
    const password = $('#inputPasswordL').val();

    // if (!firstName) {
    //   return alert('First name must not be blank');
    // }
    //
    // if (!lastName) {
    //   return alert('Last name must not be blank');
    // }

    if (!email) {
      return alert('Email must not be blank');
    }

    if (email.indexOf('@') < 0) {
      return alert('Email must be valid');
    }

    user = {
      "email_address": email,
      "password": password
    }
    console.log('user=', user);

    const options = {
      contentType: 'application/json',
      data: JSON.stringify(user),
      dataType: 'json',
      type: 'POST',
      url: '/login'
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