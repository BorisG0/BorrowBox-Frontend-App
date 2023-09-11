import React, { useContext } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, NavContext } from '@ionic/react';
import { person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

const Header: React.FC = () => {
  const history = useHistory();
  const { navigate } = useContext(NavContext);

  const handleUserIconClick = () => {
    navigate("/user", "forward", "push");
};

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Borrow Box</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={handleUserIconClick} style={{ marginRight: '1rem' }}>
            <IonIcon icon={person} />
          </IonButton>
          <LoginButton/>
          <LogoutButton/>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
