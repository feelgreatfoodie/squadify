(function() {
  'use strict';

  $('.button-collapse').sideNav();



  // eslint-disable-next-line max-statements
  $('#signUpForm').submit((event) => {
    event.preventDefault();
    var user = {}

    const firstName = $('#firstName').val().trim();
    const lastName = $('#lastName').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();

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

    if (!password || password.length < 8) {
      return alert(
        'Password must be at least 8 characters long'
      );
    }

    bcrypt.hash(password, 10).then(function(hash) {
      // Store hash in your password DB.
      console.log(hash);

      user = {
        "first_name": firstName,
        "last_name": lastName,
        "email_address": email,
        "hashed_password": hash
      }
      postRequest(user)
    });




    function postRequest(user) {
      const options = {
        contentType: 'application/json',
        data: JSON.stringify(user),
        dataType: 'json',
        type: 'POST',
        url: '/users'
      };

      $.ajax(options)
        .done(() => {
          //window.location.href = '/favorites.html';
        })
        .fail(($xhr) => {
          alert(
            'Something broke', $xhr.responseText
          );
        });
    }
  });
})();