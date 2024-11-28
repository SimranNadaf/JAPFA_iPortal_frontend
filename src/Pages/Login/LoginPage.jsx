import { useState, useEffect } from "react";
import React from "react";

import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Both fields are required.");

    } else {
      setIsLoading(true);
      try {
        const response = await fetch("http://192.168.137.1:8080/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to login");
        }

        const data = await response.json();
       
        localStorage.setItem("authToken", data.jwt);
        localStorage.setItem("userDetails", JSON.stringify(data.userDetails));
    
        // Reset form fields
        setEmail("");
        setPassword("");
        setErrorMessage("");
       

        console.log("Login successful!");
        navigate("/home");
      } catch (error) {
        console.error("Error logging in:", error);
        setErrorMessage(" incorrect Email or Password !" || "Failed to login");
      }
      finally {
        setIsLoading(false);
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="login-main-container">
      <div className="login-left">
        <img src="../src/assets/login.png" alt="" />
      </div>
      <div className="login-right">
        <div className="text-content">
          <p className="page-title">
            HELLO, <br /> WELCOME BACK
          </p>
          <p>Please sign in to continue</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                value={email}
                autoComplete="off"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
           
             <button className="login-btn" type="submit" disabled={isLoading}>
              {isLoading ? <div className="input-group"><div className="spinner"></div></div>  : "Login"}
            </button>
            <p className="bottom-item" style={{gap:"5px"}}>
              Don't have an Account? <Link to="/sign-up">Sign up</Link>
            </p>
            <a href="#" onClick={openModal} className="forget-link" >Forgot Password?</a>
           
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
      <ForgotPasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default LoginPage;
