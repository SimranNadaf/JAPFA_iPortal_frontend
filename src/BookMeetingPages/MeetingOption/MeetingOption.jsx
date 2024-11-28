import React from "react";
import "./MeetingOption.css";
import NavBar from "../../components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import TitleCard from "../../components/titleCard/TitleCard";
function MeetingOption() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      navigate("/meeting/options");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const handleCreateMeetClick=()=>{
    navigate("/meeting/create");
  }

  const handleStatusMeetClick=()=>{
    navigate("/meeting/status", { state: { userDetails } });
  }
  return (
    <>
      <NavBar userDetails={userDetails} />
      <div className="meeting-options-container">
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
        <div className="meet-right">

          <TitleCard
            title="create"
            image="../src/assets/tile-icons/request.png"
            handleClick={handleCreateMeetClick}
          />

          <TitleCard
            title="status"
            image="../src/assets/tile-icons/meeting.png"
            handleClick={handleStatusMeetClick}
          />

        </div>
      </div>
    </>
  );
}

export default MeetingOption;
