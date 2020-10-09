import React from 'react';
import { Link, useHistory } from 'react-router-dom'

export const Navigation = () => {

    const history = useHistory();
   
    const getUser = async () => {
        const userData = await fetch('http://localhost:8000/api/user/auth', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.usertoken}`
            }
        })
        const data = await userData.json();
        document.getElementById('navbarDropdown').innerHTML = data.user.username;
    }

    getUser();

    const LogOut = () => {
        localStorage.removeItem('usertoken');
        history.push('/');
    }

    return(
<nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          {
              localStorage.usertoken &&
              <button className="btn btn-primary text-primary" id="menu-toggle">Show / Hide Menu</button>
          }
          {
              !localStorage.usertoken &&
              <Link className="navbar-brand ml-5" to="/">MediApp</Link>
          }
         
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0 mr-5">
              {
                localStorage.usertoken &&
                <div>
                    <li className="nav-item dropdown">
                        <Link className="nav-link text-dark dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            loading...
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" id="navbarDropdown">
                            <Link className="dropdown-item"><i className="icon ion-md-person lead mr-2" /> My Profile</Link>
                        <div className="dropdown-divider" />
                            <button id="btnLogout" className="dropdown-item" style={{cursor: 'pointer'}} onClick={LogOut}><i className="icon ion-md-power lead mr-2" /> Logout</button>
                        </div>
                    </li>                    
                </div>
              }
              {
                !localStorage.usertoken &&
                <li className="nav-item active">
                    <Link className="nav-link text-dark" to="/login"><i className="icon ion-md-person mr-2" /> Sign In</Link>
                </li>                     
              }
            </ul>
          </div>
      </nav>
    )

}