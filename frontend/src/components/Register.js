import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ u_name: formData.name, email: formData.email, password: formData.password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(`Registration successful! Kindly login now ${data.id}`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle registration logic (to be implemented with Flask backend)
//     alert("Registered successfully!");
//   };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
