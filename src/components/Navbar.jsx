import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import lightLogo from "../img/buswale_logo.png";


const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="custom-navbar">
      <div className='logodiv'>
        <Link to="/">
          <img src={lightLogo} alt="Buswale Logo" className='logo' />
        </Link>
        <div className='navlink'>
          <ul>
            <li className='my_booking'><Link to="/my-bookings">My Booking</Link></li>
            {user ? (
              <li className="user-profile-item">
                <span className="user-profile-name">
                  👤 {user.name}
                </span>
                <Button
                  variant="danger"
                  className="logout-btn"
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("user");
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              </li>
            ) : (
              <li>
                <Button
                  className='login-btn'
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
