import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonAvatar, IonText, IonButton, IonIcon, IonButtons } from '@ionic/react';
import { personCircle, informationCircle, filterCircle, settings } from 'ionicons/icons';

const UserProfile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Benutzerprofil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <IonAvatar style={{ width: '120px', height: '120px', margin: '0 auto' }}>
            <img src="./user.jpg" alt="Benutzerbild" />
          </IonAvatar>
          <IonText>
            <h2>Nutzername</h2>
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
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
