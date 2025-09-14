import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ContractsProvider } from "./contexts/ContractsContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContractsProvider>
          <App />
        </ContractsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

