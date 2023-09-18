import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BorrowItem from "../components/BorrowItem";

const MyItemsTab: React.FC<{
  myItems: any[];
  returnItem: (item: any) => void;
  loginToken: any;
}> = ({ myItems, returnItem, loginToken }) => {
  if (!loginToken) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonHeader>
            <IonToolbar>
              <IonTitle>My Items</IonTitle>
            </IonToolbar>
          </IonHeader>
          {/* TODO: Schön machen */}
          <div>Bitte melden Sie sich an, um diese Seite anzuzeigen.</div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>My Items</IonTitle>
          </IonToolbar>
        </IonHeader>
        {myItems.map((item, index) => (
          <BorrowItem
            item={item}
            key={index}
            loginToken={loginToken}
            itemActionText="zurückgeben"
            isFunctionStartRental={true}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MyItemsTab;
