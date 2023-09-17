import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonSearchbar } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';
import AddItemModal from '../components/AddItemModal';
import { useEffect, useState } from 'react';
import { fetchItemData } from '../apiService';

const BorrowTab: React.FC<{
    loginToken: any
  }> = ({ loginToken }) => {

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
        <IonSearchbar placeholder='Suchen'></IonSearchbar>
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
