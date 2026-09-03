import { useContext } from "react";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import BalanceCard from "../../components/dashboard/BalanceCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import NotificationCard from "../../components/dashboard/NotificationCard";
import SpendingSummary from "../../components/dashboard/SpendingSummary";

import "./Dashboard.css";

import { BankContext } from "../../context/BankContext";

const Dashboard = () => {

  const { currentUser } = useContext(BankContext);

  
  return (
    <div className="dashboard">

      <DashboardHeader />

      <main className="dashboard-content">

        <div className="dashboard-grid">

          <div className="left-column">

            <BalanceCard />

            <QuickActions />

          </div>

          <div className="right-column">

            <NotificationCard />

            <SpendingSummary />

          </div>

        </div>

        <RecentTransactions />

      </main>

    </div>
  );
};

export default Dashboard;