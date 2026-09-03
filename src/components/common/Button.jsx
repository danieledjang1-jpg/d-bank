const Button = ({ text, type = "button", onClick }) => {
  return (
    <button
      type={type}
      className="primary-btn"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;