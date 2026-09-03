import { useState, useContext } from "react";


import { FaWallet, FaArrowRight } from "react-icons/fa";

import { BankContext } from "../../context/BankContext";

import "./Deposit.css";

const Deposit = () => {


  const { depositMoney } = useContext(BankContext);



  const [amount, setAmount] = useState("");


  const [amountError, setAmountError] = useState("");



  const [showConfirmation, setShowConfirmation] = useState(false);




  const formatCurrency = (value) => {

    if (!value) return "";

    return Number(value).toLocaleString("en-NG");

  };




  if (showConfirmation) {

  return (

    <div className="deposit-page">

      <div className="deposit-card">

        <div className="deposit-icon">
          <FaWallet />
        </div>

        <h1>Confirm Deposit</h1>

        <p className="deposit-subtitle">
          Please review your deposit before continuing.
        </p>

        <div className="deposit-summary">

          <div className="deposit-summary-row">

            <span>Deposit Amount</span>

            <strong>
              ₦{Number(amount).toLocaleString("en-NG")}
            </strong>

          </div>

          <div className="deposit-summary-row">

            <span>Account</span>

            <strong>
              D-BANK Account
            </strong>

          </div>

        </div>

       <button
  className="deposit-continue-btn"
  onClick={() => {

    const result = depositMoney(amount);

    if (result.success) {

      setShowConfirmation(false);
      setAmount("");

    } else {

      setAmountError(result.message);

    }

  }}
>
  Confirm Deposit
</button>

        <button
          className="deposit-cancel-btn"
          onClick={() => setShowConfirmation(false)}
        >
          Go Back
        </button>

      </div>

    </div>

  );

}






  return (

    <div className="deposit-page">

      <div className="deposit-card">

        <div className="deposit-icon">

          <FaWallet />

        </div>

        <h1>Deposit Money</h1>

        <p className="deposit-subtitle">
          Add money to your D-BANK account.
        </p>

        <label>
          Deposit Amount
        </label>

        <input
          type="text"
          value={formatCurrency(amount)}
          onChange={(e) => {

  const rawValue =
    e.target.value.replace(/,/g, "");

  if (!/^\d*$/.test(rawValue)) {
    return;
  }

  setAmount(rawValue);

  const value = Number(rawValue);

  if (rawValue === "") {

    setAmountError("");

  } else if (value <= 0) {

    setAmountError(
      "Deposit amount must be greater than ₦0"
    );

  } else {

    setAmountError("");

  }

}}
          placeholder="₦0.00"
        />


        {amountError && (

  <p className="deposit-error">
    {amountError}
  </p>

)}




        <p className="deposit-info">
          Enter the amount you want to deposit.
        </p>

       <button
  className="deposit-continue-btn"
  disabled={!amount || amountError}
  onClick={() => setShowConfirmation(true)}
>

          Continue

          <FaArrowRight />

        </button>

      </div>

    </div>

  );

};

export default Deposit;