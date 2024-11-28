import React from "react";
import "./FormHeader.css";
function FormHeader({form,code,page,issue_date}) {

  return (
    <div className="form-header-outer-container">
      <div className="header-logo-container">
        <img src="../src/assets/japfa-logo.jpg" alt="Logo" />
        <p>Japfa Comfeed India Pvt Ltd</p>
      </div>
      <div className="header-title-container">
        <p>{form.name.toUpperCase()}</p>
      </div>
      <div className="header-page-details-container">
        <table>
          <tbody>
            <tr>
              <th> Document code</th>
              <td> {code}</td>
            </tr>
            <tr>
              <th> Revision Status</th>
              <td>0</td>
            </tr>
            <tr>
              <th> Issue Date</th>
              <td>{issue_date}</td>
            </tr>
            <tr>
              <th> page</th>
              <td>{page}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormHeader;
