import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';
import AddItemModal from '../components/AddItemModal';
import { useEffect, useState } from 'react';
import { fetchItemData } from '../apiService';

const BorrowTab: React.FC<{
    availableItems: any[],
    borrowItem: (item: any) => void,
    loginToken: any
  }> = ({ availableItems, borrowItem, loginToken }) => {

    const [allItems, setAllItems] = useState([] as any[]);

    useEffect(() => {
      async function fetchItems(){
        try{
          const itemData = await fetchItemData();
          setAllItems(itemData.data);
        }catch(error){
          console.log(error);
        }
      }
      fetchItems();
    }, [])

    const [showModal, setShowModal] = useState(false);

  return (
    <IonPage>
      <IonContent fullscreen>
        {availableItems.map((item, index) =>
            <BorrowItem item={item} key={index} loginToken={loginToken} isFunctionStartRental={true}/>
        )}
        <h1>Alle Items (aus db)</h1>
        {allItems.map((item, index) =>
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
