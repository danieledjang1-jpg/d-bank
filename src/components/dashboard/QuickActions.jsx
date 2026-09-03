import "./QuickActions.css";

import { useNavigate } from "react-router-dom";

import {
  FaExchangeAlt,
  FaWallet,
  FaPiggyBank,
  FaCreditCard,
} from "react-icons/fa";

const QuickActions = () => {

  const navigate = useNavigate();

  const actions = [

    {
      title: "Transfer",
      icon: <FaExchangeAlt />,
    },

    {
      title: "Deposit",
      icon: <FaWallet />,
    },

    {
      title: "Savings",
      icon: <FaPiggyBank />,
    },

    {
      title: "Cards",
      icon: <FaCreditCard />,
    },

  ];

  return (

    <section className="quick-actions">

      <h2>Quick Actions</h2>

      <div className="actions-grid">

        {actions.map((action, index) => (

         <div
  key={index}
  className="action-card"

  onClick={() => {

  if (action.title === "Transfer") {
    navigate("/transfer");
  }

  if (action.title === "Deposit") {
    navigate("/deposit");
  }

  if (action.title === "Savings") {
    navigate("/savings");
  }

  if (action.title === "Cards") {
    navigate("/cards");
  }

}}
>

            <div className="action-icon">

              {action.icon}

            </div>

            <h3>{action.title}</h3>

          </div>

        ))}

      </div>

    </section>

  );

};

export default QuickActions;