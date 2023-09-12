import { IonContent, IonPage } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';
import { useAuth0 } from '@auth0/auth0-react';

const MyItemsTab: React.FC<{
  myItems: any[],
  returnItem: (item: any) => void,
}> = ({ myItems, returnItem }) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <IonPage>
        <IonContent fullscreen>
          {/* TODO: Schön machen */}
          <div>
            Bitte melden Sie sich an, um diese Seite anzuzeigen.
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {myItems.map((item, index) => (
          <BorrowItem item={item} key={index} itemActionText='zurückgeben' isFunctionStartRental={true}/>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MyItemsTab;
