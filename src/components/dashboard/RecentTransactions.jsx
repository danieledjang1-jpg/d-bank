import { useContext, useState } from "react";




import { BankContext } from "../../context/BankContext";

import TransactionDetails from "./TransactionDetails";


import "./RecentTransactions.css";



import {
  FaArrowDown,
  FaArrowUp,
  FaChevronRight,
} from "react-icons/fa";



const RecentTransactions = () => {

  const { transactions } = useContext(BankContext);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [transactionType, setTransactionType] = useState("all");

  const filteredTransactions = transactions.filter(
  (transaction) => {

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      transaction.name?.toLowerCase().includes(search) ||
      transaction.accountNumber?.includes(search) ||
      transaction.description?.toLowerCase().includes(search);

    const matchesType =
      transactionType === "all" ||
      transaction.type === transactionType;

    return matchesSearch && matchesType;

  }
);

  return (

    <section className="transactions-section">

      <div className="transactions-header">

        <h2>Recent Transactions</h2>

       <div className="transaction-filters">

  <div className="transaction-search">

    <input
      type="text"
      placeholder="Search transactions..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />

  </div>

  <select
    value={transactionType}
    onChange={(e) =>
      setTransactionType(e.target.value)
    }
  >

    <option value="all">
      All Types
    </option>

    <option value="debit">
      Debit
    </option>

    <option value="credit">
      Credit
    </option>

  </select>

</div>

        <button>

          View All

        </button>

      </div>

      

     <div className="transactions-list">

  {transactions.length === 0 ? (

    <p className="empty-transactions">
      No transactions yet.
    </p>




) : filteredTransactions.length === 0 ? (

    <div className="empty-transactions">

      <h3>No transactions found</h3>

      <p>
        Try a different search or filter.
      </p>

    </div>





  ) : (

   filteredTransactions.map((transaction) => (

     <div
  key={transaction.id}
  className="transaction-card"
  onClick={() => setSelectedTransaction(transaction)}
>

        <div className="transaction-left">

          <div className="transaction-icon">

            {transaction.type === "credit" ? (

              <FaArrowDown />

            ) : (

              <FaArrowUp />

            )}

          </div>

          <div>

            <h4>{transaction.name}</h4>

            <p>{transaction.description}</p>

            <small>{transaction.date}</small>

          </div>

        </div>

        <div className="transaction-right">

          <h4
            className={
              transaction.type === "credit"
                ? "credit"
                : "debit"
            }
          >

            {transaction.type === "credit"
              ? "+"
              : "-"}

            ₦{transaction.amount.toLocaleString()}

          </h4>

          <span>{transaction.status}</span>

          <FaChevronRight className="details-arrow" />

        </div>

      </div>

    ))

  )}

</div>

{selectedTransaction && (

  <TransactionDetails
    transaction={selectedTransaction}
    onClose={() => setSelectedTransaction(null)}
  />

)}

    </section>

  );

};

export default RecentTransactions;