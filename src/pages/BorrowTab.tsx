import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';

const BorrowTab: React.FC<{
    availableItems: any[],
    borrowItem: (item: any) => void,
  }> = ({ availableItems, borrowItem }) => {

  return (
    <IonPage>
      <IonContent fullscreen>
        {availableItems.map((item, index) =>
            <BorrowItem item={item} itemAction={borrowItem} key={index}/>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BorrowTab;
