import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchItemDetailData } from '../apiService';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip } from "@ionic/react";

const DetailPage: React.FC = () => {
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        async function fetchData(){
          try{
            const item = await fetchItemDetailData(id);

            //const item = await fetchItemDetailData("64ede1a0c1440cab375577f2");
            setItem(item.data);
            setLoading(false);
          }catch(error){
            console.log(error);
            setLoading(false);
          }
        }
        fetchData();
      }, [id]);

    return (

    <IonPage>
      {loading ? (
        <p>Loading...</p>
      ) : (


      <IonContent fullscreen>
      <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    {item.name}
                    <div style={{float: "right"}}>
                    {item.available ? <IonChip color="success">Verfügbar</IonChip> : <IonChip color="danger">Ausgeliehen</IonChip>}
                    </div>
                </IonCardTitle>
                <IonCardSubtitle>
                    <> Tags: </>
                    {item.tags.map((tag: string, index: number) =>
                        <IonChip key={index}>{tag}</IonChip>
                    )}
                    <br/>
                    {item.available ? <></> : <> Rented by: <IonChip>{item.currentRenter}</IonChip></>}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                {item.description}
            </IonCardContent>
            
            <div style={{float: "right", padding: "10px"}}>
                <IonButton >
                    {"Ausleihen"}
                </IonButton>
            </div>
            
        </IonCard>
      </IonContent>
            )}
    </IonPage>
  );
};

export default DetailPage;