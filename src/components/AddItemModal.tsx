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
    IonChip,
    IonImg
} from '@ionic/react';
import { addItem, fetchTags, uploadItemPhoto } from '../apiService';
import { useEffect } from 'react';
import { Tag } from '../data/tag';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
interface AddItemModalProps {
    onClose: () => void; // onClose-Funktion als Prop hinzufügen
  }

  const AddItemModal: React.FC<AddItemModalProps> = ({ onClose }) => {
    const { photo, takePhoto } = usePhotoGallery();

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
        
        const newId = response.data.message;
        handleUploadPhoto(newId);

        if(response.status === 201){
          //hier toast
        }else{
          //hier toast
        }
    }catch(error){
        //hier toast

    }
  }

  const handleUploadPhoto = async (id: string) => {
    try {
      if (photo && photo.webviewPath) {
        // Call the uploadItemPhoto function and pass photo.filepath as an argument
        const file = new File([await fetch(photo.webviewPath).then((r) => r.blob())], 'photo.jpg');
      

        const response = await uploadItemPhoto(id, file);
        console.log(response);
        
        // Handle the response as needed
      } else {
        console.error('No photo to upload.');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <IonModal isOpen={true}>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Item hinzufügen</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonItem>
        <IonLabel position="stacked">Name:</IonLabel>
        <IonInput ref={inputRefs.name} type="text" placeholder="Name" />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Beschreibung:</IonLabel>
        <IonInput ref={inputRefs.description} type="text" placeholder="Beschreibung" />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Lagerort:</IonLabel>
        <IonInput ref={inputRefs.location} type="text" placeholder="Lagerort" />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Tags:</IonLabel>
        <div>
              {existingTags.map((tag, index) => {
                const selected = selectedTagIds.includes(tag._id);

                return (
                  <IonChip
                    key={index}
                    color={selected ? "success" : "medium"}

                    onClick={() => toggleChip(tag)}
                  >
                    {tag.name}
                  </IonChip>
                );
              })}
            </div>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Bild:</IonLabel>
        {photo ? (
                      <>
                        <IonImg src={photo.webviewPath} />
                        <IonButton onClick={() => takePhoto()}>
                          Foto ändern
                        </IonButton>
                      </>
                    ):
                    (
                      <>
                        <IonButton onClick={() => takePhoto()}>
                          Foto hinzufügen
                        </IonButton>
                      </>
                    )}
      </IonItem>
      <IonButton onClick={confirm}>Bestätigen</IonButton>
      <IonButton onClick={onClose}>Abbrechen</IonButton>
    </IonContent>
  </IonModal>
  );
};

export default AddItemModal;