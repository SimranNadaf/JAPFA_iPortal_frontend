import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompletedReq.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faClock,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

function CompletedReq() {
  const [completedRequests, setCompletedRequests] = useState([]);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  console.log(completedRequests);

  useEffect(() => {
    const userToken = localStorage.getItem("authToken");
    if (userToken) {
      setToken(userToken);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchCompletedRequests() {
      if (!token) return;

      try {
        const response = await axios.get(
          "http://192.168.137.1:8080/api/requests/get/approved",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCompletedRequests(response.data);
        } else {
          console.error(
            "Failed to fetch completed requests:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching completed requests:", error);
      }
    }

    fetchCompletedRequests();
  }, [token]);

  const normalizeStatus = (status) => {
    if (status.startsWith("PENDING")) {
      return "PENDING";
    } else if (status.startsWith("APPROVED")) {
      return "APPROVED";
    } else if (status.startsWith("CANCELED")) {
      return "CANCELED";
    } else if (status.startsWith("COMMENTED")) {
      return "COMMENTED";
    }
    return status;
  };

  const handleView = (request) => {
    const normalizedStatus = normalizeStatus(request.status);
    const normalizedStatus1 = normalizeStatus(request.status1);
    const normalizedStatus2 = normalizeStatus(request.status2);

    navigate("/preview", {
      state: {
        form: {
          name: request.formName,
          address: "hide",
        },
        formData: {
          requesterName: request.RequesterName,
          department: request.Department,
          date: request.FormFillDate,
          priority: request.priority,
          department_head_name: request.ownHeadName,
          requirements: request.RequirementsInDetails,
          purpose: request.purpose,
          HeadApprovedDate: request.DepartmentHeadApprovedDate,
          AGMITDate: request.DepartmentHeadAGMITDate,
          FiHeadDate: request.DepartmentHeadFIDate,
        },
        apiDetails: {
          data: {
            username: request.RequesterName,
            departmentHeadAgm: request.DepartmentAGMIT,
            departmentFinanceHeadName: request.DepartmentFIHead,
            status: normalizedStatus,
            status1: normalizedStatus1,
            status2: normalizedStatus2,
            Head: request.DepartmentHeadApprovedDate,
            ItAgm: request.DepartmentHeadAGMITDate,
            Finance: request.DepartmentHeadFIDate,
          },
        },
        selectedForm: { name: request.formName },
        token,
      },
    });
  };

  const getStatusIcon = (status) => {
    switch (normalizeStatus(status)) {
      case "PENDING":
        return (
          <FontAwesomeIcon
            icon={faClock}
            className="icon-legend-completedReq__icon--pending"
          />
        );
      case "APPROVED":
        return (
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="icon-legend-completedReq__icon--approved"
          />
        );
      case "CANCELED":
        return (
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="icon-legend-completedReq__icon--canceled"
          />
        );
      case "COMMENTED":
        return (
          <FontAwesomeIcon
            icon={faCommentDots}
            className="icon-legend-completedReq__icon--commented"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="completed-req-container">
        <div className="title-instuctions-completedReq">
          <h2>Completed Requests</h2>
          <div className="icon-legend-completedReq">
            <div className="icon-legend__item">
              <FontAwesomeIcon
                icon={faClock}
                className="icon-legend-completedReq__icon--pending"
              />
              <span className="icon-legend-completedReq__text">PENDING</span>
            </div>
            <div className="icon-legend__item">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="icon-legend-completedReq__icon--approved"
              />
              <span className="icon-legend-completedReq__text">APPROVED</span>
            </div>
            <div className="icon-legend__item">
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="icon-legend-completedReq__icon--canceled"
              />
              <span className="icon-legend-completedReq__text">CANCELED</span>
            </div>
           
          </div>
        </div>

        <table className="completed-req-table">
          <thead>
            <tr>
              <th>Req ID</th>
              <th>Request Name</th>
              <th>Purpose</th>
              <th>Dept. Head</th>
              <th>IT AGM</th>
              <th>FINANCE Head</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {completedRequests.length > 0 ? (
              completedRequests.map((request) => (
                <tr key={request.reqId}>
                  <td>{request.reqId}</td>
                  <td>{request.formName}</td>
                  <td>{request.purpose}</td>
                  <td>{getStatusIcon(request.status)}</td>
                  <td>{getStatusIcon(request.status1)}</td>
                  <td>{getStatusIcon(request.status2)}</td>
                  <td>
                    <button onClick={() => handleView(request)}>View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No completed requests</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CompletedReq;
