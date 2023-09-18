import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import BorrowItem from "../components/BorrowItem";
import { useEffect, useState } from "react";
import { fetchItemData, fetchUserById } from "../apiService";
import { add } from "ionicons/icons"; // Importieren Sie das Pluszeichen-Icon

const BorrowTab: React.FC<{
  availableItems: any[];
  borrowItem: (item: any) => void;
  loginToken: any;
}> = ({ availableItems, borrowItem, loginToken }) => {
  const [allItems, setAllItems] = useState([] as any[]);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    async function fetchItems() {
      try {
        const itemData = await fetchItemData();
        setAllItems(itemData.data);
        const userData = await fetchUserById(loginToken);
        setUserRole(userData.data.role);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItems();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {availableItems.map((item, index) => (
          <BorrowItem
            item={item}
            key={index}
            loginToken={loginToken}
            isFunctionStartRental={true}
          />
        ))}
        <h1>Alle Items (aus db)</h1>
        {allItems.map((item, index) => (
          <BorrowItem
            item={item}
            key={index}
            loginToken={loginToken}
            isFunctionStartRental={true}
          />
        ))}
        {/* Hier wird das Pluszeichen hinzugefügt */}
        {userRole === "admin" && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BorrowTab;
