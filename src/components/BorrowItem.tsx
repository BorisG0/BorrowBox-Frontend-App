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
import { h } from "ionicons/dist/types/stencil-public-runtime";
import BorrowReturnButton from "./BorrowReturnButton";

const BorrowItem: React.FC<{
  item: any;
  isFunctionStartRental: boolean;
}> = ({ item, isFunctionStartRental }) => {
  const [isItemAvailable, setIsItemAvailable] = useState(item.available);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);

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

  const handleReturnPressed = async () => {
    setShowReturnConfirmation(true);
  }

  const handleEndRental = async (location: string) => {
    try{
      console.log("ending rental")
      const response = await endRental(item._id, location);
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
            {item.location}
            <div style={{ float: "right" }}>
              {item.tags?.map((tag: string, index: number) => (
                <IonChip key={index}>{tag}</IonChip>
              ))}
            </div>
          </IonCardSubtitle>
        </IonCardHeader>
{/*         <IonCardContent>
            
        </IonCardContent> */}

        <div style={{ float: "right", padding: "10px" }}>
          <IonButton routerLink={`/item/${item._id}`} fill="clear">Details</IonButton>
          {/* <IonButton
            onClick={ (isFunctionStartRental ? handleRentPressed: handleReturnPressed) }
            disabled={(!checkLoginStatus())
              || (!isItemAvailable && isFunctionStartRental)
              || (isItemAvailable && !isFunctionStartRental)
            } // Deaktiviere den Button, wenn nicht authentifiziert
              //oder Item nicht verfügbar beim Ausleihen oder Item verfügbar beim Zurückgeben
          >
            {isFunctionStartRental ? "Ausleihen" : "Zurückgeben"}
          </IonButton> */}
          <BorrowReturnButton item={item} isFunctionStartRental={isFunctionStartRental}/>
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

      <IonAlert
        isOpen={showReturnConfirmation}
        onDidDismiss={() => setShowReturnConfirmation(false)}
        header="Zurückgeben"
        message={`Wo geben Sie ${item.name} zurück?`}
        buttons={[
          {
            text: "Keller",
            handler: () => {
              handleEndRental("Keller");
            },
          },
          {
            text: "Schnellregal",
            handler: () => {
              handleEndRental("Schnellregal");
            },
          }
        ]}
      />
      
    </>
    
  );
};

export default BorrowItem;
