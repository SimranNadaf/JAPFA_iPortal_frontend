import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import TitleCard from "../../components/titleCard/TitleCard";

function Home() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const handleRequestFormClick = () => {
    navigate("/request-form/options");
  };
  const handleBookMeetingClick = () => {
    navigate("/meeting/options",);
  };
  const handleVisitorClick = () => {
    navigate("/visit/options",);
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
        <div className="running-text-container">
            <div className="running-text">This is a running text line on top of the carousel</div>
          </div>
          <div className="inside-container">
            <TitleCard
              title="Request Form"
              image="../src/assets/tile-icons/request.png"
              handleClick={handleRequestFormClick}
            />
            <TitleCard
              title="Book Meeting"
              image="../src/assets/tile-icons/meeting.png"
              handleClick={handleBookMeetingClick}
            />
            <TitleCard
              title="Manage Visitors"
              image="../src/assets/tile-icons/visitor.png"
              handleClick={handleVisitorClick}
            />
            <TitleCard
              title="Policies"
              image="../src/assets/tile-icons/policies.png"
            />
            <TitleCard
              title="Approvals"
              image="../src/assets/tile-icons/approval.png"
            />
            <TitleCard
              title="Japfa Bytes"
              image="../src/assets/tile-icons/bytes.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
