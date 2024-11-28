import React from "react";
import "./TitleCard.css";
function TitleCard(props) {
  const handleClick = () => {
    if (props.handleClick) {
      props.handleClick();
    }
  };
  return (
    <div
      className="card-container"
      onClick={props.handleClick}
    >
      <img src={props.image} alt="" />
      <p className="tiles-title">{props.title}</p>
    </div>
  );
}

export default TitleCard;
