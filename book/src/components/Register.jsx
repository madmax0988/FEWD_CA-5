import React, { useState } from "react";
import "./Register.css";

export default function Form() {
  const [field, setField] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "", // New field for password confirmation
  });

  const [submitted, setSubmit] = useState(false);
  const [validate, setValidation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (field.firstName && field.email && field.password && field.confirmPassword) {
      // Add password matching validation
      if (field.password === field.confirmPassword) {
        // Add email format validation
        if (validateEmail(field.email)) {
          setValidation(true);
        } else {
          setValidation(false);
        }
      } else {
        setValidation(false);
      }
    }
    setSubmit(true);
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div>
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          {submitted && validate ? (
            <div className="success-message">Registration successful!</div>
          ) : null}

          <input
            id="first-name"
            className="form-field"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={field.firstName}
            onChange={(e) => {
              setField({ ...field, firstName: e.target.value });
            }}
          />
          {submitted && !field.firstName ? <span>Please enter your Name</span> : null}

          <input
            id="email"
            className="form-field"
            type="text"
            placeholder="Email"
            name="email"
            value={field.email}
            onChange={(e) => {
              setField({ ...field, email: e.target.value });
            }}
          />
          {submitted && !field.email ? <span>Please enter your email</span> : null}
          {submitted && field.email && !validateEmail(field.email) ? (
            <span>Please enter a valid email</span>
          ) : null}

          <input
            id="password"
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={field.password}
            onChange={(e) => {
              setField({ ...field, password: e.target.value });
            }}
          />
          {submitted && !field.password ? <span>Please enter your password</span> : null}

          <input
            id="confirm-password"
            className="form-field"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={field.confirmPassword}
            onChange={(e) => {
              setField({ ...field, confirmPassword: e.target.value });
            }}
          />
          {submitted && field.password !== field.confirmPassword ? (
            <span>Passwords do not match</span>
          ) : null}

          <button className="form-field" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}