import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchItemData } from '../apiService';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip } from "@ionic/react";

const DetailPage: React.FC = () => {
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const itemTest = {
        id: 1,
        name: "My Test Item",
        tags: ["Chemie", "Brille"],
        description: "Schutzbrillen für den Chemieunterricht.",
        available: true,
    };
    useEffect(() => {
        async function fetchData(){
          try{
            const item = await fetchItemData();
            setItem(item.data);
            setLoading(false);
          }catch(error){
            console.log(error);
            setLoading(false);
          }
        }
        fetchData();
      }, []);

    const { id } = useParams<{ id: string }>();  return (
    <IonPage>
      <IonContent fullscreen>
      <IonCard>
      <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <pre>{JSON.stringify(item, null, 2)}</pre>
          )}
        </div>
            <IonCardHeader>
                <IonCardTitle>
                    {itemTest.name} id: {id}
                    <div style={{float: "right"}}>
                        {itemTest.available ? <IonChip color="success">Verfügbar</IonChip> : <IonChip color="danger">Ausgeliehen</IonChip>}
                    </div>
                </IonCardTitle>
                <IonCardSubtitle>
                    {itemTest.tags.map((tag: string, index: number) =>
                        <IonChip key={index}>{tag}</IonChip>
                    )}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                {itemTest.description}
            </IonCardContent>
            
            <div style={{float: "right", padding: "10px"}}>
                <IonButton >
                    {"Ausleihen"}
                </IonButton>
            </div>
            
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default DetailPage;