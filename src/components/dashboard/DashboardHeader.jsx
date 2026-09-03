import { useContext, useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import "./DashboardHeader.css";

import Logo from "../layout/Logo";



import { BankContext } from "../../context/BankContext";

import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";



const DashboardHeader = () => {

  const navigate = useNavigate();

const [searchTerm, setSearchTerm] = useState("");


const [mobileSearchOpen, setMobileSearchOpen] = useState(false);


const searchRef = useRef(null);

  const {
  currentUser,
  notifications,
} = useContext(BankContext);

const searchResults = [
  {
    name: "Transfer Money",
    keyword: "transfer",
    path: "/transfer",
  },
  {
    name: "Recent Transactions",
    keyword: "transaction",
    path: "/dashboard",
  },
  {
    name: "Savings",
    keyword: "savings",
    path: "/dashboard",
  },
  {
    name: "Cards",
    keyword: "cards",
    path: "/dashboard",
  },
  {
    name: "Deposit",
    keyword: "deposit",
    path: "/dashboard",
  },
];

const filteredResults = searchResults.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {

    greeting = "Good Morning";

  } else if (hour < 18) {

    greeting = "Good Afternoon";

  } else {

    greeting = "Good Evening";

  }




  useEffect(() => {

  const handleClickOutside = (event) => {

    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {

      setSearchTerm("");

    }

  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

  };

}, []);






  return (

    <header className="dashboard-header">

      <div className="header-logo">

        <Logo />

      </div>

   <div
  className="global-search-wrapper"
  ref={searchRef}
>

  {/* Mobile Search Button */}

 <button
  className="mobile-search-btn"
  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
>
  <FaSearch />
</button>


{mobileSearchOpen && (
  <div className="mobile-search-box">

    <FaSearch />

    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
      autoFocus
    />

  </div>
)}


  {/* Desktop Search */}

  <div className="search-box">

    <FaSearch />

    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />

  </div>


  {searchTerm && (

    <div className="global-search-results">

      {filteredResults.length > 0 ? (

        filteredResults.map((result) => (

        <button
  key={result.name}
  onClick={() => {
    navigate(result.path);
    setSearchTerm("");
    setMobileSearchOpen(false);
  }}
>
  {result.name}
</button>

        ))

      ) : (

        <p className="no-search-results">
          No results found
        </p>

      )}

    </div>

  )}

</div>


      <div className="header-right">

        <button className="notification-btn">

          <FaBell />

         {notifications.length > 0 && (

  <span className="notification-badge">

    {notifications.length}

  </span>

)}

        </button>

        <div className="profile-info">

          <FaUserCircle />

          <span>

            {greeting},{" "}
          {currentUser.fullName.split(" ")[0]}

          </span>

        </div>

      </div>

    </header>

  );

};

export default DashboardHeader;