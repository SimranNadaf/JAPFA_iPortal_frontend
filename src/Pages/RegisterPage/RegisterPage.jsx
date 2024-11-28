import React, { useState, useEffect } from "react";
import "./RegisterPage.css";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [department_head, setDepartmentHead] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const saveCredentialsToLocalStorage = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  };

  async function fetchDepartmentHeadName(department, location) {
    if (department && location) {
      try {
        const response = await fetch(
          `http://192.168.137.1:8080/auth/department-head?departmentName=${department}&location=${location}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        if (result.departmentHeadName) {
          setDepartmentHead(result.departmentHeadName);
        } else {
          setDepartmentHead("");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  }

  const handleDepartmentChange = (e) => {
    const selectedDepartment = e.target.value;
    setDepartment(selectedDepartment);
  };

  useEffect(() => {
    fetchDepartmentHeadName(department, location);
  }, [department, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !email || !location || !department) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("http://192.168.137.1:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          location,
          department,
          department_head,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await sendVerificationEmail(email);

      saveCredentialsToLocalStorage();

      console.log("Registration successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setLocation("");
      setDepartment("");
      setDepartmentHead("");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("Email already registered. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmail = async (email) => {
    try {
      const response = await fetch(
        `http://192.168.137.1:8080/auth/send-verification?email=${email}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }
      console.log("Verification email sent successfully!");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  return (
    <div className="register-main-container">
      <div className="register-left">
        <img src="../src/assets/login.png" alt="" />
      </div>
      <div className="register-right">
        <div className="text-content">
          <p>Please Sign up to continue</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="username"
                value={username}
                autoComplete="off"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                autoComplete="off"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                value={password}
                autoComplete="off"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="location"
                value={location}
                autoComplete="off"
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <select
                id="department"
                value={department}
                onChange={handleDepartmentChange}
                required
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="itDigital">IT-Digital</option>
                <option value="itInfra">IT-Infra</option>
                <option value="itSap">IT-SAP</option>
                <option value="Finance">Finance</option>
                <option value="Infra">Infra</option>
              </select>
            </div>
            <div className="input-group">
              <input
                type="text"
                id="department_head"
                value={department_head}
                readOnly
                placeholder="Department Head"
                required
              />
            </div>
            <button className="register-btn" type="submit" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : "Sign up"}
            </button>
            <p className="bottom-item">
              Already have an account? <Link to="/login">Login</Link>
            </p>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
