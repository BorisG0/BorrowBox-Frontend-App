import {
    IonAlert,
    IonButton,
    IonContent,
    IonPage,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonChip,
    IonLabel,
    IonPopover,
    IonSelect,
    IonSelectOption,
  } from "@ionic/react";
  import { options } from "ionicons/icons";
  import React, { useEffect, useRef, useState } from "react";

  const Test: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | undefined>(
      undefined
    );
    const optionsList = ["Teacher", "Admin", "Other"]; // Ihre Optionen hier
    const chipRef = useRef<HTMLIonChipElement>(null);
  
    const handleChipClick = () => {
      if (!isEditing) {
        setIsEditing(true);
      }
    };
  
    const handleSelectChange = (event: CustomEvent) => {
      setSelectedOption(event.detail.value);
      setIsEditing(false);
    };

    
    return (
      <IonPage>
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonTitle>User Page</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonChip
            ref={chipRef}
            onClick={handleChipClick}
            onContextMenu={(e) => {
              e.preventDefault();
              chipRef.current?.click(); // Öffnet das IonSelect, wenn der Chip mit der rechten Maustaste angeklickt wird
            }}
          >
            <IonLabel>{selectedOption || "Wählen Sie eine Option"}</IonLabel>
          </IonChip>
          <IonPopover
            isOpen={isEditing}
            onDidDismiss={() => setIsEditing(false)}
            event={chipRef.current}
          >
            <IonSelect
              value={selectedOption}
              onIonChange={handleSelectChange}
              interface="popover"
              style={{
                width: "100%", // Setzen Sie die Breite auf 100%, um sie so groß wie den Chip zu machen
                borderRadius: "0", // Entfernen Sie die abgerundeten Ecken, wenn gewünscht
                boxShadow: "none", // Entfernen Sie den Schatten, wenn gewünscht
                border: "none", // Entfernen Sie den Rahmen, wenn gewünscht
                background: "transparent", // Entfernen Sie den Hintergrund, wenn gewünscht
              }}
            >
              {optionsList.map((option, index) => (
                <IonSelectOption key={index} value={option}>
                  {option}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonPopover>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Test;
  