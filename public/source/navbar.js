$(document).ready(function () {
  const pathUrl = window.location.pathname
  $.ajax({
    url: '/navbar',
    type: 'GET',
    success: (data) => {
      // UPDATE DOM!

      let inOrOut = data
      let loginOrSignoutText = data
      let loginLink = '/login'
      let dashText = 'Dashboard'
      let dashLink = '/dashboard'

      if (inOrOut === 'login') {
        loginOrSignoutText = 'Log in / Register'
        loginLink = '/login'
      }
      else if (inOrOut === 'signout') {
        loginOrSignoutText = 'Sign out'
        loginLink = '/signout'
      }
      // if 'Home' button should appear:
      if ((pathUrl === '/login') || (pathUrl === '/host')) {
        loginOrSignoutText = 'Home'
        loginLink = '/'
      }
      if (pathUrl === '/dashboard') {
        dashText = 'Home'
        dashLink = '/'
      }
      $('#pagenavbar').append(`
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">WarDogs</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="${loginLink}">${loginOrSignoutText}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${dashLink}">${dashText}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Enter your location to find an adventure...">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>

        </div>
      </nav>
      `)
    },
    error(jqXhr, textStatus, errorThrown) {
      console.log('OOPS:', errorThrown)
    }
  })
})
