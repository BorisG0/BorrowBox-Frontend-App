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