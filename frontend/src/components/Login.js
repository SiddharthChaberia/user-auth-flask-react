import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ id: "", email: ""});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setUser({ id: data.user.id, email: data.user.email});
        alert("Login successful!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Simulate successful login
  //   setUser({ name: "John Doe", email: formData.email });
  // };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
