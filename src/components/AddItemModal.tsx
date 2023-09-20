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
    IonLabel,
    IonChip
} from '@ionic/react';
import { addItem, fetchTags } from '../apiService';
import { useEffect } from 'react';
import { Tag } from '../data/tag';
interface AddItemModalProps {
    onClose: () => void; // onClose-Funktion als Prop hinzufügen
  }

  const AddItemModal: React.FC<AddItemModalProps> = ({ onClose }) => {
    const [existingTags, setExistingTags] = useState<Tag[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
    async function handleModalOpen() {
      const response = await fetchTags(null);
      setExistingTags(response.data);
    }
    useEffect(() => {
      // Call the async function when the modal is opened
      handleModalOpen();
    }, []);
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
        tagIds: selectedTagIds,
        //tagNames : ["Mathe", "Bücher"] - für neue tags
        //picture: inputRefs.picture.current?.value,
      };
  
      // Führen Sie Ihre Bestätigungslogik aus, z.B. Validierung
      // und übergeben Sie das newItem an handleAddItem
  
      handleAddItem(newItem);
  
      // Schließen Sie das Modal, wenn die Bestätigung abgeschlossen ist
      onClose();
    }
    const toggleChip = (chip: Tag) => {
      setSelectedTagIds((prevSelectedTagIds) => {
        // Prüfe, ob die ID bereits im ausgewählten Tag-Array ist
        const isTagSelected = prevSelectedTagIds.includes(chip._id);
        if (isTagSelected) {
          // Wenn der Chip bereits ausgewählt ist, entferne ihn aus dem Array
          return prevSelectedTagIds.filter((id) => id !== chip._id);
        } else {
          // Wenn der Chip nicht ausgewählt ist, füge ihn dem Array hinzu
          return [...prevSelectedTagIds, chip._id];
        }
      });
    };

  const handleAddItem = async (newItem: any) => {
    try{
        const response = await addItem(newItem);

        if(response.status === 201){
          //hier toast
        }else{
          //hier toast
        }
    }catch(error){
        //hier toast

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
        <div>
              {existingTags.map((tag, index) => {
                const selected = selectedTagIds.includes(tag._id);

                return (
                  <IonChip
                    key={index}
                    color={selected ? "success" : "primary"}

                    onClick={() => toggleChip(tag)}
                  >
                    {tag.name}
                  </IonChip>
                );
              })}
            </div>
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