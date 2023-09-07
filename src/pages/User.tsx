import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonText,
  IonButton,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import {
  personCircle,
  informationCircle,
  filterCircle,
  settings,
} from "ionicons/icons";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

const UserProfile: React.FC = () => {
  const {isAuthenticated} = useAuth0();
  // user name
  const { user } = useAuth0();
  if(!isAuthenticated){

    return(
      <IonPage>
        <IonContent>
      <div>
        no login
        <LoginButton/>
      </div>
      </IonContent>
    </IonPage>
      )
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
            <h2>{user?.name}</h2>
            <h3>{user?.email}</h3>
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
        <LogoutButton/>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
