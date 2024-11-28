import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./NavBar.css";

function NavBar({ userDetails }) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfileClick = () => {
    navigate("/profile", { state: { userDetails } });
  };

  return (
    <div className="nav-container">
      <div className="logo">
        <img src="../src/assets/paper.jpg" alt="" />
      </div>
      <div className="nav-links">
        <ul>
          <li>
            <NavLink to="/home" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleProfileClick}
              to="/profile"
              activeClassName="active"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="user-details">
        <img src="../src/assets/profile.jpg" alt="" />
        <p>{userDetails?.username}</p>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>

      {menuOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <NavLink to="/home" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" activeClassName="active">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
