import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BorrowItem from "../components/BorrowItem";
import { useState, useEffect } from "react";
import { fetchUserItemData } from "../apiService";
import { checkLoginStatus } from "../data/utils";

const MyItemsTab: React.FC<{}> = () => {
  const [items, setItems] = useState([] as any[]);
  const [responseCode, setResponseCode] = useState(500);


  useEffect(() => {
    async function fetchItems() {
      try {
        const itemData = await fetchUserItemData();
        setItems(itemData.data.items);
        setResponseCode(itemData.status)
      } catch (error: any) {
        if (error.response.data.message != "No documents found") {
          console.log(error);
        }
      }
    }
    fetchItems();
  }, []);

  if (!checkLoginStatus()) {
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
        {responseCode === 204 ?
        <div>
          <p>Keine Items vorhanden, gerne kannst du nach neuen Items suchen!</p>
          <IonButton routerLink={`/borrow`}>Neue Items finden</IonButton>
          </div> :
          <>
            {items.map((item, index) => (
              <BorrowItem
                item={item}
                key={index}
                isFunctionStartRental={false}
              />
            ))}
          </>
        }
      </IonContent>
    </IonPage>
  );
};

export default MyItemsTab;
