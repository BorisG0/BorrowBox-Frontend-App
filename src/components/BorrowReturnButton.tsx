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
    const [showReportConfirmation, setShowReportConfirmation] = useState(false);
    const [showLocationSelection, setShowLocationSelection] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState("");

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
        setShowLocationSelection(true);
    }

    const handleLocationSelected = async (location: string) => {
        console.log(location)
        setSelectedLocation(location);
        setShowReturnConfirmation(true);
    }

    const handleFileReportPressed = async () => {
        console.log("file report")
        setShowReportConfirmation(true);
    }

    const handleNoReportPressed = async () => {
        console.log("no report")
    }

    const handleEndRental = async (report?: string, criticalReport?: boolean) => {
        try{
            console.log("ending rental")
            const response = await endRental(item._id, selectedLocation, (report ? report: ""), (criticalReport ? criticalReport: false));
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

            <IonAlert // Ausleihe bestätigen
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

            <IonAlert // Location auswählen
                isOpen={showLocationSelection}
                onDidDismiss={() => setShowLocationSelection(false)}
                header="Abgabeort auswählen"
                inputs={[
                    {
                        label: "Keller",
                        type: "radio",
                        value: "Keller",
                    },
                    {
                        label: "Schnellregal",
                        type: "radio",
                        value: "Schnellregal",
                    }
                ]}
                buttons={[
                    {
                        text: "Ok",
                        handler: (data) => {
                            handleLocationSelected(data);
                        }
                    }
                ]}
            />

            <IonAlert // Rückgabe bestätigen
                isOpen={showReturnConfirmation}
                onDidDismiss={() => setShowReturnConfirmation(false)}
                header="Zurückgeben"
                message={`Ist mit ${item.name} alles in Ordung?`}
                buttons={[
                    {
                        text: "Problem melden",
                        handler: () => {
                            handleFileReportPressed()
                        }
                    },
                    {
                        text: "Ja",
                        handler: () => {
                            handleEndRental()
                        }
                    }
                ]}
            />

            <IonAlert // Report erstellen
                isOpen={showReportConfirmation}
                onDidDismiss={() => setShowReportConfirmation(false)}
                header="Problem melden"
                message={`Ist das Problem mit ${item.name} kritisch?`}
                inputs={[
                    {
                        name: "report",
                        type: "text",
                        placeholder: "Beschreibung des Problems"
                    }
                ]}
                buttons={[
                    {
                        text: "Nein",
                        handler: (data) => {
                            handleEndRental(data.report, false)
                        }
                    },
                    {
                        text: "Ja",
                        handler: (data) => {
                            handleEndRental(data.report, true)
                        }
                    }
                ]}
            />
        </>
    )
}

export default BorrowReturnButton;