import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./RequestForm.css";
import { NavLink, useNavigate } from "react-router-dom";
import forms from "../../Forms";

function RequestForm() {
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [apiDetails, setApiDetails] = useState(null);
  const [token, setToken] = useState();
  const navigate = useNavigate();
  console.log("api", userDetails, "formdata", formData);
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    const userToken = localStorage.getItem("authToken");
    if (userToken) {
      setToken(userToken);
    }
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setUserDetails(userDetails);
    } else {
      navigate("/login");
    }
    fetchUserDetails();
  }, [navigate]);

  useEffect(() => {
    if (apiDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        requesterName: apiDetails.data?.username,
        department: apiDetails.data?.Department,
        department_head_name: apiDetails.data?.departmentHeadName,
      }));
    }
  }, [apiDetails]);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error(
          "No token found in localStorage. User not authenticated."
        );
        return;
      }

      const response = await fetch(
        "http://192.168.137.1:8080/api/requests/user-details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User details fetched successfully:", data);
        setApiDetails({ data });
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSelectForm = (form) => {
    setSelectedForm(form);
    setFormData((prevFormData) => ({
      ...prevFormData,
      requesterName: apiDetails?.data?.username,
      department: apiDetails?.data?.Department,
      departmentHeadName: apiDetails.data?.DepartmentHead,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddRequirement = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      requirements: [...(prevFormData.requirements || []), ""],
    }));
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      requirements: updatedRequirements,
    }));
  };

  const handlePreview = () => {
    navigate("/preview", {
      state: { form: selectedForm, formData, apiDetails, selectedForm, token },
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar userDetails={userDetails} />
      <div className="request-form-container">
        <div className="request-form-left">
          <ul>
            <li>
              <NavLink to="/home" activeClassName="active" exact>
                Book Meeting
              </NavLink>
            </li>

            <li>
              <NavLink to="/visit/options" activeClassName="active" exact>
                Manage Visitors
              </NavLink>
            </li>

            <li>
              <NavLink to="/" activeClassName="active" exact>
                Policies
              </NavLink>
            </li>
            <li>
              <NavLink to="/" activeClassName="active" exact>
                Approvals
              </NavLink>
            </li>
            <li>
              <NavLink to="/" activeClassName="active" exact>
                Japfa Bytes
              </NavLink>
            </li>

            <button onClick={handleLogout} activeClassName="active" exact>
              logout
            </button>
          </ul>
        </div>
        <div className="request-form-middle">
          <p className="list-title">Request Forms</p>
          <div className="form-input-group">
            <input
              type="text"
              placeholder="Search forms..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-bar"
            />
          </div>
          <ul className="form-list">
            {filteredForms.map((form, index) => (
              <li
                key={index}
                className={selectedForm === form ? "selected-form" : ""}
                onClick={() => handleSelectForm(form)}
              >
                {form.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="request-form-right">
          {selectedForm ? (
            <div>
              <h3 className="list-title" style={{ color: "black" }}>
                {selectedForm.name}
              </h3>
              <form>
                <div className="form-grid-container">
                  <div className="form-grid-item">
                    <input
                      type="text"
                      id="requesterName"
                      name="requesterName"
                      value={formData.requesterName || ""}
                      placeholder="Requester Name"
                      required
                      readOnly
                      className="grayed-out"
                    />
                  </div>
                  <div className="form-grid-item">
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={apiDetails.department || ""}
                      placeholder="Department"
                      required
                      readOnly
                      className="grayed-out"
                    />
                  </div>
                  <div className="form-grid-item">
                    <input
                      type="text"
                      id="departmentHeadName"
                      name="departmentHeadName"
                      value={formData.departmentHeadName || ""}
                      placeholder="Department Head"
                      required
                      readOnly
                      className="grayed-out"
                    />
                  </div>
                  {selectedForm.fields.map((field, index) => (
                    <div key={index} className="form-grid-item">
                      {field.type === "textarea" ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          className="auto-expand-textarea"
                          rows={1}
                          placeholder={field.placeholder}
                          required
                        />
                      ) : field.type === "select" ? (
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          required
                        >
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required
                        />
                      )}
                    </div>
                  ))}

                  {/* Displaying dynamic requirements */}
                  {formData.requirements &&
                    formData.requirements.map((requirement, index) => (
                      <div key={index} className="form-grid-item">
                        <textarea
                          id={`requirement-${index}`}
                          name={`requirement-${index}`}
                          value={requirement}
                          onChange={(e) =>
                            handleRequirementChange(index, e.target.value)
                          }
                          className="auto-expand-textarea"
                          rows={1}
                          placeholder={`Requirement ${index + 1}`}
                          required
                        />
                      </div>
                    ))}

                  {/* Button to add more requirements */}
                  <div className="form-grid-item">
                    <button type="button" onClick={handleAddRequirement}>
                      Add Requirement
                    </button>
                  </div>
                </div>
                <button type="button" onClick={handlePreview}>
                  Preview PDF
                </button>
              </form>
            </div>
          ) : (
            <p>Please select a form to display its fields.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RequestForm;
