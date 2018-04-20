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
      let dashHidden = '"'
      let loginHidden = '"'

      if (inOrOut === 'login') {
        loginOrSignoutText = 'Log in / Register'
        loginLink = '/login'
      } else if (inOrOut === 'signout') {
        loginOrSignoutText = 'Sign out'
        loginLink = '/signout'
      }
      // if 'Home' button should appear:
      if ((pathUrl === '/login') || (pathUrl === '/host')) {
        loginOrSignoutText = 'Home'
        loginLink = '/'
        loginHidden = '" hidden'
      }
      if (pathUrl === '/dashboard') {
        dashText = 'Home'
        dashLink = '/'
        dashHidden = '" hidden'
      }
      $('#pagenavbar').append(`
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button id='navLogo' class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <img src="https://g81-wardogs.herokuapp.com/assets/mountain.svg" width="30" height="30" style='margin-right: .3em;'class="d-inline-block align-top" alt=""/>
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="height: .7em; width: .7em; display: inline; fill: currentcolor;"><path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fill-rule="evenodd"></path></svg>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item mx-auto">
              <a class="nav-link text-lg-right${dashHidden} id="dash-link" href="${dashLink}">${dashText}</a>
            </li>
            <li class="nav-item mx-auto">
              <a class="nav-link text-lg-right" href="/about">About</a>
            </li>
            <li class="nav-item mx-auto">
              <a class="nav-link text-lg-right${loginHidden} href="${loginLink}">${loginOrSignoutText}</a>
            </li>
          </ul>
          <!--<form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Enter your location to find an adventure...">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>-->

        </div>
      </nav>
      `)
    },
    error(jqXhr, textStatus, errorThrown) {
      console.log('OOPS:', errorThrown)
    }
  })
})
