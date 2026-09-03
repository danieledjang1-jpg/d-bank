import "./SpendingSummary.css";
import mockUser from "../../constants/mockUser";

const SpendingSummary = () => {

  const remaining =
    mockUser.monthlyIncome -
    mockUser.monthlyExpenses;

  return (

    <div className="summary-card">

      <h3>Monthly Summary</h3>

      <div className="summary-row">
        <span>Income</span>
        <strong>
          ₦{mockUser.monthlyIncome.toLocaleString()}
        </strong>
      </div>

      <div className="summary-row">
        <span>Expenses</span>
        <strong>
          ₦{mockUser.monthlyExpenses.toLocaleString()}
        </strong>
      </div>

      <div className="summary-row">
        <span>Remaining</span>
        <strong>
          ₦{remaining.toLocaleString()}
        </strong>
      </div>

    </div>
  );
};

export default SpendingSummary;