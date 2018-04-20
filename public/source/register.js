$(document).ready(function() {
  'use strict';

  // eslint-disable-next-line max-statements
  $('#register').submit((event) => {
    event.preventDefault();
    var user = {}

    const firstName = $('#inputFirstName').val().trim()
    const lastName = $('#inputLastName').val().trim()
    const email = $('#inputEmail').val().trim()
    const password = $('#inputPassword').val()
    const image_url = $('#inputImageUrl').val().trim()
    const about_user = $('#inputAbout').val().trim()

    user = {
      "first_name": firstName,
      "last_name": lastName,
      "email_address": email,
      "password": password,
      "image_url": image_url,
      "about_user": about_user
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
        // alert($xhr.responseText)
      })
  })
})
