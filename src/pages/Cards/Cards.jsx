import { useContext, useState } from "react";

import {
  FaCreditCard,
  FaEye,
  FaEyeSlash,
  FaCopy,
  FaSnowflake,
  FaLock,
} from "react-icons/fa";

import { BankContext } from "../../context/BankContext";

import "./Cards.css";

const Cards = () => {

  const {
    currentUser,
    card,
    toggleCardFreeze,
  } = useContext(BankContext);

  const [showCardNumber, setShowCardNumber] = useState(false);

  const formatCardNumber = (number) => {

    return number
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  };

  const maskedCardNumber =
    `•••• •••• •••• ${card.cardNumber.slice(-4)}`;

  const displayedCardNumber = showCardNumber
    ? formatCardNumber(card.cardNumber)
    : maskedCardNumber;

  const copyCardNumber = async () => {

    try {

      await navigator.clipboard.writeText(
        card.cardNumber
      );

      alert("Card number copied.");

    } catch (error) {

      console.error(
        "Unable to copy card number.",
        error
      );

    }

  };

  return (

    <div className="cards-page">

      <div className="cards-header">

        <div>

          <h1>My Card</h1>

          <p>
            Manage your D-BANK card.
          </p>

        </div>

        <div className="cards-header-icon">
          <FaCreditCard />
        </div>

      </div>


      <div className="bank-card">

        <div className="card-top">

          <span className="card-brand">
            D-BANK
          </span>

          <FaCreditCard />

        </div>


        <div className="card-chip">
          ▰
        </div>


        <div className="card-number">

          {displayedCardNumber}

        </div>


        <div className="card-bottom">

          <div>

            <small>CARD HOLDER</small>

            <strong>
              {currentUser.fullName.toUpperCase()}
            </strong>

          </div>


          <div>

            <small>EXPIRES</small>

            <strong>
              {card.expiryDate}
            </strong>

          </div>

        </div>

      </div>


      <div className="card-status">

        <span
          className={
            card.status === "Active"
              ? "status-dot active"
              : "status-dot frozen"
          }
        />

        <div>

          <strong>
            Card {card.status}
          </strong>

          <p>
            {card.status === "Active"
              ? "Your card is ready to use."
              : "Your card is currently frozen."}
          </p>

        </div>

      </div>


      <div className="card-actions">

        <button
          onClick={() =>
            setShowCardNumber(
              (prev) => !prev
            )
          }
        >

          {showCardNumber
            ? <FaEyeSlash />
            : <FaEye />}

          {showCardNumber
            ? "Hide Card Number"
            : "Show Card Number"}

        </button>


        <button
          onClick={copyCardNumber}
        >

          <FaCopy />

          Copy Card Number

        </button>


        <button
          className={
            card.status === "Active"
              ? "freeze-card-btn"
              : "unfreeze-card-btn"
          }
          onClick={toggleCardFreeze}
        >

          {card.status === "Active"
            ? <FaSnowflake />
            : <FaLock />}

          {card.status === "Active"
            ? "Freeze Card"
            : "Unfreeze Card"}

        </button>

      </div>


      <div className="card-information">

        <h2>Card Information</h2>

        <div className="information-row">

          <span>Card Number</span>

          <strong>
            {displayedCardNumber}
          </strong>

        </div>


        <div className="information-row">

          <span>Expiry Date</span>

          <strong>
            {card.expiryDate}
          </strong>

        </div>


        <div className="information-row">

          <span>CVV</span>

          <strong>
            {showCardNumber
              ? card.cvv
              : "•••"}
          </strong>

        </div>


        <div className="information-row">

          <span>Card Holder</span>

          <strong>
            {currentUser.fullName}
          </strong>

        </div>

      </div>

    </div>

  );

};

export default Cards;