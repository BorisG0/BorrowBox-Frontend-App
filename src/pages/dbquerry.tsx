import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React, { useState, useEffect } from 'react';
import  { fetchHelloData } from '../apiService';

const Tab1: React.FC = () => {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData(){
      try{
        const data = await fetchHelloData();
        setData(data);
        setLoading(false);
      }catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
        <IonButton>Some Button</IonButton>
        <h1>lol test</h1>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;