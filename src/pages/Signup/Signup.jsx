import { useState } from "react";

import { Link } from "react-router-dom";

import AuthLayout from "../../components/layout/AuthLayout";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Checkbox from "../../components/common/Checkbox";

import "./Signup.css";

const Signup = () => {

    const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  setError("");

  if (
    !formData.fullName ||
    !formData.email ||
    !formData.phone ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    setError("Please fill in all fields.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  setTimeout(() => {
    setLoading(false);

    console.log("User Data:", formData);

    alert("Account created successfully!");
  }, 2000);
};




  return (
    <AuthLayout
      title="Join D-BANK"
      subtitle="Create your secure banking account in just a few steps."
    >
      <form
  className="signup-card"
  onSubmit={handleSubmit}
>

        <h2>Create Account</h2>

        <p>Start your banking journey with D-BANK.</p>

       <Input
  label="Full Name"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  placeholder="Enter your full name"
/>

       <Input
  label="Email Address"
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Enter your email"
/>

       <Input
  label="Phone Number"
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Enter your phone number"
/>

       <Input
  label="Password"
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Create a password"
/>

       <Input
  label="Confirm Password"
  type="password"
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  placeholder="Confirm your password"
/>

        <Checkbox label="I agree to the Terms & Conditions" />




        {error && (

  <p className="error-message">

    {error}

  </p>

)}




        <Button
  text={loading ? "Creating Account..." : "Create Account"}
  type="submit"
/>

        <p className="login-text">
          Already have an account?
          <Link to="/"> Login</Link>
        </p>

      </form>
    </AuthLayout>
  );
};

export default Signup;