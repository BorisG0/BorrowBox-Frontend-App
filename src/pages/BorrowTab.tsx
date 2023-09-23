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
  IonChip,
} from "@ionic/react";
import BorrowItem from "../components/BorrowItem";
import AddItemModal from "../components/AddItemModal";
import { useEffect, useState } from "react";
import { fetchItemData, fetchCurrentUser, fetchTags } from "../apiService";
import { add } from "ionicons/icons";
import { checkLoginStatus } from "../data/utils";
import { Tag } from "../data/tag";

const BorrowTab: React.FC<{}> = () => {
  const [allItems, setAllItems] = useState([] as any[]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [userRole, setUserRole] = useState();
  const [filterTags, setFilterTags] = useState([] as Tag[]);
  const [showAvailable, setShowAvailable] = useState(false);

  const itemIncludesSelectedTag = (item: any) => {
    for (const tag of filterTags) {
      if (tag.selected && !item.tags.includes(tag.name)) {
        return false;
      }
    }
    return true;
  };

  const filteredItems = allItems.filter((item) =>
    //check if item has the name searched for
    item.name.toLowerCase().includes(searchText.toLowerCase())
    //check if item has a tag that is selected from the filter
    && itemIncludesSelectedTag(item)
    //check if item is available
    && (showAvailable ? item.available : true)
  );

  const modalOncklick = () => {
    setShowModal(!showModal);
  };

  const toggleTag = (tag: Tag) => {
    tag.selected = !tag.selected;
    setFilterTags([...filterTags]);
  };

  const toggleShowAvailable = () => {
    setShowAvailable(!showAvailable);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const loginTokenData = checkLoginStatus();
        if (loginTokenData) {
          const userData = await fetchCurrentUser();
          setUserRole(userData.data.role);
        }
        const itemData = await fetchItemData();
        setAllItems(itemData.data);

        const tagData = await fetchTags(null);
        setFilterTags(tagData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
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
        <IonChip onClick={toggleShowAvailable} color={showAvailable ? "primary" : ""}>Verfügbar</IonChip>
        {filterTags.map((tag, index) => (
          <IonChip
            key={index}
            onClick={() => toggleTag(tag)}
            color={tag.selected ? "primary" : ""}
          >
            {tag.name}
          </IonChip>
        ))}
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
