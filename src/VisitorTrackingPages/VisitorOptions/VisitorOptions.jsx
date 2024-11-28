import React from "react";
import "./VisitorOptions.css";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import TitleCard from "../../components/titleCard/TitleCard";

function VisitorOptions() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const handleVisitorCreateClick = () => {
    navigate("/visit/create");
  };
  const handleVisitorRecordClick = () => {
    navigate("/visit/record");
  };

  return (
    <div>
      <NavBar userDetails={userDetails} />
      <div className="home-container">
        <div className="left-navbar">
          <ul>
            <li>
              <NavLink to="/meeting/options" activeClassName="active" exact>
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
        <div className="right-content">
          <div className="inside-container">
            <TitleCard
              title="Entry"
              image="../src/assets/tile-icons/create.png"
              handleClick={handleVisitorCreateClick}
            />
            <TitleCard
              title="Records"
              image="../src/assets/tile-icons/completed.png"
              handleClick={handleVisitorRecordClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorOptions;
