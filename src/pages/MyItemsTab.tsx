import { IonContent, IonPage } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';
import { useAuth0 } from '@auth0/auth0-react';

const MyItemsTab: React.FC<{
  myItems: any[],
  returnItem: (item: any) => void,
  loginToken: any,
}> = ({ myItems, returnItem, loginToken }) => {

  if (!loginToken) {
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
          <BorrowItem item={item} itemAction={returnItem} key={index} itemActionText='zurückgeben' loginToken={loginToken}/>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MyItemsTab;
