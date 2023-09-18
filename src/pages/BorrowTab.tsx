import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import BorrowItem from "../components/BorrowItem";
import AddItemModal from "../components/AddItemModal";
import { useEffect, useState } from "react";
import { fetchItemData, fetchUserById } from "../apiService";
import { add } from "ionicons/icons";
import { checkLoginStatus } from "../data/utils";

const BorrowTab: React.FC<{
  loginToken: any;
  setLoginToken: (authenticated: any) => void;
}> = ({ loginToken, setLoginToken }) => {
  const [allItems, setAllItems] = useState([] as any[]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [userRole, setUserRole] = useState();

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const modalOncklick = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    async function fetchItems() {
      try {
        const loginTokenData = checkLoginStatus();
        if (loginTokenData) {
          setLoginToken(loginTokenData);
        }
        const userData = await fetchUserById(loginTokenData);
        const itemData = await fetchItemData();
        setUserRole(userData.data.role);
        setAllItems(itemData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchItems();
  }, []);
  

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Borrow</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar
          placeholder="Suchen"
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
        />
        {userRole === "admin" && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={modalOncklick}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}
        {filteredItems.map((item, index) => (
          <BorrowItem
            item={item}
            key={index}
            loginToken={loginToken}
            isFunctionStartRental={true}
          />
        ))}
        {/* Bedingtes Rendern des Modals basierend auf showModal-Zustand */}
        {showModal && <AddItemModal onClose={() => setShowModal(false)} />}
      </IonContent>
    </IonPage>
  );
};

export default BorrowTab;
