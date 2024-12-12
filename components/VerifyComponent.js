import React, { useState } from "react";

const VerifyComponent = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  // Function to verify user and get token
  const verifyUser = async () => {
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify user");
      }

      const { token } = await response.json();
      localStorage.setItem("authToken", token); // Store token in localStorage
      setMessage("Verification successful! Token saved.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Function to access a protected route
  const accessProtectedRoute = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found. Please verify first.");

      const response = await fetch("/api/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Access denied");
      }

      const data = await response.json();
      setMessage(`Protected data accessed: ${JSON.stringify(data)}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>JWT Verification System</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={verifyUser}>Verify</button>
      <button onClick={accessProtectedRoute}>Access Protected Route</button>
      <p>{message}</p>
    </div>
  );
};

export default VerifyComponent;
