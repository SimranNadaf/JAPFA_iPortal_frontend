import React, { useState } from "react";
import "./ForgotPasswordModal.css";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://192.168.137.1:8080/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password");
      }

      const data = await response.json();
      setResetMessage("Change password link sent to your email.");
      setIsSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        onClose();
        // Redirect to the login page
        window.location.href = "/login";
      }, 3000);


    } catch (error) {
       setResetMessage("Password reset request failed: " + error.message);
      setIsLoading(false);
    }
  };

  
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Forgot Password</h2>
        <form onSubmit={handleResetSubmit}>
          <label htmlFor="resetEmail" > Enter your email:</label>
          <div className="input-group first">
          <input
            type="email"
            id="resetEmail"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          </div>
          {/* <button className="login-btn" type="submit">Reset Password</button> */}
          <button className="login-btn" type="submit" disabled={isLoading || isSuccess}>
            {isLoading ? <div className="input-group"><div className="spinner"></div> </div> : "Reset Password"}
          </button>
        </form>
        {resetMessage && <p>{resetMessage}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
