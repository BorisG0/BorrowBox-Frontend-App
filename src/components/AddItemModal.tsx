import React, { useRef, useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
    IonInput,
    IonItem,
    IonLabel
} from '@ionic/react';
import { addItem } from '../apiService';

interface AddItemModalProps {
    onClose: () => void; // onClose-Funktion als Prop hinzufügen
  }
  
  const AddItemModal: React.FC<AddItemModalProps> = ({ onClose }) => {
    const inputRefs = {
      name: useRef<HTMLIonInputElement>(null),
      description: useRef<HTMLIonInputElement>(null),
      location: useRef<HTMLIonInputElement>(null),
      tagNames: useRef<HTMLIonInputElement>(null),
      picture: useRef<HTMLIonInputElement>(null),
    };
  
    function confirm() {
      const newItem = {
        name: inputRefs.name.current?.value,
        description: inputRefs.description.current?.value,
        location: inputRefs.location.current?.value,
        //tagNames: inputRefs.tags.current?.value,
        tagNames : ["Mathe", "Bücher"]
        //picture: inputRefs.picture.current?.value,
      };
  
      // Führen Sie Ihre Bestätigungslogik aus, z.B. Validierung
      // und übergeben Sie das newItem an handleAddItem
  
      handleAddItem(newItem);
  
      // Schließen Sie das Modal, wenn die Bestätigung abgeschlossen ist
      onClose();
    }
  
  const handleAddItem = async (newItem: any) => {
    try{
        console.log(newItem)
        const response = await addItem(newItem);
        console.log(response);
    }catch(error){
        console.log(error);
    }
    }

  return (
    <IonModal isOpen={true}>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Add an Item</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonItem>
        <IonLabel position="stacked">Enter the name:</IonLabel>
        <IonInput ref={inputRefs.name} type="text" placeholder="Name" />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Enter the description:</IonLabel>
        <IonInput ref={inputRefs.description} type="text" placeholder="Description" />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Enter the location:</IonLabel>
        <IonInput ref={inputRefs.location} type="text" placeholder="Location" />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Enter the tags:</IonLabel>
        <IonInput ref={inputRefs.tagNames} type="text" placeholder="Tags" />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Enter the picture:</IonLabel>
        <IonInput ref={inputRefs.picture} type="text" placeholder="Picture" />
      </IonItem>
      <IonButton onClick={confirm}>Confirm</IonButton>
      <IonButton onClick={onClose}>Cancel</IonButton>
    </IonContent>
  </IonModal>
  );
};

export default AddItemModal;