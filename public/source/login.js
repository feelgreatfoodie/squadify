$(document).ready(function() {
  'use strict';

  // eslint-disable-next-line max-statements
  $('#login').submit((event) => {
    event.preventDefault();

    const email = $('#inputEmailL').val().trim();
    const password = $('#inputPasswordL').val();

    if (!email) {
      return alert('Email must not be blank');
    }

    if (email.indexOf('@') < 0) {
      return alert('Email must be valid');
    }

    const user = {
      "email_address": email,
      "password": password
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify(user),
      dataType: 'json',
      type: 'POST',
      url: '/login'
    }

    $.ajax(options)
      .done(function() {
        window.location.href="/"
      })
      .fail(($xhr) => {
        alert($xhr.responseText)
      })
  })
})
