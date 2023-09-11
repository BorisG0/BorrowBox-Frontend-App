import React, { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

interface Auth0ProviderWithHistoryProps {
  children: ReactNode;
}

const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({
  children,
}) => {
  return (
    <Auth0Provider
      domain="dev-535u7n812tgoxlkg.us.auth0.com"
      clientId="j3sh9GU6SkUGnHKLm5tGaNNDiQ9k5VZl"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
