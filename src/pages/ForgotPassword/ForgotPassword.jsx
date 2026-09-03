import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setMessage(
        "If an account exists with this email, a reset link has been sent."
      );
    }, 2000);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Recover your D-BANK account securely."
    >
      <form className="forgot-card" onSubmit={handleSubmit}>

        <h2>Reset Password</h2>

        <p>
          Enter your registered email address.
        </p>

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        {message && (
          <p className="info-message">
            {message}
          </p>
        )}

        <Button
          type="submit"
          text={
            loading
              ? "Sending..."
              : "Send Reset Link"
          }
        />

        <p className="back-login">

          Remember your password?

          <Link to="/"> Login</Link>

        </p>

      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;