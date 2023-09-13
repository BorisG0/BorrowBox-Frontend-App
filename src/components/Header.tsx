import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { person } from "ionicons/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface HeaderProps extends RouteComponentProps {}

const Header: React.FC<HeaderProps & { loginToken: any }> = ({
  history,
  loginToken,
}) => {
  const handleUserIconClick = () => {
    if (loginToken) {
      history.push("/user");
    } else {
      history.push("/login");
    }
  };
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Borrow Box</IonTitle>
        <IonButtons slot="end">
          <IonButton
            onClick={handleUserIconClick}
            style={{ marginRight: "1rem" }}
          >
            <IonIcon icon={person} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default withRouter(Header);
