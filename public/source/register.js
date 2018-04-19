$(document).ready(function() {
  'use strict';

  // eslint-disable-next-line max-statements
  $('#register').submit((event) => {
    event.preventDefault();
    var user = {}

    const firstName = $('#inputFirstName').val().trim();
    const lastName = $('#inputLastName').val().trim();
    const email = $('#inputEmail').val().trim();
    const password = $('#inputPassword').val();

    if (!firstName) {
      return alert('First name must not be blank')
    }

    if (!lastName) {
      return alert('Last name must not be blank')
    }

    if (!email) {
      return alert('Email must not be blank')
    }

    if (email.indexOf('@') < 0) {
      return alert('Email must be valid')
    }

    if (!password || password.length < 8) {
      return alert(
        'Password must be at least 8 characters long'
      );
    }

    user = {
      "first_name": firstName,
      "last_name": lastName,
      "email_address": email,
      "password": password
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify(user),
      dataType: 'json',
      type: 'POST',
      url: '/users'
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
