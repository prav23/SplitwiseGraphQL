import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {

  //handle logout to destroy the cookie
  handleLogout = () => {
    window.localStorage.clear();
  };
  render() {
    
    let isAuthenticated = false;
    if (localStorage.getItem("token")) {
      console.log("I am in Navbar. I have a JWT Token.");
      isAuthenticated = true;
      var id;
      if (localStorage.getItem("user_id")) {
          console.log('Local Storage Value of User: ',localStorage.getItem("user_id"));
          id  = localStorage.getItem("user_id");
      }
    }  
    
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Splitwise
          </Link>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav w-100 d-flex justify-content-end">
                
                {!isAuthenticated && <li class="nav-item">
                  <Link class="nav-link" to="/register">
                    Register
                  </Link>
                </li> }
                {!isAuthenticated && <li class="nav-item">
                  <Link class="nav-link" to="/login">
                    Login
                  </Link>
                </li> }
              
              {
                isAuthenticated && <li class="nav-item">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    user
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link class="nav-link" to="/" onClick = {this.handleLogout}>
                        Logout
                      </Link></li>
                      {/* {!isProfile && <li><Link class="nav-link" to="/createprofile">
                        Create Profile
                      </Link></li>}
                      {isProfile && <li><Link class="nav-link" to="/editprofile">
                        Edit Profile
                      </Link></li>}
                      <li><Link class="nav-link" to="/creategroup">
                        Create Group
                      </Link></li> */}
                      {/* <li><Link class="nav-link" to="/groupActivity">
                        Group
                      </Link></li> */}
                    </ul>
                  </div>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
