import React, { useState, useEffect } from "react";
import "./VisitorCreate.css";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function VisitorCreate() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [name, setName] = useState("");
  const [whomToMeet, setWhomToMeet] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [inTime, setInTime] = useState("");
  const [visitors, setVisitors] = useState([]);
  const [visitorLocation, setVisitorLocation] = useState("");
  const [purpose, setPurpose] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [outTime, setOutTime] = useState(""); 

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      navigate("/visit/create");
    }
  }, [navigate]);

  useEffect(() => {
    fetchVisitors();

    // Set default inTime to current local time
    const now = new Date();
    const localISOTime = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    setInTime(localISOTime);
  }, []);

  const fetchVisitors = () => {
    fetch("http://localhost:5000/api/visitors/all-today")
      .then((response) => response.json())
      .then((data) => {
        setVisitors(data);
      })
      .catch((error) => {
        console.error("Error fetching visitors:", error);
      });
  };

  const handleOutTimeChange = (visitorId) => (event) => {
    const { value } = event.target;
    setVisitors((prevVisitors) =>
      prevVisitors.map((visitor) =>
        visitor.id === visitorId ? { ...visitor, tempOutTime: value } : visitor
      )
    );
  };

  const handleOutTimeSubmit = (visitorId) => (event) => {
    event.preventDefault();

    const updatedVisitor = visitors.find((visitor) => visitor.id === visitorId);
    if (!updatedVisitor) {
      console.error("Visitor not found");
      return;
    }

    // Check if the user location matches the visitor's office location
    if (
      userDetails &&
      userDetails.location &&
      updatedVisitor.officeLocation &&
      userDetails.location.toLowerCase() !==
        updatedVisitor.officeLocation.toLowerCase()
    ) {
      alert("Location mismatch. Out entry not allowed.");
      return;
    }

    // Update the out time for the specific visitor
    fetch(`http://localhost:5000/api/visitors/${visitorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        outTime: new Date(updatedVisitor.tempOutTime).toISOString(),
        officeLocation: userDetails.location, // Send the current user's location
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Visitor updated successfully:", data);
        fetchVisitors(); // Re-fetch the list of visitors to ensure it is up-to-date
      })
      .catch((error) => {
        console.error("Error updating visitor:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newVisitor = {
      name,
      whomToMeet,
      phoneNumber,
      inTime: new Date(inTime).toISOString(),
      outTime: outTime ? new Date(outTime).toISOString() : null,
      visitorLocation,
      purpose,
      officeLocation: userDetails?.location,
    };

    fetch("http://localhost:5000/api/visitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVisitor),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchVisitors();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Reset form fields
    setName("");
    setWhomToMeet("");
    setPhoneNumber("");
    setInTime("");
    setOutTime("");
    setVisitorLocation("");
    setPurpose("");
  };

  // Filter visitors based on officeLocation and search term
  const filteredVisitors = visitors
    .filter((visitor) =>
      userDetails?.location
        ? visitor.officeLocation.toLowerCase() === userDetails.location.toLowerCase()
        : true
    )
    .filter((visitor) =>
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <NavBar userDetails={userDetails} />
      <div className="visitor-create-container">
        <div className="visit-c-left">
          <div className="v-details">
            <p>Visitor Details</p>
          </div>
          <div className="v-form">
            <form onSubmit={handleSubmit}>
              <div className="v-lable-name">
                <p>Visitor Name</p>
                <div className="v-input-group">
                  <input
                    type="text"
                    placeholder="Visitor name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="v-lable-name">
                <p>Whom to Meet ?</p>
                <div className="v-input-group">
                  <input
                    type="text"
                    placeholder="Whom to Meet ?"
                    value={whomToMeet}
                    onChange={(e) => setWhomToMeet(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="v-lable-name">
                <p>Phone number</p>
                <div className="v-input-group">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>

              <div className="v-lable-name">
                <p>Date and Time</p>
                <div className="v-input-group">
                  <input
                    type="datetime-local"
                    value={inTime}
                    onChange={(e) => setInTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="v-lable-name">
                <p>Location</p>
                <div className="v-input-group">
                  <input
                    type="text"
                    placeholder="Visitor location"
                    value={visitorLocation}
                    onChange={(e) => setVisitorLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="v-lable-name">
                <p>Purpose to Visit</p>
                <div className="v-input-group">
                  <input
                    type="text"
                    placeholder="Purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button className="v-submit-btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="visit-c-right">
          <div className="visit-search" id="v-input-group">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="visitor-table">
            <table>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Name</th>
                  <th>Whom to Meet</th>
                  <th>Phone Number</th>
                  <th>In Time</th>
                  <th>Out Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map((visitor, ind) => (
                  <tr key={visitor.id}>
                    <td>{ind + 1}</td>
                    <td>{visitor.name}</td>
                    <td>{visitor.whomToMeet}</td>
                    <td>{visitor.phoneNumber}</td>
                    <td>
                      {new Date(visitor.inTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      {visitor.outTime
                        ? new Date(visitor.outTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Pending"}
                    </td>
                    <td id="action-status">
                      {visitor.outTime ? (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{ color: "green", fontSize: "20px" }}
                        />
                      ) : (
                        <div className="out-time-container">
                          <input
                            type="datetime-local"
                            onChange={handleOutTimeChange(visitor.id)} // Handle outTime change
                            value={visitor.tempOutTime || ""}
                            required
                          />
                          <button onClick={handleOutTimeSubmit(visitor.id)}>
                            Out Time
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default VisitorCreate;
