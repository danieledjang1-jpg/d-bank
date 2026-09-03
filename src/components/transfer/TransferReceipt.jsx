import "./TransferReceipt.css";
import { FaCheckCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const TransferReceipt = ({
  recipient,
  amount,
  narration,
  accountNumber,
  onClose,
}) => {

  const reference =
    "DB" + Math.floor(Math.random() * 1000000000);

    const navigate = useNavigate();

  return (

    <div className="modal-overlay">

      <div className="receipt-card">

        <FaCheckCircle className="receipt-icon" />

        <h2>Transfer Successful</h2>

        <p>Your transfer was completed successfully.</p>

        <div className="receipt-details">

          <div>
            <span>Recipient</span>
            <strong>{recipient?.fullName}</strong>
          </div>

          <div>
            <span>Account Number</span>
            <strong>{accountNumber}</strong>
          </div>

          <div>
            <span>Amount</span>
            <strong>
              ₦{Number(amount).toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Narration</span>
            <strong>{narration || "None"}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>{new Date().toLocaleString()}</strong>
          </div>

          <div>
            <span>Reference</span>
            <strong>{reference}</strong>
          </div>

        </div>

       <button
  className="done-btn"
  onClick={() => {
    onClose();
    navigate("/dashboard");
  }}
>
  Done
</button>

      </div>

    </div>

  );

};

export default TransferReceipt;