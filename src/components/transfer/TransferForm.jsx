import { useState, useEffect, useContext } from "react";




import "./TransferForm.css";



import { FaArrowRight } from "react-icons/fa";

import PinModal from "./PinModal";

import { BankContext } from "../../context/BankContext";

const TransferForm = () => {

 const {
  currentUser,
  users,
  transferMoney,
} = useContext(BankContext);

  const [accountNumber, setAccountNumber] = useState("");

  const [amount, setAmount] = useState("");

  const [narration, setNarration] = useState("");


  const [recipient, setRecipient] = useState(null);

const [loading, setLoading] = useState(false);

const [error, setError] = useState("");

const [amountError, setAmountError] = useState("");

const [showPinModal, setShowPinModal] = useState(false);

const [transferLoading, setTransferLoading] = useState(false);


useEffect(() => {

  if (accountNumber.length !== 10) {

    setRecipient(null);
    setError("");
    setLoading(false);

    return;

  }

  setLoading(true);

  const timer = setTimeout(() => {

    const user = users.find(
  (user) => user.accountNumber === accountNumber
);

    if (user) {

      setRecipient(user);
      setError("");

    } else {

      setRecipient(null);
      setError("Account not found.");

    }

    setLoading(false);

  }, 800);

  return () => clearTimeout(timer);

}, [accountNumber, users]);




const formatCurrency = (value) => {

  if (!value) return "";

  return Number(value).toLocaleString("en-NG");

};




  return (

    <div className="transfer-card">

      <h2>Transfer Money</h2>

      <div className="balance-box">

        <small>Available Balance</small>

        <h1>

          ₦{currentUser.balance.toLocaleString()}

        </h1>




        {showPinModal && (

  <PinModal
  recipient={recipient}
  accountNumber={accountNumber}
  amount={amount}
  narration={narration}
  transferMoney={transferMoney}
  onClose={() => setShowPinModal(false)}
/>

)}






      </div>

      <label>

        Recipient Account Number

      </label>

      <input

        type="text"

        maxLength="10"

        value={accountNumber}

       onChange={(e) => {
  const value = e.target.value
    .replace(/\D/g, "")
    .slice(0, 10);

  setAccountNumber(value);
}}

        placeholder="Enter 10-digit account number"

      />


      {loading && (

  <p className="loading-text">

    Searching account...

  </p>

)}

{recipient && (

  <div className="recipient-card">

    <h4>{recipient.fullName}</h4>

    <small>D-BANK</small>

  </div>

)}

{error && (

  <p className="error-text">

    {error}

  </p>

)}




      <label>

        Amount

      </label>

    <input
  type="text"
  value={formatCurrency(amount)}
  onChange={(e) => {

    const rawValue = e.target.value.replace(/,/g, "");

    if (!/^\d*$/.test(rawValue)) return;

    setAmount(rawValue);

    const value = Number(rawValue);

    if (value <= 0 && rawValue !== "") {

      setAmountError("Amount must be greater than ₦0");

    } else if (value > currentUser.balance) {

      setAmountError("Insufficient balance");

    } else {

      setAmountError("");

    }

  }}
  placeholder="₦0.00"
/>

{amountError && (

  <p className="error-text">

    {amountError}

  </p>

)}


<p className="remaining-balance">

  Remaining Balance:

  <strong>

    ₦{(
      currentUser.balance -
(Number(amount) || 0)
    ).toLocaleString()}

  </strong>

</p>




      <label>

        Narration (Optional)

      </label>

      <textarea

        rows="4"

        value={narration}

        onChange={(e)=>setNarration(e.target.value)}

        placeholder="What's this transfer for?"

      />

    <button
  className="continue-btn"
  disabled={
    !recipient ||
    amountError ||
    !amount
  }
  onClick={() => setShowPinModal(true)}
>

  Continue

  <FaArrowRight />

</button>

    </div>

  );

};

export default TransferForm;