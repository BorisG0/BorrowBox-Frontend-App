import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonInput,
  InputChangeEventDetail,
  IonCardSubtitle,
  IonChip,
  IonImg,
  IonItem,
  IonLabel,
} from '@ionic/react';

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchItemDetailData, updateItem } from '../apiService';

// Definieren Sie einen Typ für das 'item'-Objekt
type ItemType = {
  name: string;
  description: string;
  available: boolean;
  image: string;
  location: string;
  tagNames: string[];
  currentRenter: string;
  // Fügen Sie hier weitere Felder hinzu, die Ihr 'item' hat
};

const DetailPage: React.FC = () => {
  const [item, setItem] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchData() {
      try {
        const item = await fetchItemDetailData(id);
        setItem(item.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const [isEditing, setIsEditing] = useState(false);

  // Erstellen Sie eine separate Kopie des 'item'-Objekts für die Bearbeitung
  const [editedItem, setEditedItem] = useState<ItemType | null>(null);

  useEffect(() => {
    if (item) {
      // Initialisieren Sie die bearbeiteten Daten, wenn das 'item' geladen wird
      setEditedItem({ ...item });
    }
  }, [item]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      console.log(editedItem);
      // Hier können Sie die aktualisierten Daten speichern oder senden
      // Setzen Sie das 'item' auf die aktualisierten Daten nach dem Speichern
      //const response = await updateItem(editedItem)
      //console.log(response)
      setItem(editedItem);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (fieldName: keyof ItemType, value: string) => {
    if (editedItem) {
      // Kopieren Sie das 'editedItem' und aktualisieren Sie das spezifische Feld
      setEditedItem({ ...editedItem, [fieldName]: value });
    }
  };
  const handleCancelClick = () => {
    // Beim Abbrechen setzen Sie den Bearbeitungsmodus auf false
    // und stellen Sie das 'editedItem' auf den ursprünglichen Wert zurück (item)
    setIsEditing(false);
    setEditedItem(item);
  };

  return (
    <IonPage>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Item Detail</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{item?.name}</IonCardTitle>

              <IonCardSubtitle>
                {item?.available ? <IonChip color="success">Verfügbar</IonChip> : <IonChip color="danger">Ausgeliehen</IonChip>}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              {isEditing ? (
                <form>
                  <IonItem>
                  <IonLabel position="stacked">Enter the name:</IonLabel>
                  <IonInput
  type="text"
  value={editedItem?.name || ''}
  onIonInput={(e) =>
    handleInputChange('name', (e as any).target.value)
  }
/>

                  </IonItem>
                  <IonItem>
                  <IonLabel position="stacked">Enter the description:</IonLabel>
                  <IonInput
  type="text"
  value={editedItem?.description || ''}
  onIonInput={(e) =>
    handleInputChange('description', (e as any).target.value)
  }
/>
                  </IonItem>
                  <IonItem>
                  <IonLabel position="stacked">Enter the location:</IonLabel>
                  <IonInput
  type="text"
  value={editedItem?.location || ''}
  onIonInput={(e) =>
    handleInputChange('location', (e as any).target.value)
  }
/>
                  </IonItem>
                  <IonButton expand="full" onClick={handleSaveClick}>
                    Speichern
                  </IonButton>
                  <IonButton expand="full" onClick={handleCancelClick}>
                      Abbrechen
                    </IonButton>
                </form>
              ) : (
                <>
                  <IonImg src={item?.image} />
                  <p> Beschreibung: {item?.description}</p>
                  <p> Location: {item?.location}</p>
                  <p>Tags:
                    {item?.tagNames.map((tag: string, index: number) =>
                    <IonChip key={index}>{tag}</IonChip>
                  )}
                  </p>
                  {item?.available ? <></> : <> Rented by:{item?.currentRenter}</>}
                  <IonButton expand="full" onClick={handleEditClick}>
                    Bearbeiten
                  </IonButton>
                  <IonButton expand="full">
                    Ausleihen
                  </IonButton>
                </>
              )}
            </IonCardContent>
          </IonCard>
        </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default DetailPage;
