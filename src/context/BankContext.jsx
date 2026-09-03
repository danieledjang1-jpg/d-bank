import { createContext, useState } from "react";
import mockUser from "../constants/mockUser";
import mockUsers from "../constants/mockUsers";

export const BankContext = createContext();

const BankProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(mockUser);

  const [users, setUsers] = useState(mockUsers);

  const [transactions, setTransactions] = useState([]);

  const [savingsGoals, setSavingsGoals] = useState([]);

 const [notifications, setNotifications] = useState([]);



 const [card, setCard] = useState({
  cardNumber: "5399830000000000",
  expiryDate: "12/29",
  cvv: "123",
  status: "Active",
});





  const transferMoney = ({
    accountNumber,
    amount,
    narration,
  }) => {

    const transferAmount = Number(amount);

    const recipient = users.find(
      (user) => user.accountNumber === accountNumber
    );

    if (!recipient) {
      return {
        success: false,
        message: "Recipient not found.",
      };
    }

    if (transferAmount > currentUser.balance) {
      return {
        success: false,
        message: "Insufficient balance.",
      };
    }

    const updatedSender = {
      ...currentUser,
      balance: currentUser.balance - transferAmount,
    };

    const updatedUsers = users.map((user) => {

      if (user.accountNumber === accountNumber) {

        return {
          ...user,
          balance: user.balance + transferAmount,
        };

      }

      return user;

    });

   const newTransaction = {
  id: Date.now(),

  name: recipient.fullName,

  accountNumber,

  amount: transferAmount,

  description: narration || "Transfer",

  narration: narration || "None",

  date: new Date().toLocaleString(),

  reference:
    "DB" + Math.floor(Math.random() * 1000000000),

  type: "debit",

  status: "Successful",
};

const newNotification = {
  id: Date.now(),

  title: "Transfer Successful",

  message: `You sent ₦${transferAmount.toLocaleString()} to ${recipient.fullName}.`,

  time: "Just now",
};


    setCurrentUser(updatedSender);
    setUsers(updatedUsers);
    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);

    setNotifications((prev) => [
  newNotification,
  ...prev,
]);

    return {
      success: true,
      transaction: newTransaction,
    };

  };




 const depositMoney = (amount) => {

  const depositAmount = Number(amount);

  if (!depositAmount || depositAmount <= 0) {
    return {
      success: false,
      message: "Invalid deposit amount.",
    };
  }

  const updatedUser = {
    ...currentUser,
    balance: currentUser.balance + depositAmount,
  };

  const newTransaction = {
    id: Date.now(),
    name: "D-BANK Deposit",
    description: "Money deposited into your account",
    amount: depositAmount,
    date: new Date().toLocaleString(),
    status: "Completed",
    type: "credit",
  };

  const newNotification = {
    id: Date.now() + 1,

    title: "Deposit Successful",

    message: `₦${depositAmount.toLocaleString()} was added to your D-BANK account.`,

    time: "Just now",
  };

  setCurrentUser(updatedUser);

  setTransactions((prev) => [
    newTransaction,
    ...prev,
  ]);

  setNotifications((prev) => [
    newNotification,
    ...prev,
  ]);

  return {
    success: true,
    transaction: newTransaction,
  };
};





const createSavingsGoal = ({
  name,
  targetAmount,
}) => {

  const target = Number(targetAmount);

  if (!name || !target || target <= 0) {
    return {
      success: false,
      message: "Invalid savings goal.",
    };
  }

  const newGoal = {
    id: Date.now(),
    name,
    targetAmount: target,
    savedAmount: 0,
    createdAt: new Date().toLocaleString(),
  };

  setSavingsGoals((prev) => [
    newGoal,
    ...prev,
  ]);

  return {
    success: true,
    goal: newGoal,
  };
};








// const addMoneyToSavings = ({
//   goalId,
//   amount,
// }) => {

  const addMoneyToSavings = ({
  goalId,
  amount,
}) => {

  const savingsAmount = Number(amount);

  if (!savingsAmount || savingsAmount <= 0) {
    return {
      success: false,
      message: "Invalid amount.",
    };
  }

  if (savingsAmount > currentUser.balance) {
    return {
      success: false,
      message: "Insufficient balance.",
    };
  }

  const goal = savingsGoals.find(
    (item) => item.id === goalId
  );

  if (!goal) {
    return {
      success: false,
      message: "Savings goal not found.",
    };
  }

  const remainingTarget =
    goal.targetAmount - goal.savedAmount;

  if (savingsAmount > remainingTarget) {
    return {
      success: false,
      message:
        "Amount is greater than the remaining savings target.",
    };
  }

  const updatedUser = {
    ...currentUser,
    balance:
      currentUser.balance - savingsAmount,
  };

  const updatedGoals = savingsGoals.map(
    (item) => {

      if (item.id === goalId) {

        return {
          ...item,
          savedAmount:
            item.savedAmount + savingsAmount,
        };

      }

      return item;

    }
  );

  // Create ONE savings transaction
  const newTransaction = {
    id: Date.now(),

    name: goal.name,

    amount: savingsAmount,

    description:
      `Money added to ${goal.name}`,

    narration:
      `Savings deposit to ${goal.name}`,

    date: new Date().toLocaleString(),

    reference:
      "DB" + Math.floor(
        Math.random() * 1000000000
      ),

    type: "debit",

    status: "Successful",
  };

  // Create ONE notification
  const newNotification = {
    id: Date.now() + 1,

    title: "Savings Updated",

    message:
      `₦${savingsAmount.toLocaleString()} was added to ${goal.name}.`,

    time: "Just now",
  };

  setCurrentUser(updatedUser);

  setSavingsGoals(updatedGoals);

  setTransactions((prev) => [
    newTransaction,
    ...prev,
  ]);

  setNotifications((prev) => [
    newNotification,
    ...prev,
  ]);

  return {
    success: true,
    transaction: newTransaction,
  };
};










const toggleCardFreeze = () => {

  setCard((prev) => ({
    ...prev,
    status:
      prev.status === "Active"
        ? "Frozen"
        : "Active",
  }));

};





const makeCardPayment = ({
  amount,
  merchant,
}) => {

  const paymentAmount = Number(amount);

  if (!paymentAmount || paymentAmount <= 0) {
    return {
      success: false,
      message: "Invalid payment amount.",
    };
  }

  if (card.status === "Frozen") {
    return {
      success: false,
      message: "Your card is frozen.",
    };
  }

  if (paymentAmount > currentUser.balance) {
    return {
      success: false,
      message: "Insufficient balance.",
    };
  }

  const updatedUser = {
    ...currentUser,
    balance:
      currentUser.balance - paymentAmount,
  };

  const newTransaction = {
    id: Date.now(),

    name: merchant,

    amount: paymentAmount,

    description:
      `Card payment to ${merchant}`,

    narration:
      `Payment made with D-BANK card`,

    date: new Date().toLocaleString(),

    reference:
      "DB" +
      Math.floor(
        Math.random() * 1000000000
      ),

    type: "debit",

    status: "Successful",
  };

  const newNotification = {
    id: Date.now() + 1,

    title: "Card Payment",

    message:
      `₦${paymentAmount.toLocaleString()} payment made to ${merchant}.`,

    time: "Just now",
  };

  setCurrentUser(updatedUser);

  setTransactions((prev) => [
    newTransaction,
    ...prev,
  ]);

  setNotifications((prev) => [
    newNotification,
    ...prev,
  ]);

  return {
    success: true,
    transaction: newTransaction,
  };

};







  return (
 <BankContext.Provider
  value={{
    currentUser,
    users,
    transactions,
    savingsGoals,
    notifications,
    transferMoney,
    depositMoney,
    createSavingsGoal,
    addMoneyToSavings,
    card,
    toggleCardFreeze,
    makeCardPayment,
  }}
>
      {children}
    </BankContext.Provider>
  );

};

export default BankProvider;