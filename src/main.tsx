import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("root");
const root = createRoot(container!);
console.log(import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
