import { IonAlert, IonButton } from "@ionic/react";
import { useState } from "react";
import { endRental, startRental } from "../apiService";
import { checkLoginStatus } from "../data/utils";

const BorrowReturnButton: React.FC<{
    item: any;
    isFunctionStartRental: boolean;
    isItemAvailable: boolean;
    setIsItemAvailable: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({item, isFunctionStartRental, isItemAvailable, setIsItemAvailable}) => {
    const [showBorrowConfirmation, setShowBorrowConfirmation] = useState(false);
    const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);

    const handleRentPressed = async () => {
        setShowBorrowConfirmation(true);
      }
    
    const handleStartRental = async () => {
    try{
        console.log("starting rental")
        console.log(item)
        const response = await startRental(item._id ? item._id : item.id);
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

    return(
        <>
            <IonButton
                onClick={ (isFunctionStartRental ? handleRentPressed: handleReturnPressed) }
                disabled={(!checkLoginStatus())
                || (!isItemAvailable && isFunctionStartRental)
                || (isItemAvailable && !isFunctionStartRental)
                } // Deaktiviere den Button, wenn nicht authentifiziert
                //oder Item nicht verfügbar beim Ausleihen oder Item verfügbar beim Zurückgeben
                >
                {isFunctionStartRental ? "Ausleihen" : "Zurückgeben"}
            </IonButton>

            <IonAlert
                isOpen={showBorrowConfirmation}
                onDidDismiss={() => setShowBorrowConfirmation(false)}
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
    )
}

export default BorrowReturnButton;