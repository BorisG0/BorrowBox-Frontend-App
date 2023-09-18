import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { useState, useEffect } from 'react';
import  { fetchHelloData, fetchItemData, startRental } from '../apiService';

const DBQuery: React.FC = () => {

  const [data, setData] = useState<any>(null);
  const [itemData, setItemData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData(){
      try{
        const data = await fetchHelloData();
        setData(data.data);
        const itemData = await fetchItemData();
        setItemData(itemData.data);
        setLoading(false);
      }catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const testRental = {
    "user": "test email",
    "itemId": "64ede287c1440cab375577f9"
  }

  const handleStartRental = async () => {
    try{
      const response = await startRental("64ede287c1440cab375577f9");
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={handleStartRental}>Some Button</IonButton>
        <h1>lol test</h1>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <pre>{JSON.stringify(data, null, 2)}</pre>
              <pre>{JSON.stringify(itemData, null, 2)}</pre>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DBQuery;