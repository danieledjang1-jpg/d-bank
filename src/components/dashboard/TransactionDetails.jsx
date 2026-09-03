import {
  FaCheckCircle,
  FaTimes,
  FaUser,
  FaMoneyBillWave,
  FaFileAlt,
  FaCalendarAlt,
  FaHashtag,
  FaUniversity,
} from "react-icons/fa";

import "./TransactionDetails.css";

const TransactionDetails = ({
  transaction,
  onClose,
}) => {

  return (

    <div className="transaction-modal-overlay">

      <div className="transaction-details-card">

        {/* Close Button */}

        <button
          className="transaction-close-btn"
          onClick={onClose}
        >
          <FaTimes />
        </button>


        {/* Success Icon */}

        <FaCheckCircle className="transaction-success-icon" />


        <h2>Transfer Successful</h2>

        <p className="transaction-subtitle">
          Your transfer was completed successfully.
        </p>


        {/* Amount */}

        <div className="transaction-amount">

          <span>Amount</span>

          <h1>
            ₦{transaction.amount.toLocaleString()}
          </h1>

        </div>


        {/* Transaction Information */}

        <div className="transaction-details-list">


          <div className="transaction-detail">

            <FaUser />

            <div>

              <small>Recipient</small>

              <strong>
                {transaction.name}
              </strong>

            </div>

          </div>


          <div className="transaction-detail">

            <FaUniversity />

            <div>

              <small>Account Number</small>

              <strong>
                {transaction.accountNumber}
              </strong>

            </div>

          </div>


          <div className="transaction-detail">

            <FaFileAlt />

            <div>

              <small>Narration</small>

              <strong>
                {transaction.description}
              </strong>

            </div>

          </div>


          <div className="transaction-detail">

            <FaCalendarAlt />

            <div>

              <small>Date</small>

              <strong>
                {transaction.date}
              </strong>

            </div>

          </div>


          <div className="transaction-detail">

            <FaHashtag />

            <div>

              <small>Reference</small>

              <strong>
                {transaction.reference}
              </strong>

            </div>

          </div>


          <div className="transaction-detail">

            <FaMoneyBillWave />

            <div>

              <small>Status</small>

              <strong className="transaction-status">
                {transaction.status}
              </strong>

            </div>

          </div>


        </div>


        {/* Close Button */}

        <button
          className="transaction-done-btn"
          onClick={onClose}
        >
          Done
        </button>

      </div>

    </div>

  );

};

export default TransactionDetails;