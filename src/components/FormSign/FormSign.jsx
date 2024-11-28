import React from "react";
import "./FormSign.css";
function FormSign({ apiDetails, formData }) {
  console.log("pravin", apiDetails);
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) return "-"; 
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); 
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="form-sign">
      <table>
        <tbody>
          <tr className="authority">
            <th></th>
            <th>REQUESTER</th>
            <th>DEPT. HEAD</th>
            <th>IT AGM</th>
            <th>FINANCE HEAD</th>
          </tr>
          <tr>
            <th>Name</th>
            <td>{apiDetails?.data?.username}</td>
            <td>{apiDetails?.data?.DepartmentHead}</td>
            <td>{apiDetails?.data?.departmentHeadAgm}</td>
            <td>{apiDetails?.data?.departmentFinanceHeadName}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>Request Submitted</td>
            <td>{apiDetails?.data?.status}</td>
            <td>{apiDetails?.data?.status1}</td>
            <td>{apiDetails?.data?.status2}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{formData.date}</td>
            <td>
              {formData?.HeadApprovedDate
                ? formatDate(formData.HeadApprovedDate)
                : "-"}
            </td>
            <td>
              {formData?.AGMITDate ? formatDate(formData.AGMITDate) : "-"}
            </td>
            <td>
              {formData?.FiHeadDate ? formatDate(formData?.FiHeadDate) : "-"}
            </td>
          </tr>
          <tr>
            <th>Remark</th>
            <td colSpan={4}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FormSign;
