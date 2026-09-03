import "./Transfer.css";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import TransferForm from "../../components/transfer/TransferForm";

const Transfer = () => {
  return (
    <div className="transfer-page">

      <DashboardHeader />

      <main className="transfer-container">

        <TransferForm />

      </main>

    </div>
  );
};

export default Transfer;