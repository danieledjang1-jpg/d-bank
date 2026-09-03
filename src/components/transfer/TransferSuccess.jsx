import "./TransferSuccess.css";

import { FaCheckCircle } from "react-icons/fa";

const TransferSuccess = ({ onClose }) => {

  return (

    <div className="modal-overlay">

      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h2>

          Transfer Successful

        </h2>

        <p>

          Your transfer has been completed successfully.

        </p>

        <button

          className="done-btn"

          onClick={onClose}

        >

          Done

        </button>

      </div>

    </div>

  );

};

export default TransferSuccess;