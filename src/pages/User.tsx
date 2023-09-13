import React, { useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonAvatar,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {
  personCircle,
  informationCircle,
  settings,
  logOut,
} from "ionicons/icons";
import { RouteComponentProps } from "react-router-dom";
import { deleteCookie } from "../data/utils";

interface UserProfileProps extends RouteComponentProps {}

const UserProfile: React.FC<
  UserProfileProps & {
    loginToken: any;
    setLoginToken: (authenticated: any) => void;
  }
> = ({ loginToken, setLoginToken, history }) => {
  useEffect(() => {
    if (!loginToken) {
      // Umleitung auf die Login-Seite, wenn nicht authentifiziert
      history.push("/login");
    }
  }, [loginToken, history]);

  const handleLogOut = () => {
    deleteCookie("loginToken");
    setLoginToken("");
    history.push("/login"); // Umleitung nach dem Abmelden
  };
  if (!loginToken) {
    // Hier einfach 'null' zurückgeben, um nichts anzuzeigen, wenn nicht authentifiziert
    return null;
  }
  return (
    <IonPage>
      <IonContent>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <IonAvatar
            style={{ width: "120px", height: "120px", margin: "0 auto" }}
          >
            <img src="./user.jpg" alt /*  */="Benutzerbild" />
          </IonAvatar>
          <IonText>
          </IonText>
        </div>
        <IonButton expand="full" color="primary">
          <IonIcon icon={personCircle} />
          Persönliche Infos
        </IonButton>
        <IonButton expand="full" color="primary">
          <IonIcon icon={informationCircle} />
          Filter
        </IonButton>
        <IonButton expand="full" color="primary">
          <IonIcon icon={settings} />
          Einstellungen
        </IonButton>
        <IonButton expand="full" color="primary" onClick={handleLogOut}>
          <IonIcon icon={logOut} />
          Log Out
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
