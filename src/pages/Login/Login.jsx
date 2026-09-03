import { Link } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Checkbox from "../../components/common/Checkbox";

import "./Login.css";
import Logo from "../../components/layout/Logo";

import AuthLayout from "../../components/layout/AuthLayout";



const Login = () => {

return (

<AuthLayout
title="Welcome to D-BANK"
subtitle="Bank Smarter. Save Better."
>

<div className="login-card">

  <h2>Welcome Back 👋</h2>

  <p>Sign in to your account to continue securely.</p>

  <Input
    label="Email Address"
    type="email"
    placeholder="Enter your email"
  />

  <Input
    label="Password"
    type="password"
    placeholder="Enter your password"
  />

  <div className="remember-row">

    <Checkbox label="Remember Me" />

   <Link to="/forgot-password">
  Forgot Password?
</Link>

  </div>

  <Button text="Login Securely" />

  <div className="divider">

    <span>OR</span>

  </div>

  <button className="google-btn">

    Continue with Google

  </button>

  <p className="signup-text">

    Don't have an account?

   <Link to="/signup"> Sign Up</Link>

  </p>

</div>

</AuthLayout>



  );
};

export default Login;