import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./styles/global.css";
import App from './App.jsx';

import BankProvider from "./context/BankContext";

createRoot(document.getElementById("root")).render(

  <StrictMode>

    <BankProvider>

      <App />

    </BankProvider>

  </StrictMode>

);
