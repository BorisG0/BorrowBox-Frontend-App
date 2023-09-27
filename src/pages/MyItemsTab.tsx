import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import BorrowItem from "../components/BorrowItem";
import { useState, useEffect } from "react";
import { fetchUserItemData } from "../apiService";
import { checkLoginStatus } from "../data/utils";
import EmptyPage from "../components/EmptyPage";

const MyItemsTab: React.FC<{}> = () => {
  const [items, setItems] = useState([] as any[]);
  const [responseCode, setResponseCode] = useState(500);

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

  useEffect(() => {
    fetchItems();
  }, []);

  useIonViewWillEnter(() => {
    fetchItems();
  })

  if (!checkLoginStatus()) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonHeader>
            <IonToolbar>
              <IonTitle>My Items</IonTitle>
            </IonToolbar>
          </IonHeader>
          <EmptyPage message="Bitte melde dich an, um deine Items zu sehen." />
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
          <EmptyPage message="Du hast keine Items im ausgeliehenen Zusatand" />
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
