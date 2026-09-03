import { useState, useContext } from "react";
import "./BalanceCard.css";

import { BankContext } from "../../context/BankContext";

import {
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaSyncAlt,
} from "react-icons/fa";

const BalanceCard = () => {

  const { currentUser } = useContext(BankContext);

  const [showBalance, setShowBalance] = useState(true);

  const handleCopy = () => {

    navigator.clipboard.writeText(currentUser.accountNumber);

    alert("Account number copied!");

  };

  return (

    <div className="balance-card">

      <div className="balance-header">

        <h3>Available Balance</h3>

        <button
          className="icon-btn"
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? <FaEye /> : <FaEyeSlash />}
        </button>

      </div>

      <h1 className="balance-amount">

        {showBalance
          ? `₦${currentUser.balance.toLocaleString()}`
          : "••••••••"}

      </h1>

      <div className="account-row">

        <div>

          <small>Account Number</small>

          <p>

            {currentUser.accountNumber || "Not Assigned"}

          </p>

        </div>

        <button
          className="icon-btn"
          onClick={handleCopy}
        >
          <FaCopy />
        </button>

      </div>

      <button className="refresh-btn">

        <FaSyncAlt />

        Refresh Balance

      </button>

    </div>

  );

};

export default BalanceCard;