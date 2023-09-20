import React from "react";
import { checkLoginStatus } from "./utils";
import { Redirect } from "react-router-dom";

export function withAuth(Component: any) {
  return class extends React.Component {
    render() {
      const isLoggedIn = checkLoginStatus();

      if (!isLoggedIn) {
        // Wenn der Benutzer nicht eingeloggt ist, leite ihn zur Login-Seite weiter
        return <Redirect to="/login" />;
      }

      // Wenn der Benutzer eingeloggt ist, zeige die Komponente
      return <Component {...this.props} />;
    }
  };
}
export function generateRandomPassword() {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
