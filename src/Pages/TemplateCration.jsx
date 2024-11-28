import React, { useState } from "react";
import "./TemplateCration.css";
import FormHeader from "../components/FormHeader/FormHeader";

function TemplateCration() {
  const [form, setForm] = useState({ name: "ASSET ISSUE/COLLECTION" });
  return (
    <div className="asset-form-creation">
      <FormHeader
        form={form}
        code="JAPFA/IT/DOC/18"
        page="1|1"
        issue_date="02.01.2020"
      />
      <div className="blank"></div>
      <div className="asset-form-main-content">
        <table>
          <tbody>
            <tr>
              <td className="small-width">Employee Name</td>
              <td>Pravin Kadam</td>
              <td className="small-width">Date of Issue</td>
              <td className="small-width">Date of Collection</td>
            </tr>
            <tr>
              <td className="small-width">Location</td>
              <td>Pune</td>
              <td>22-07-2024</td>
              <td>25-07-2024</td>
            </tr>
            <tr>
              <td className="small-width">Employ Code</td>
              <td>FF30456</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="small-width">Designation</td>
              <td>Developer</td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td className="small-width">Department</td>
              <td>IT</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="small-width">Contact No & Email ID</td>
              <td>987654321 pravinkadam@gmail.Com</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="small-width">Reporting To</td>
              <td>Sanjay Trivedi</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <table className="second-table">
          <tbody>
            <tr>
              <td className="small-width" rowSpan={6}>
                Laptop
              </td>
              <td className="small-width">Make</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Model</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">S.N.</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Accessories</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Asset Code</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Inventory No</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="small-width" rowSpan={6}>
                Desktop
              </td>
              <td className="small-width">Make</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Model</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">S.N.</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Accessories</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Asset Code</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Inventory No</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="small-width" rowSpan={6}>
              Monitor
              </td>
              <td className="small-width">Make</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Model</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">S.N.</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Accessories</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Asset Code</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Inventory No</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="small-width" rowSpan={6}>
              Data Card
              </td>
              <td className="small-width">Make</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Model</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">S.N.</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Accessories</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Asset Code</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Inventory No</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="small-width" rowSpan={6}>
              Printer
              </td>
              <td className="small-width">Make</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Model</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">S.N.</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Accessories</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Asset Code</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Inventory No</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
          </tbody>
         <tbody>
         <tr>
              <td className="small-width">Purchase Date</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>
            <tr>
              <td className="small-width">Warranty period</td>
              <td></td>
              <td className="small-width"></td>
              <td className="small-width"></td>
            </tr>

         </tbody>
         <tbody>
          <tr style={{width:"100%",height:"45px"}}>
            <td colSpan={3} style={{borderRight:"none"}}></td>
            <td colSpan={2} style={{textAlign:"center"}}>Signature Of the Employee</td>
          </tr>
         </tbody>
        </table>
      </div>
    </div>
  );
}

export default TemplateCration;
