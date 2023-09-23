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
  IonAlert,
} from '@ionic/react';

import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { deleteItem, fetchCurrentUser, fetchItemDetailData, fetchTags, updateItem, fixReport } from '../apiService';
import { checkLoginStatus } from '../data/utils';
import { useHistory } from 'react-router-dom';
import BorrowReturnButton from '../components/BorrowReturnButton';

type FixedReport = {
  userId: string;
  itemId: string;
}

//ItemType für backend
type ItemTypeBackend = {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  tagIds: string[];
};

// Definieren Sie einen Typ für das 'item'-Objekt
type ItemType = {
  name: string;
  description: string;
  available: boolean;
  image: string;
  location: string;
  tagNames: string[];
  currentRenter: string;
  rentedSince: string;
  reportStateCritical: boolean;
  reportUser: string;
  reportTime: string;
  reportDescription: string;
  // Fügen Sie hier weitere Felder hinzu, die Ihr 'item' hat
};

interface ChipData {
  _id: string;
  name: string;
}

const DetailPage: React.FC = () => {
  const [item, setItem] = useState<ItemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const [selectedChips, setSelectedChips] = useState<Set<string>>(new Set());
  const [chipData, setChipData] = useState<ChipData[]>([]);
  const [userRole, setUserRole] = useState();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isItemAvailable, setIsItemAvailable] = useState(false);
  const [showReportConfirmation, setShowReportConfirmation] = useState(false);
  const [ userId, setUserId ] = useState<string>("");



  useEffect(() => {
    async function fetchData() {
      try {
        const loginTokenData = checkLoginStatus();
        if (loginTokenData) {
          const userData = await fetchCurrentUser();
          setUserRole(userData.data.role);
          setUserId(userData.data._id);
        }

        const fetchedItem = await fetchItemDetailData(id);
        setItem(fetchedItem.data);
        setLoading(false);
        setIsItemAvailable(fetchedItem.data.available);
        console.log(fetchedItem)
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

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };
  const handleFixReportClick = () => {
    setShowReportConfirmation(true);
  };


  const handleDelete = async () => {
    try {
      const response = await deleteItem(id);
      console.log(response);

      window.location.href = '/borrow';
    } catch (error) {
      console.log(error);
    }
  };

  const handleFixReport = async () => {
    try {
      const fixedReport: FixedReport = {
        userId: userId,
        itemId: id,
      }
      const response = await fixReport(fixedReport);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = async () => {
    try {
      const response = await fetchTags(id);
      const updatedChips = new Set(selectedChips);
      response.data.map((tag: any) => {
        if (tag.tagged) {
          updatedChips.add(tag.name);
        }
      });
      setSelectedChips(item?.tagNames ? new Set(item.tagNames) : new Set());
      //setSelectedChips(updatedChips); - das geht beim ersten mal bearbeiten nicht -- vllt zu langsam
      setChipData(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if (!editedItem) {
        return;
      }
      editedItem.tagNames = Array.from(selectedChips);
      const selectedChipIDs = [];
      // Durchlaufen Sie alle ausgewählten Chips
      for (const selectedChip of selectedChips) {
        // Suchen Sie die Übereinstimmung in chipData anhand des 'name'
        const matchingChip = chipData.find((chip) => chip.name === selectedChip);

        // Wenn eine Übereinstimmung gefunden wurde, fügen Sie die ID hinzu
        if (matchingChip) {
          console.log(matchingChip)
          selectedChipIDs.push(matchingChip._id);
        }
      }
      const itemBackendData: ItemTypeBackend = {
        id: id,
        name: editedItem.name,
        description: editedItem.description,
        image: editedItem.image,
        location: editedItem.location,
        tagIds: selectedChipIDs,
      };
      const response = await updateItem(itemBackendData)
      console.log(itemBackendData)
      console.log(response)
      setItem(editedItem);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleChip = (chip: any) => {
    const newSelectedChips = new Set(selectedChips);
    if (newSelectedChips.has(chip.name)) {
      newSelectedChips.delete(chip.name);
    } else {
      newSelectedChips.add(chip.name);
    }
    setSelectedChips(newSelectedChips);

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
    setSelectedChips(item?.tagNames ? new Set(item.tagNames) : new Set());
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
                  {isItemAvailable ? <IonChip color="success">Verfügbar</IonChip> : <IonChip color="danger">Nicht verfügbar</IonChip>}
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
                    <IonCardContent>
                      <p>Select chips by clicking on them:</p>
                      <div>
                        {chipData.map((chip, index) => {
                          function handleChipContextMenu(
                            e: React.MouseEvent<HTMLIonChipElement, MouseEvent>,
                            chip: ChipData
                          ): void {
                            e.preventDefault();
                          }
                          return (
                            <IonChip
                              key={index}
                              color={selectedChips.has(chip.name) ? "success" : "medium"}
                              onClick={() => toggleChip(chip)}
                              onContextMenu={(e) => handleChipContextMenu(e, chip)}
                            >
                              {chip.name}
                            </IonChip>
                          );
                        })}
                      </div>
                    </IonCardContent>
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
                    {item?.currentRenter !== "" &&
                      <>
                        <p>Rented by:{item?.currentRenter}</p>
                        <p>Ausgeliehen seit: {item?.rentedSince}</p>
                      </>}
                    {item?.reportDescription !== "" ? <>
                      <p>Report: {item?.reportDescription}</p>
                      <p>Report von: {item?.reportUser}</p>
                      <p>Report Zeitpunkt: {item?.reportTime}</p>
                      <p>Report kritisch: {item?.reportStateCritical ? "Ja" : "Nein"}</p>
                    </>
                      : <p> Kein Report vorhanden</p>
                    }
                    <BorrowReturnButton item={item} isFunctionStartRental={true} isItemAvailable={isItemAvailable} setIsItemAvailable={setIsItemAvailable} />
                    {userRole === "admin" && (
                      <>{item?.reportStateCritical && 
                        <IonButton expand="full" onClick={handleFixReportClick}>
                          Report beheben
                        </IonButton>
                        }
                        <IonButton expand="full" onClick={handleEditClick}>
                          Bearbeiten
                        </IonButton>
                        <IonButton expand="full" onClick={handleDeleteClick}>
                          Löschen
                        </IonButton>
                      </>
                    )}
                  </>
                )}
              </IonCardContent>
            </IonCard>
          </IonContent>
          <IonAlert
            isOpen={showConfirmation}
            onDidDismiss={() => setShowConfirmation(false)}
            header="Löschen"
            message={`Möchten Sie ${item?.name} wirklich löschen?`}
            buttons={[
              {
                text: "Nein",
                role: "cancel",
                handler: () => {
                  console.log("Cancel clicked");
                },
              },
              {
                text: "Ja",
                handler: () => {
                  handleDelete();
                },
              },
            ]}
          />
                    <IonAlert
            isOpen={showReportConfirmation}
            onDidDismiss={() => setShowReportConfirmation(false)}
            header="Reparieren"
            message={`Ist ${item?.name} wirklich repariert?`}
            buttons={[
              {
                text: "Nein",
                role: "cancel",
                handler: () => {
                  console.log("Cancel clicked");
                },
              },
              {
                text: "Ja",
                handler: () => {
                  handleFixReport();
                },
              },
            ]}
          />
        </>
      )}
    </IonPage>
  );
};

export default DetailPage;
