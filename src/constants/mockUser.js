const mockUser = {
  id: 1,

  fullName: "Daniel Edjang",

  email: "daniel@example.com",

  accountNumber: "1023456789",

  balance: 250000,

  savings: 75000,

  monthlyIncome: 320000,

  monthlyExpenses: 70000,

  notifications: 2,

  recentNotifications: [
    {
      id: 1,
      title: "Transfer Successful",
      message: "₦15,000 was sent successfully.",
      time: "2 mins ago",
    },
    {
      id: 2,
      title: "Savings Goal Updated",
      message: "You added ₦10,000 to your savings.",
      time: "Yesterday",
    },
  ],

  transactions: [
    // Keep your existing transactions here
  ],

  cards: [],
};

export default mockUser;