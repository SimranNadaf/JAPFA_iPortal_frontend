import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./VisitorRecords.css";

function VisitorRecords() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      navigate("/visit/record");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        let url;
        switch (selectedPeriod) {
          case "last-month":
            url = "/api/visitors/last-month";
            break;
          case "last-week":
            url = "/api/visitors/last-week";
            break;
          case "last-quarter":
            url = "/api/visitors/last-quarter";
            break;
          case "custom":
            url = `/api/visitors/custom?start=${customStartDate}&end=${customEndDate}`;
            break;
          case "all-data":
            url = "/api/visitors/all-data";
            break;
          default:
            url = "/api/visitors/current-month";
        }
        const response = await axios.get(url);
        setVisitors(
          Array.isArray(response.data)
            ? response.data.filter(
                (visitor) => visitor.officeLocation === userDetails.location
              )
            : []
        );
      } catch (error) {
        console.error("Error fetching visitor data:", error);
      }
    };

    if (selectedPeriod === "custom" && (!customStartDate || !customEndDate)) {
      return; // Don't fetch data if custom dates are not set
    }
    fetchVisitors();
  }, [selectedPeriod, customStartDate, customEndDate, userDetails]);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      visitors.map((visitor) => ({
        Name: visitor.name,
        WhomToMeet: visitor.whomToMeet,
        PhoneNumber: visitor.phoneNumber,
        InTime: new Date(visitor.inTime).toLocaleString(),
        OutTime: visitor.outTime
          ? new Date(visitor.outTime).toLocaleString()
          : "N/A",
        Location: visitor.visitorLocation,
        Purpose: visitor.purpose,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitors");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buf], { type: "application/octet-stream" });

    saveAs(blob, "visitor_records.xlsx");
  };

  return (
    <>
      <NavBar userDetails={userDetails} />
      <div className="visitor-record-container">
        <div className="v-r-inside-box">
        {selectedPeriod === "custom" && (
            <div className="date-box">
              <DatePicker
                selected={customStartDate}
                onChange={(date) => setCustomStartDate(date)}
                selectsStart
                startDate={customStartDate}
                endDate={customEndDate}
                placeholderText="select Start Date"
                className="date-picker"
              />
              <DatePicker 
                selected={customEndDate}
                onChange={(date) => setCustomEndDate(date)}
                selectsEnd
                startDate={customStartDate}
                endDate={customEndDate}
                placeholderText="Select End Date"
                minDate={customStartDate}
                 className="date-picker"
              />
            </div>
          )}
          <p>Visitor Records</p>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="current-month">Current Month</option>
            <option value="last-month">Last Month</option>
            <option value="last-week">Last Week</option>
            <option value="last-quarter">Last Quarter</option>
            <option value="custom">Custom Date Range</option>
            <option value="all-data">All Data</option>
          </select>
          <button onClick={downloadExcel}>Download Excel</button>
        </div>

        <table className="my-t">
          <thead>
            <tr>
              <th className="bg-t">Sr. No.</th>
              <th className="bg-t">Name</th>
              <th className="bg-t">Whom To Meet</th>
              <th className="bg-t">Phone Number</th>
              <th className="bg-t">In Time</th>
              <th className="bg-t">Out Time</th>
              <th className="bg-t">Location</th>
              <th className="bg-t">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(visitors) &&
              visitors.map((visitor, ind = 1) => (
                <tr key={visitor.id} className="my-colr">
                  <td className="my-td">{++ind}</td>
                  <td className="my-td">{visitor.name}</td>
                  <td className="my-td">{visitor.whomToMeet}</td>
                  <td className="my-td">{visitor.phoneNumber}</td>
                  <td className="my-td">{new Date(visitor.inTime).toLocaleString()}</td>
                  <td className="my-td">
                    {visitor.outTime
                      ? new Date(visitor.outTime).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="my-td">{visitor.visitorLocation}</td>
                  <td className="my-td">{visitor.purpose}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VisitorRecords;
