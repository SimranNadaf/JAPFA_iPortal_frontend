import React from "react";
import "./InternetApproval.css";
import FormHeader from "../../components/FormHeader/FormHeader";

export const InternetApproval = ({ form, formData, apiDetails }) => {
  return (
    <div className="internet-access-form-main-container">
      <FormHeader
        form={form}
        code="JAPFA/IT/DOC/06"
        page="1|1"
        issue_date="02.01.2020"
      />
 <div className="blank-space"></div>
      <div>
        <table>
          <tbody>
            <tr>
              <th className="small-box">Requester</th>
              <td >Pravin Kadam</td>
            </tr>
            <tr>
              <th className="small-box">Deg : </th>
              <td style={{borderRight:"1px solid black"}}>Developer</td>
              <th className="small-box">Dept:</th>
              <td>Finance</td>
            </tr>
            <tr>
              <td colSpan={4} style={{padding:"10px"}}></td>
            </tr>
            <tr>
              <th className="small-box">Sr.No.</th>
              <th  className="big-box">Requested Web Sites</th>
              <th  className="big-box">Purpose</th>
              <th>Allowed / Rejected</th>
            </tr>
            <tr>
              <td>1</td>
              <td>node js for backend server node for js rodes</td>
              <td>Lorem ipsum dmquam voluptate. Maxime doloribus voluptates similique necessitatibus odit!</td>
              <td>Allowed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
