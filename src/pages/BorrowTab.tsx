import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';
import React, { useEffect, useState } from 'react';

const BorrowTab: React.FC<{ availableItems: any[], setAvailableItems: React.Dispatch<React.SetStateAction<any[]>> }> 
    = ({ availableItems, setAvailableItems }) => {

    const dummyItems = [
        {
            id: 1,
            name: "Ausgestopfter Papagei",
            tags: ["Biologie", "Tier"],
            description: "Ein ausgestopfter Papagei, der auf einem Ast sitzt.",
            available: true,
        },
        {
            id: 2,
            name: "Schutzbrillen",
            tags: ["Chemie", "Brille"],
            description: "Schutzbrillen für den Chemieunterricht.",
            available: true,
        }
    ]
    
    useEffect(() => {
        setAvailableItems(dummyItems);
    }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {availableItems.map((item, index) =>
            <BorrowItem item={item} key={index}/>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BorrowTab;
