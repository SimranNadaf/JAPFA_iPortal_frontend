import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import "./MeetingStatus.css";

function MeetingStatus() {
  const [meetings, setMeetings] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    const storedToken = localStorage.getItem("authToken");
    if (storedUserDetails && storedToken) {
      setUserDetails(JSON.parse(storedUserDetails));
      setToken(storedToken);
    } else {
      // Handle user not logged in
      console.log("User not logged in");
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get("http://192.168.137.1:8080/api/conference-rooms/details", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("status", response.data);
          setMeetings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching meetings:", error);
        });
    }
  }, [token]);

  const handleDeleteClick = (meeting) => {
    setMeetingToDelete(meeting);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://192.168.137.1:8080/api/conference-rooms/delete/${meetingToDelete.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMeetings(meetings.filter((meeting) => meeting.id !== meetingToDelete.id));
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error deleting meeting:", error);
        setShowModal(false);
      });
  };

  return (
    <>
      <NavBar userDetails={userDetails} />
      <div className="meeting-status-custom-container">
        <h2>Meeting Status</h2>
        {meetings.length > 0 ? (
          <table className="meeting-status-custom-table">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Person Who Booked</th>
                <th>Email</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Room Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting, index) => (
                <tr key={meeting.id}>
                  <td>{index + 1}</td>
                  <td>{meeting.username}</td>
                  <td>{meeting.email}</td>
                  <td>{meeting.start_time}</td>
                  <td>{meeting.end_time}</td>
                  <td>{meeting.created_date}</td>
                  <td>{meeting.conference_room}</td>
                  <td>
                    {userDetails.email === meeting.email ? (
                      <button onClick={() => handleDeleteClick(meeting)}>Delete</button>
                    ) : (
                      <span>✔</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No meetings scheduled.</p>
        )}
      </div>
      {showModal && (
        <div className="meeting-status-custom-modal">
          <div className="meeting-status-custom-modal-content">
            <h4>Are you sure you want to delete this meeting?</h4>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MeetingStatus;
