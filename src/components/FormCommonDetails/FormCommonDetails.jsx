import React from "react";
import "./FormCommonDetails.css";
function FormCommonDetails({formData}) {
  console.log(formData)
  return (
    <div className="form-common-details">
      <table>
        <tbody>
          <tr>
            <th >Requester Name</th>
            <td>{formData?.requesterName.toUpperCase()}</td>
            <th>Date</th>
            <td>{formData?.date}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>{formData?.department.toUpperCase()} </td>
            {/* <td>it</td> */}
            <th>Priority</th>
            <td>{formData?.priority.toUpperCase()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FormCommonDetails;
