import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonSearchbar } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';
import AddItemModal from '../components/AddItemModal';
import { useEffect, useState } from 'react';
import { fetchItemData } from '../apiService';

const BorrowTab: React.FC
  availableItems: any[];
  borrowItem: (item: any) => void;
    loginToken: any
  }> = ({ availableItems, borrowItem, loginToken }) => {

    const [allItems, setAllItems] = useState([] as any[]);
    const [showModal, setShowModal] = useState(false);
    const [searchText, setSearchText] = useState('');
  const [userRole, setUserRole] = useState();

    const filteredItems = allItems.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
      async function fetchItems(){
        try{
          const itemData = await fetchItemData();
          setAllItems(itemData.data);
        const userData = await fetchUserById(loginToken);
        setUserRole(userData.data.role);
        }catch(error){
          console.log(error);
        }
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
        <IonSearchbar
          placeholder='Suchen'
          value={searchText}
          onIonInput={e => setSearchText(e.detail.value!)}
        />
        {filteredItems.map((item, index) =>
            <BorrowItem item={item} key={index} loginToken={loginToken} isFunctionStartRental={true}/>
        )}
        <IonButton onClick={() => setShowModal(true)}>Open Modal</IonButton>
        {/* Bedingtes Rendern des Modals basierend auf showModal-Zustand */}
        {showModal && <AddItemModal onClose={() => setShowModal(false)} />}

      </IonContent>
    </IonPage>
  );
};

export default BorrowTab;
