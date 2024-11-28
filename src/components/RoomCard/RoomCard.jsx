import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RoomCard.css";

function RoomCard({ name, location, handleCardClick }) {
  const [profileDetails, setProfileDetails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setProfileDetails(JSON.parse(storedUserDetails));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const localStoredLocation = profileDetails?.location;

  const isMatched = localStoredLocation &&
    localStoredLocation.toLowerCase() === location.toLowerCase();

  let imgSrc;
  if (isMatched) {
    imgSrc = "../src/assets/conf.jpg";
  } else {
    imgSrc = "../src/assets/conf-b.jpg";
  }

  const textColor = isMatched ? "matched-text" : "";

  return (
    <div
      className="room-card-container"
      onClick={() => handleCardClick(localStoredLocation, location)}
    >
      <p className={`r-status ${isMatched ? "available" : "not-available"}`}>
        {isMatched ? "Available" : "Not Available"}
      </p>
      <div className="room-img">
        <img src={imgSrc} alt="" />
      </div>
      <div className="room-content">
        <p className={textColor}>{name}</p>
      </div>
    </div>
  );
}

export default RoomCard;
