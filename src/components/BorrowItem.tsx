import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
} from "@ionic/react";
import { endRental, startRental } from "../apiService";
import { useState } from "react";
import { checkLoginStatus } from "../data/utils";

const BorrowItem: React.FC<{
  item: any;
  isFunctionStartRental: boolean;
}> = ({ item, isFunctionStartRental }) => {
  const [isItemAvailable, setIsItemAvailable] = useState(item.available);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRentPressed = async () => {
    setShowConfirmation(true);
  }

  const handleStartRental = async () => {
    try{
      const response = await startRental(item._id);
      console.log(response);
      setIsItemAvailable(false);
    }catch(error){
      console.log(error);
    }
  }

  const handleEndRental = async () => {
    try{
      console.log("ending rental")
      const response = await endRental(item._id);
      setIsItemAvailable(true);
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            {item.name}
            <div style={{ float: "right" }}>
              {isItemAvailable ? (
                <IonChip color="success">Verfügbar</IonChip>
              ) : (
                <IonChip color="danger">Ausgeliehen</IonChip>
              )}
            </div>
          </IonCardTitle>
          <IonCardSubtitle>
            {item.tags?.map((tag: string, index: number) => (
              <IonChip key={index}>{tag}</IonChip>
            ))}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent></IonCardContent>

        <div style={{ float: "right", padding: "10px" }}>
          <IonButton routerLink={`/item/${item._id}`} fill="clear">Details</IonButton>
          <IonButton
            onClick={ (isFunctionStartRental ? handleRentPressed: handleEndRental) }
            disabled={(!checkLoginStatus())
              || (!isItemAvailable && isFunctionStartRental)
              || (isItemAvailable && !isFunctionStartRental)
            } // Deaktiviere den Button, wenn nicht authentifiziert
              //oder Item nicht verfügbar beim Ausleihen oder Item verfügbar beim Zurückgeben
          >
            {isFunctionStartRental ? "Ausleihen" : "Zurückgeben"}
          </IonButton>
        </div>
      </IonCard>

      <IonAlert
        isOpen={showConfirmation}
        onDidDismiss={() => setShowConfirmation(false)}
        header="Ausleihen"
        message={`Möchten Sie ${item.name} wirklich ausleihen?`}
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
              handleStartRental();
            },
          },
        ]}
      />
    </>
    
  );
};

export default BorrowItem;
