import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';
import { useEffect, useState } from 'react';
import { fetchItemData } from '../apiService';

const BorrowTab: React.FC<{
    availableItems: any[],
    borrowItem: (item: any) => void,
  }> = ({ availableItems, borrowItem }) => {

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

  return (
    <IonPage>
      <IonContent fullscreen>
        {availableItems.map((item, index) =>
            <BorrowItem item={item} key={index} isFunctionStartRental={true}/>
        )}
        <h1>Alle Items (aus db)</h1>
        {allItems.map((item, index) =>
            <BorrowItem item={item} key={index} isFunctionStartRental={true}/>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BorrowTab;
