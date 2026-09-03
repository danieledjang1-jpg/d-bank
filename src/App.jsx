import { BrowserRouter, Routes, Route } from "react-router-dom";



import Login from "./pages/Login/Login";

import Signup from "./pages/Signup/Signup";

import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import Dashboard from "./pages/Dashboard/Dashboard";

import Transfer from "./pages/Transfer/Transfer";




import Deposit from "./pages/Deposit/Deposit";
import Savings from "./pages/Savings/Savings";
import Cards from "./pages/Cards/Cards";



function App() {
  return (


    
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/dashboard"
  element={<Dashboard />}
/>

<Route
    path="/transfer"
    element={<Transfer />}
/>




<Route
  path="/deposit"
  element={<Deposit />}
/>

<Route
  path="/savings"
  element={<Savings />}
/>

<Route
  path="/cards"
  element={<Cards />}
/>

      </Routes>

    </BrowserRouter>


  );
}

export default App;

