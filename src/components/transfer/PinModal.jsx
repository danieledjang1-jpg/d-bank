import { useState } from "react";

import "./PinModal.css";

import {

  FaLock,

  FaEye,

  FaEyeSlash

} from "react-icons/fa";

import TransferReceipt from "./TransferReceipt";

const PinModal = ({
  recipient,
  accountNumber,
  amount,
  narration,
  transferMoney,
  onClose,
}) => {

  const [pin, setPin] = useState("");

  const [showPin, setShowPin] = useState(false);

  const [error, setError] = useState("");




  const [processing, setProcessing] = useState(false);

const [success, setSuccess] = useState(false);




const handleConfirm = () => {

  if (processing) return;

  if (pin !== "1234") {
    setError("Incorrect Transaction PIN");
    return;
  }




  setError("");

  setProcessing(true);



  setTimeout(() => {

    const result = transferMoney({

  accountNumber,

  amount,

  narration,

});

setProcessing(false);

if (result.success) {

  setSuccess(true);

} else {

  setError(result.message);

}

  }, 2500);

};


if (success) {

  return (

    <TransferReceipt
      recipient={recipient}
      accountNumber={accountNumber}
      amount={amount}
      narration={narration}
      onClose={onClose}
    />

  );

}

  return (
    
    

    <div className="modal-overlay">

      <div className="pin-modal">

        <FaLock className="lock-icon" />

        <h2>Transaction PIN</h2>

        <p>

          Enter your 4-digit transaction PIN

        </p>

        <div className="pin-input-wrapper">

          <input

            type={showPin ? "text" : "password"}

            maxLength="4"

            value={pin}

            onChange={(e) => {

              const value = e.target.value;

              if (/^\d*$/.test(value)) {

                setPin(value);

              }

            }}

            placeholder="****"

          />

          <button

            type="button"

            className="eye-btn"

            onClick={() => setShowPin(!showPin)}

          >

            {showPin ? <FaEyeSlash /> : <FaEye />}

          </button>

        </div>

        {error && (

          <p className="pin-error">

            {error}

          </p>

        )}




        {processing && (

<p>

Processing Transfer...

</p>

)}




        <div className="pin-buttons">

          <button

            className="cancel-btn"

            onClick={onClose}

          >

            Cancel

          </button>

          <button
  className="confirm-btn"
  onClick={handleConfirm}
  disabled={processing}
>
  {processing ? "Processing..." : "Confirm"}
</button>

        </div>

      </div>

    </div>

  );

};

export default PinModal;