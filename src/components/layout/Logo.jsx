// import { FaUniversity } from "react-icons/fa";

// const Logo = ({ color = "#1E40AF" }) => {
//   return (
//     <div className="logo">
//       <FaUniversity size={34} color={color} />
//       <h2 style={{ color }}>{`D-BANK`}</h2>
//     </div>
//   );
// };

// export default Logo;




import { FaUniversity } from "react-icons/fa";

const Logo = ({
  color = "#1E40AF",
  size = 34,
  showText = true,
}) => {
  return (
    <div className="logo">
      <FaUniversity size={size} color={color} />

      {showText && (
        <h2 style={{ color }}>
          D-BANK
        </h2>
      )}
    </div>
  );
};

export default Logo;