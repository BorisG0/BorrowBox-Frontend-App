import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BorrowItem from "../components/BorrowItem";
import { useState, useEffect } from "react";
import { fetchUserItemData } from "../apiService";

const MyItemsTab: React.FC<{
  loginToken: any;
}> = ({ loginToken }) => {
  const [items, setItems] = useState([] as any[]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const itemData = await fetchUserItemData();
        setItems(itemData.data.items);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItems();
  }, []);

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
        {items.map((item, index) => (
          <BorrowItem
            item={item}
            key={index}
            loginToken={loginToken}
            isFunctionStartRental={false}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MyItemsTab;
