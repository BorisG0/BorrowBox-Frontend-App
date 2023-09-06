import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

// Definieren Sie den Typ für das 'component' Prop
interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  // Fügen Sie hier weitere Props hinzu, die Sie benötigen könnten
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, ...args }) => {
  return <Route component={withAuthenticationRequired(component)} {...args} />;
};

export default ProtectedRoute;
