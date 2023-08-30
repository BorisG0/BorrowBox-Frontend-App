import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';

const BorrowTab: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
            <IonToolbar>
                <IonTitle size="large">Tab 3</IonTitle>
            </IonToolbar>
        </IonHeader>

        <BorrowItem/>
      </IonContent>
    </IonPage>
  );
};

export default BorrowTab;
