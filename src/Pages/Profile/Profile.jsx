import React, { useState, useEffect } from "react";
import "./Profile.css";
import NavBar from "../../components/NavBar/NavBar";
import { NavLink, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState();
  
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setProfileDetails(JSON.parse(storedUserDetails));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  return (
    <div>
      <NavBar userDetails={profileDetails} />

      <div className="profile-container">
        <div className="profile-left-navbar">
          <ul>
            <li>
              <NavLink to="/home" activeClassName="active" exact>
                Book Meeting
              </NavLink>
            </li>

            <li>
              <NavLink to="/visit/options" activeClassName="active" exact>
                Manage Visitors
              </NavLink>
            </li>

            <li>
              <NavLink to="/" activeClassName="active" exact>
                Policies
              </NavLink>
            </li>
            <li>
              <NavLink to="/" activeClassName="active" exact>
                Approvals
              </NavLink>
            </li>
            <li>
              <NavLink to="/" activeClassName="active" exact>
                Japfa Bytes
              </NavLink>
            </li>

            <button onClick={handleLogout} activeClassName="active" exact>
              logout
            </button>
          </ul>
        </div>
        <div className="profile-right-content">
          <div className="profile-box">
            <div className="image-for-profile">
              <img src="../src/assets/profile.jpg" alt="" />
            </div>
            <div className="profile-title-box">
              <p>My Profile</p>
            </div>
            <div className="profile-details">
              <p className="username">{profileDetails?.username}</p>
              <p>Location: <span>{profileDetails?.location}</span></p>
              <p>Department: <span>{profileDetails?.department}</span> </p>
              <p>Department Head: <span>{profileDetails?.departmentHeadName}</span> </p>
              <p className="email">{profileDetails?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
