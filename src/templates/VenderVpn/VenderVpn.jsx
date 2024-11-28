import React from "react";
import "./VenderVpn.css"
import FormHeader from "../../components/FormHeader/FormHeader";
import FormCommonDetails from "../../components/FormCommonDetails/FormCommonDetails";
import FormSign from "../../components/FormSign/FormSign";
function VenderVpn({  form, formData , apiDetails}) {
  // console.log("myform",form,"formData", formData);
  return (
    <div className="vender-vpn-access-form-main-container">
     
      <FormHeader form={form} code="JAPFA/IT/DOC/04" page="1|1" issue_date="02.01.2020"/>
      <div className="blank-space"></div>
      <FormCommonDetails formData={formData} />
      <div className="blank-space"></div>
      <div className="requirement">
        <table>
          <tbody>
            <tr>
              <th className="small-box">Sr.No.</th>
              <th>Requirements In Details</th>
            </tr>

            {formData?.requirements?.map((requirement, index = 0) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{requirement}</td>
              </tr>
            ))}

            <tr>
              <th className="purpose">PURPOSE</th>
              <td>{formData?.purpose}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="blank-space"></div>
      <FormSign apiDetails={apiDetails} formData={formData} />
      <div></div>
      <div
        className="blank-space"
        style={{ borderBottom: "1px solid black", height: 20 }}
      ></div>
    </div>
  );
}

export default VenderVpn
