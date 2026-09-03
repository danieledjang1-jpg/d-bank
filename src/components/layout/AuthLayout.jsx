import "./AuthLayout.css";
import Logo from "./Logo";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="auth-page">

      <div className="auth-left">

        <Logo color="#FFFFFF" />

        <h1>{title}</h1>

        <p>{subtitle}</p>

      </div>

      <div className="auth-right">

        {children}

      </div>

    </div>
  );
};

export default AuthLayout;