import React from "react";
import { useLocation } from "react-router-dom";
import VpnAccessForm from "../../templates/VPN/VpnAccessForm";
import "./Preview.css";
import VenderVpn from "../../templates/VenderVpn/VenderVpn";
import { InternetApproval } from "../../templates/InternetApproval/InternetApproval";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

function Preview() {
  const location = useLocation();
  const { form, formData, apiDetails, selectedForm, token } = location.state;
  console.log("preview", apiDetails);

  const renderTemplate = () => {
    switch (form.name) {
      case "VPN Access":
        return (
          <VpnAccessForm form={form} formData={formData} apiDetails={apiDetails} />
        );

      case "REMOTE DESKTOP ACCESS–EXTERNAL VENDOR":
        return (
          <VenderVpn form={form} formData={formData} apiDetails={apiDetails} />
        );

      case "INTERNET ACCESS APPROVAL":
        return (
          <InternetApproval form={form} formData={formData} apiDetails={apiDetails} />
        );
      default:
        return <p>Unknown form type</p>;
    }
  };

  const generatePdf = async () => {
    try {
      const content = document.getElementById("preview-content");
      const canvas = await html2canvas(content);

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const marginLeft = 10;
      const marginTop = 10;

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(
        canvas.toDataURL("image/jpeg"),
        "JPEG",
        marginLeft,
        marginTop,
        pdfWidth - 2 * marginLeft,
        pdfHeight - 2 * marginTop
      );

      pdf.save("preview.pdf");

      return pdf.output("blob");
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      if (!formData || !selectedForm) {
        console.error("Form data or selected form is missing");
        return;
      }

      const pdfBlob = await generatePdf();

      const dataToSend = {
        ...formData,
        formName: selectedForm.name,
        status: "pending",
      };

      const formDataToSend = new FormData();
      formDataToSend.append("pdfFile", pdfBlob, "preview.pdf");
      Object.keys(dataToSend).forEach((key) => {
        formDataToSend.append(key, dataToSend[key]);
      });

      console.log("Data to Send:", dataToSend);

      const response = await axios.post(
        "http://192.168.137.1:8080/api/requests/post-request",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response);

      if (response.status === 200) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error details:", error.message);
      }
    }
  };

  return (
    <div className="preview-container">
      <div id="preview-content" className="preview-content">
        {renderTemplate()}
      </div>
      {form.address === "hide" ? (
        <button onClick={generatePdf}>Download PDF</button>
      ) : (
        <button onClick={handleSubmit}>Send Data to Backend</button>
      )}
    </div>
  );
}

export default Preview;
