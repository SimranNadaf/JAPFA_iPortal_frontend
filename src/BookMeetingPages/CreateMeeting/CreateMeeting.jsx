import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./CreateMeeting.css";
import RoomCard from "../../components/RoomCard/RoomCard";
import axios from "axios";

function CreateMeeting() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [room, setRoom] = useState("");
  const [location, setLocation] = useState("");
  const [occupiedSlotError, setOccupiedSlotError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [createdMeeting, setCreatedMeeting] = useState(null);
  const [token, setToken] = useState(null);
  const [occupiedTimes, setOccupiedTimes] = useState({});
  
  const rooms = [
    "Conference Room 1",
    "Conference Room 2",
    "Conference Room 3",
    "Conference Room 4",
    "Conference Room 5",
    "Conference Room 6",
    "Conference Room 7",
  ];

  useEffect(() => {
    axios
      .get("http://192.168.137.1:8080/api/conference-rooms/filtered-details", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response Data:", response.data);
        setOccupiedTimes(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    const storedToken = localStorage.getItem("authToken");
    if (storedUserDetails && storedToken) {
      setUserDetails(JSON.parse(storedUserDetails));
      setToken(storedToken);
    } else {
      navigate("/meeting/create");
    }
  }, [navigate]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setStartTime("");
    setEndTime("");
    setLocation("");
    setOccupiedSlotError(false);
    setTimeError(false);
  };

  const createMeeting = () => {
    if (!startTime || !endTime || !room || !location) {
      setTimeError(true);
      return;
    }

    if (
      isTimeOccupied(startTime, selectedDate) ||
      isTimeOccupied(endTime, selectedDate) ||
      isSlotAlreadyBooked(startTime, endTime, selectedDate, room)
    ) {
      setOccupiedSlotError(true);
    } else {
      const newMeeting = {
        username: userDetails.username,
        location,
        conferenceRoom: room,
        startTime,
        endTime,
        date: selectedDate,
        email: userDetails.email,
      };

      console.log("meeting data", newMeeting);
      axios
        .post(
          "http://192.168.137.1:8080/api/conference-rooms/create",
          newMeeting,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setCreatedMeeting(response.data);
          setSuccessModalOpen(true);
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            setOccupiedSlotError(true);
          }
        });
    }
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    setEndTime("");
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
  };

  const generateHalfHourIntervals = () => {
    const intervals = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourString = hour % 12 === 0 ? 12 : hour % 12;
        const minuteString = String(minute).padStart(2, "0");
        const ampm = hour < 12 ? "AM" : "PM";
        const time = `${String(hourString).padStart(
          2,
          "0"
        )}:${minuteString} ${ampm}`;
        intervals.push({
          time,
          disabled: isSlotBooked(time, selectedDate, room),
        });
      }
    }
    return intervals;
  };

  const isTimeOccupied = (time, date) => {
    if (!room || !occupiedTimes[room] || !occupiedTimes[room][date]) {
      return false;
    }
    return occupiedTimes[room][date].some(([start, end]) => {
      return isTimeInRange(time, start, end);
    });
  };

  const isTimeInRange = (time, start, end) => {
    const timeMinutes = parseTimeToMinutes(time);
    const startMinutes = parseTimeToMinutes(start);
    const endMinutes = parseTimeToMinutes(end);
    // console.log(`Checking if ${timeMinutes} is between ${startMinutes} and ${endMinutes}`);
    return timeMinutes >= startMinutes && timeMinutes < endMinutes;
  };

  const isSlotAlreadyBooked = (start, end, date, room) => {
    const startTimeMinutes = parseTimeToMinutes(start);
    const endTimeMinutes = parseTimeToMinutes(end);

    return bookedSlots.some((slot) => {
      if (slot.date !== date || slot.conferenceRoom !== room) {
        return false;
      }

      const slotStartMinutes = parseTimeToMinutes(slot.startTime);
      const slotEndMinutes = parseTimeToMinutes(slot.endTime);

      return (
        startTimeMinutes < slotEndMinutes && endTimeMinutes > slotStartMinutes
      );
    });
  };

  const parseTimeToMinutes = (time) => {
    const [hour, minutePart] = time.split(":");
    const [minute, ampm] = minutePart.split(" ");
    let hourNumber = parseInt(hour, 10);
    if (ampm === "PM" && hourNumber !== 12) {
      hourNumber += 12;
    } else if (ampm === "AM" && hourNumber === 12) {
      hourNumber = 0;
    }
    return hourNumber * 60 + parseInt(minute, 10);
  };

  const isSlotBooked = (time, date, room) => {
    return bookedSlots.some(
      (slot) =>
        slot.startTime <= time &&
        slot.endTime > time &&
        slot.date === date &&
        slot.conferenceRoom === room
    );
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const handleCardClick = (storedLocation, cardLocation, roomName) => {
    if (
      storedLocation &&
      storedLocation.toLowerCase() === cardLocation.toLowerCase()
    ) {
      setRoom(roomName); 
      setLocation(cardLocation);
      openModal();
    }
  };

  return (
    <>
      <NavBar userDetails={userDetails} />
      <div className="create-meeting-container">
        <div className="create-left">
          <h2>Select Date and Time</h2>
          <input
            type="date"
            value={selectedDate}
            className="date-input"
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button onClick={openModal}>Select Time</button>
        </div>

        <div className="create-right">
          <p>Available Rooms</p>
          <div className="card-data">
            <RoomCard
              name="Conference Room 1"
              location="pune"
              handleCardClick={(storedLocation, cardLocation) =>
                handleCardClick(
                  storedLocation,
                  cardLocation,
                  "Conference Room 1"
                )
              }
            />
            <RoomCard
              name="Conference Room 2"
              location="mumbai"
              handleCardClick={(storedLocation, cardLocation) =>
                handleCardClick(
                  storedLocation,
                  cardLocation,
                  "Conference Room 2"
                )
              }
            />
            <RoomCard
              name="Conference Room 3"
              location="hydrabad"
              handleCardClick={(storedLocation, cardLocation) =>
                handleCardClick(
                  storedLocation,
                  cardLocation,
                  "Conference Room 3"
                )
              }
            />
            <RoomCard
              name="Conference Room 4"
              location="kerala"
              handleCardClick={(storedLocation, cardLocation) =>
                handleCardClick(
                  storedLocation,
                  cardLocation,
                  "Conference Room 4"
                )
              }
            />
            <RoomCard
              name="Conference Room 5"
              location="Delhi"
              handleCardClick={(storedLocation, cardLocation) =>
                handleCardClick(
                  storedLocation,
                  cardLocation,
                  "Conference Room 5"
                )
              }
            />
            <RoomCard
              name="Conference Room 6"
              location="Nagpur"
              handleCardClick={(storedLocation, cardLocation) =>
                handleCardClick(
                  storedLocation,
                  cardLocation,
                  "Conference Room 6"
                )
              }
            />
            <RoomCard
              name="Conference Room 7"
              location="Kolkata"
              handleCardClick={(storedLocation, cardLocation) =>
                handleCardClick(
                  storedLocation,
                  cardLocation,
                  "Conference Room 7"
                )
              }
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="meeting-modal">
          <div className="meeting-modal-content">
            <h2>Select Start and End Time</h2>
            <div className="select-container">
              <label>Start Time: </label>
              <select
                className="select-container"
                value={startTime}
                onChange={handleStartTimeChange}
              >
                <option value="">Select start time</option>
                {generateHalfHourIntervals().map(({ time, disabled }) => (
                  <option key={time} value={time} disabled={disabled}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-container">
              <label>End Time: </label>
              <select
                className="select-container"
                value={endTime}
                onChange={handleEndTimeChange}
              >
                <option value="">Select end time</option>
                {generateHalfHourIntervals()
                  .filter(
                    ({ time, disabled }) =>
                      new Date(`2000-01-01 ${time}`) >
                        new Date(`2000-01-01 ${startTime}`) && !disabled
                  )
                  .map(({ time, disabled }) => (
                    <option key={time} value={time} disabled={disabled}>
                      {time}
                    </option>
                  ))}
              </select>
            </div>
            <div className="select-container">
              <label>Conference Room: </label>
              <select
                className="select-container"
                value={room}
                onChange={(e) => {
                  const selectedRoom = e.target.value;
                  setRoom(selectedRoom);
                  const selectedRoomLocation = rooms.find(
                    (r) => r === selectedRoom
                  ).location; 
                  setLocation(selectedRoomLocation);
                }}
                disabled={!!room}
              >
                <option value="">Select room</option>
                {rooms.map((roomOption) => (
                  <option key={roomOption} value={roomOption}>
                    {roomOption}
                  </option>
                ))}
              </select>
            </div>
            {timeError && (
              <p className="error-message">
                Please select start and end times.
              </p>
            )}
            <div className="button-container">
              <button className="reset-btn" onClick={resetForm}>
                Reset
              </button>
              <button className="create-btn" onClick={createMeeting}>
                Create
              </button>
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {occupiedSlotError && (
        <div className="popup">
          <div className="popup-content">
            <h3>Error: Slot already occupied!</h3>
            <button onClick={() => setOccupiedSlotError(false)}>OK</button>
          </div>
        </div>
      )}
      {successModalOpen && (
        <div className="success-modal">
          <div className="success-modal-content">
            <h3 style={{ color: "green" }}>Meeting Booked</h3>
            <img src="../src/assets/c.jpg" alt="" style={{ width: "70px" }} />
            <table className="popup-t">
              <tbody>
                <tr>
                  <th className="pop-t">Date:</th>
                  <td className="pop-t"> {createdMeeting.date}</td>
                </tr>
                <tr>
                  <th className="pop-t">Start Time:</th>
                  <td className="pop-t">{createdMeeting.startTime}</td>
                </tr>

                <tr>
                  <th className="pop-t">End Time:</th>
                  <td className="pop-t">{createdMeeting.endTime}</td>
                </tr>

                <tr>
                  <th className="pop-t">Room:</th>
                  <td className="pop-t">{createdMeeting.conferenceRoom}</td>
                </tr>
                <tr>
                  <th className="pop-t">Location:</th>
                  <td className="pop-t">{createdMeeting.location}</td>
                </tr>

                {/* <tr>
         
              <td colSpan={-1} style={{marginLeft:"20"}}>  <button onClick={closeSuccessModal}>Close</button></td>
             </tr>
                 */}
              </tbody>
            </table>

            <button
              style={{ width: "250px", height: "15", fontSize: "14px" }}
              onClick={closeSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateMeeting;
