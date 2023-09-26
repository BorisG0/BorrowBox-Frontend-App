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
  IonGrid,
  IonRow,
  IonCol,
  useIonViewWillEnter,
} from "@ionic/react";
import BorrowItem from "../components/BorrowItem";
import AddItemModal from "../components/AddItemModal";
import { useEffect, useState } from "react";
import { fetchItemData, fetchCurrentUser, fetchTags } from "../apiService";
import { add } from "ionicons/icons";
import { checkLoginStatus } from "../data/utils";
import { Tag } from "../data/tag";
import EmptyPage from "../components/EmptyPage";
import BorrowItem2 from "../components/BorrowItem2";

import "../components/BorrowItem2.css";
import { RouteComponentProps } from "react-router";

interface ContainerProps extends RouteComponentProps {
  history: any;
}

const BorrowTab: React.FC<ContainerProps> = ({history}) => {
  const [allItems, setAllItems] = useState([] as any[]);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [userRole, setUserRole] = useState();
  const [filterTags, setFilterTags] = useState<Tag[] | null>(null);
  const [showAvailable, setShowAvailable] = useState(true);

  const navigate = (src: string) => {
    history.push(src)
  }

  const itemIncludesSelectedTag = (item: any) => {
    if(!filterTags) return true;
    let atLeastOneTagged = false;

    for (const tag of filterTags!) {
      if(tag.tagged) atLeastOneTagged = true;
      if (tag.tagged && item.tags.includes(tag.name)) {
        return true; // Wenn mindestens ein ausgewählter Tag gefunden wird, geben Sie true zurück
      }
    }
    return !atLeastOneTagged; // Wenn kein ausgewählter tag gepasst dann false, falls kein tag ausgewählt true
  };


  const filteredItems = allItems.filter((item) =>
  // Prüfen Sie, ob das Element den Namen enthält, nach dem gesucht wird
  item.name.toLowerCase().includes(searchText.toLowerCase())
  // Überprüfen Sie, ob das Element mindestens einen ausgewählten Tag hat, falls kein filter ausgewählt: alle anzeigen
  && itemIncludesSelectedTag(item)
  // Überprüfen Sie, ob das Element verfügbar ist (falls erforderlich)
  && (showAvailable ? item.available : true)
);

  const modalOncklick = () => {
    setShowModal(!showModal);
  };

  const toggleTag = (tag: Tag) => {
    tag.tagged = !tag.tagged;
    setFilterTags([...filterTags!]);

  };

  const toggleShowAvailable = () => {
    setShowAvailable(!showAvailable);
  };

  async function fetchAllItemData(){
      const itemData = await fetchItemData();
      setAllItems(itemData.data);
  }
  
  useEffect(() => {
    async function fetchData() {
      try {
        const loginTokenData = checkLoginStatus();
        if (loginTokenData) {
          const userData = await fetchCurrentUser();
          setUserRole(userData.data.role);
          if(userData) {
            const tagData = await fetchTags(userData.data._id);
            setFilterTags(tagData.data);
          }
        }
        fetchAllItemData();

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useIonViewWillEnter(() => {
    fetchAllItemData();
  })

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
  <div style={{
    width: "100%",   
    whiteSpace: "nowrap", 
    overflowX: "auto",  
  }}>
    <IonChip onClick={toggleShowAvailable} color={showAvailable ? "primary" : ""}>Verfügbar</IonChip>
    {filterTags?.map((tag, index) => (
      <IonChip
        key={index}
        onClick={() => toggleTag(tag)}
        color={tag.tagged ? "primary" : ""}
      >
        {tag.name}
      </IonChip>
    ))}
  </div>
        {userRole === "admin" && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={modalOncklick}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}
        {filteredItems.length === 0 && (
          <EmptyPage message="Keine Items gefunden" />
        )}
        <IonGrid>
          <IonRow style={{ gap: "20px" }}>
            {filteredItems.map((item, index) => (
                <BorrowItem2
                  item={item}
                  key={index}
                  isFunctionStartRental={true}
                  navigate={navigate}
                />
/*                 <BorrowItem
                  item={item}
                  key={index}
                  isFunctionStartRental={true}
                /> */
            ))}
          </IonRow>
        </IonGrid>
        {/* Bedingtes Rendern des Modals basierend auf showModal-Zustand */}
        {showModal && <AddItemModal onClose={() => setShowModal(false)} />}
      </IonContent>
    </IonPage>
  );
};

export default BorrowTab;
