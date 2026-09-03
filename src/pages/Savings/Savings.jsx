import { useState, useContext } from "react";

import {
  FaPiggyBank,
  FaBullseye,
  FaArrowRight,
} from "react-icons/fa";


import { BankContext } from "../../context/BankContext";

import "./Savings.css";

const Savings = () => {

const {
  currentUser,
  createSavingsGoal,
  savingsGoals,
  addMoneyToSavings,
} = useContext(BankContext);

  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");


  const [targetError, setTargetError] = useState("");


  const [showConfirmation, setShowConfirmation] = useState(false);


  const [goalCreated, setGoalCreated] = useState(false);


  const [selectedGoal, setSelectedGoal] = useState(null);
  const [savingsAmount, setSavingsAmount] = useState("");
  const [savingsError, setSavingsError] = useState("");

  const [savingsSuccess, setSavingsSuccess] = useState(null);

  const [detailsGoal, setDetailsGoal] = useState(null);

  const formatCurrency = (value) => {

    if (!value) return "";

    return Number(value).toLocaleString("en-NG");

  };

  return (

    <div className="savings-page">

      <div className="savings-card">

        <div className="savings-icon">
          <FaPiggyBank />
        </div>

        <h1>Create Savings Goal</h1>

        <p className="savings-subtitle">
          Set a goal and start saving towards it.
        </p>

        <label>
          Savings Goal
        </label>

        <input
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="e.g. Emergency Fund"
        />

        <label>
          Target Amount
        </label>

       <input
  type="text"
  value={formatCurrency(targetAmount)}
  onChange={(e) => {

    const rawValue =
      e.target.value.replace(/,/g, "");

    if (!/^\d*$/.test(rawValue)) {
      return;
    }

    setTargetAmount(rawValue);

    const value = Number(rawValue);

    if (rawValue === "") {

      setTargetError("");

    } else if (value <= 0) {

      setTargetError(
        "Target amount must be greater than ₦0"
      );

    } else {

      setTargetError("");

    }

  }}
  placeholder="₦0.00"
/>


{targetError && (

  <p className="savings-error">
    {targetError}
  </p>

)}


        <div className="savings-goal-preview">

          <FaBullseye />

          <div>

            <small>Goal Preview</small>

            <strong>
              {goalName || "Your Savings Goal"}
            </strong>

            <span>
              Target: ₦
              {targetAmount
                ? Number(targetAmount).toLocaleString("en-NG")
                : "0"}
            </span>

          </div>

        </div>

       <button
  className="savings-continue-btn"
  disabled={
    !goalName ||
    !targetAmount ||
    targetError
  }
  onClick={() => setShowConfirmation(true)}
>
  Continue

  <FaArrowRight />
</button>


{showConfirmation && (

  <div className="savings-confirmation">

    <h2>Confirm Savings Goal</h2>

    <p>
      You are creating the following savings goal:
    </p>

    <div className="confirmation-details">

      <div>
        <small>Goal</small>
        <strong>{goalName}</strong>
      </div>

      <div>
        <small>Target Amount</small>
        <strong>
          ₦{Number(targetAmount).toLocaleString("en-NG")}
        </strong>
      </div>

    </div>

    <div className="confirmation-buttons">

      <button
        className="cancel-savings-btn"
        onClick={() => setShowConfirmation(false)}
      >
        Back
      </button>

     <button
  className="confirm-savings-btn"
  onClick={() => {

    const result = createSavingsGoal({
      name: goalName,
      targetAmount: targetAmount,
    });

   if (result.success) {

  setSavingsSuccess({
    amount: Number(savingsAmount),
    goalName: selectedGoal.name,
    goalId: selectedGoal.id,
  });

  setSelectedGoal(null);
  setSavingsAmount("");
  setSavingsError("");

} else {

  setSavingsError(result.message);

}

  }}
>
  Create Goal
</button>

    </div>

  </div>

)}




{goalCreated && (

  <div className="savings-success">

    <h2>Savings Goal Created 🎉</h2>

    <p>
      Your savings goal has been successfully created.
    </p>

    <strong>
      {goalName}
    </strong>

    <span>
      Target: ₦
      {Number(targetAmount).toLocaleString("en-NG")}
    </span>

  </div>

)}




{savingsGoals.length > 0 && (

  <div className="savings-goals-section">

    <h2>Your Savings Goals</h2>

    <div className="savings-goals-list">

      {savingsGoals.map((goal) => (

        <div
          className="savings-goal-card"
          key={goal.id}
        >

          <div className="goal-card-icon">
            <FaPiggyBank />
          </div>

          <div className="goal-card-info">

            <h3>
              {goal.name}
            </h3>

            <p>
              ₦{goal.savedAmount.toLocaleString("en-NG")}
              {" / "}
              ₦{goal.targetAmount.toLocaleString("en-NG")}
            </p>

            <div className="goal-progress">

              <div
                className="goal-progress-bar"
                style={{
                  width: `${
                    Math.min(
                      (goal.savedAmount /
                        goal.targetAmount) *
                        100,
                      100
                    )
                  }%`,
                }}
              />

            </div>




            {goal.savedAmount >= goal.targetAmount && (

  <p className="goal-completed-message">
    🎉 Savings goal completed!
  </p>

)}




          </div>

          <span className="goal-percentage">

            {Math.min(
              Math.round(
                (goal.savedAmount /
                  goal.targetAmount) *
                  100
              ),
              100
            )}%

          </span>


     <button
  className="view-goal-details-btn"
  onClick={() => setDetailsGoal(goal)}
>
  View Details
</button>




{goal.savedAmount < goal.targetAmount ? (

  <button
    className="add-money-btn"
    onClick={() => {
      setSelectedGoal(goal);
      setSavingsAmount("");
      setSavingsError("");
    }}
  >
    Add Money
  </button>

) : (

  <span className="goal-completed-badge">
    ✓ Completed
  </span>

)}


        </div>

      ))}

    </div>





{selectedGoal && (

  <div className="add-money-panel">

    <h3>
      Add Money to {selectedGoal.name}
    </h3>

    <p>
      Available balance: ₦
      {currentUser.balance.toLocaleString("en-NG")}
    </p>

    <input
      type="text"
      value={
        savingsAmount
          ? Number(savingsAmount).toLocaleString("en-NG")
          : ""
      }
      onChange={(e) => {

        const rawValue =
          e.target.value.replace(/,/g, "");

        if (!/^\d*$/.test(rawValue)) {
          return;
        }

        setSavingsAmount(rawValue);
        setSavingsError("");

      }}
      placeholder="₦0"
    />

    {savingsError && (

      <p className="savings-error">
        {savingsError}
      </p>

    )}

    <div className="add-money-buttons">

      <button
        className="cancel-money-btn"
        onClick={() => {
          setSelectedGoal(null);
          setSavingsAmount("");
          setSavingsError("");
        }}
      >
        Cancel
      </button>

      <button
        className="confirm-money-btn"
        onClick={() => {

          const result = addMoneyToSavings({
            goalId: selectedGoal.id,
            amount: savingsAmount,
          });

          if (result.success) {

            setSelectedGoal(null);
            setSavingsAmount("");
            setSavingsError("");

          } else {

            setSavingsError(result.message);

          }

        }}
      >
        Add Money
      </button>

    </div>

  </div>

)}











{savingsSuccess && (

  <div className="savings-deposit-success">

    <div className="success-check">
      ✓
    </div>

    <h2>
      Savings Updated
    </h2>

    <p>
      ₦{savingsSuccess.amount.toLocaleString("en-NG")}
      {" "}was added to
      {" "}
      <strong>
        {savingsSuccess.goalName}
      </strong>
    </p>

    <span>
      Your savings deposit was successful.
    </span>

    <button
      className="success-done-btn"
      onClick={() => setSavingsSuccess(null)}
    >
      Done
    </button>

  </div>

)}







{detailsGoal && (

  <div className="savings-details-panel">

    <button
      className="close-details-btn"
      onClick={() => setDetailsGoal(null)}
    >
      ×
    </button>

    <div className="details-icon">
      <FaPiggyBank />
    </div>

    <h2>
      {detailsGoal.name}
    </h2>

    <p className="details-status">
      {detailsGoal.savedAmount >= detailsGoal.targetAmount
        ? "🎉 Goal Completed"
        : "Savings in Progress"}
    </p>

    <div className="details-amount">

      <span>Saved</span>

      <strong>
        ₦{detailsGoal.savedAmount.toLocaleString("en-NG")}
      </strong>

    </div>

    <div className="details-target">

      <span>Target Amount</span>

      <strong>
        ₦{detailsGoal.targetAmount.toLocaleString("en-NG")}
      </strong>

    </div>

    <div className="details-remaining">

      <span>Remaining</span>

      <strong>
        ₦{Math.max(
          detailsGoal.targetAmount -
          detailsGoal.savedAmount,
          0
        ).toLocaleString("en-NG")}
      </strong>

    </div>

    <div className="details-progress">

      <div
        className="details-progress-bar"
        style={{
          width: `${
            Math.min(
              (detailsGoal.savedAmount /
                detailsGoal.targetAmount) *
                100,
              100
            )
          }%`,
        }}
      />

    </div>

    <p className="details-percentage">

      {Math.min(
        Math.round(
          (detailsGoal.savedAmount /
            detailsGoal.targetAmount) *
            100
        ),
        100
      )}% completed

    </p>

    <p className="details-created">

      Created: {detailsGoal.createdAt}

    </p>

  </div>

)}





  </div>

)}




      </div>

    </div>

  );

};

export default Savings;