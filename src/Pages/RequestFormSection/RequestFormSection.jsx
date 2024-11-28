import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import TitleCard from "../../components/titleCard/TitleCard";
import "./RequestFormSection.css";

function RequestFormSection() {
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

  const handleRequestFormClick = () => {
    navigate("/request-form/options/create");
  };


  const handlePendingClick=()=>{
    navigate("/request-form/option/pending");
  }
  const handleCompleteClick=()=>{
    navigate("/request-form/option/complete");
  }

  return (
    <div>
      <NavBar userDetails={userDetails} />
      <div className="request-form-container">
        <div className="left-navbar">
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
        <div className="right-content">
          <div className="inside-container">
            <TitleCard
              title="Create"
              image="../src/assets/tile-icons/create.png"
              handleClick={handleRequestFormClick}
            />
            <TitleCard
              title="Pending"
              image="../src/assets/tile-icons/pending.png"
              handleClick={handlePendingClick}
            />
            <TitleCard
              title="Completed"
              image="../src/assets/tile-icons/completed.png"
              handleClick={handleCompleteClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestFormSection;
