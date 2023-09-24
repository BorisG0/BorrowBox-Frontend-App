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
  IonToast,
} from "@ionic/react";
import { options } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { updateUserData, updateUserRole } from "../apiService";

interface RoleSelectionProps {
  userId: any;
  defaultRole: any;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({
  userId,
  defaultRole,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    defaultRole
  );
  const optionsList = ["teacher", "admin", "other"]; // Ihre Optionen hier
  const chipRef = useRef<HTMLIonChipElement>(null);

  const handleChipClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleSelectChange = async (event: CustomEvent) => {
    try {      
      const result = await updateUserRole({
        userid: userId,
        role: event.detail.value,
      });
      if (result.status === 200) {
        setSelectedOption(event.detail.value);
      } 
    } catch (error) {
      setToast(true);
    }
    setIsEditing(false);
  };

  const [toast, setToast] = useState(false);

  return (
    <div>
      <IonChip
        ref={chipRef}
        onClick={handleChipClick}
        color={selectedOption === "admin" ? "danger" : "primary"}
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
            width: "100%",
            borderRadius: "0",
            boxShadow: "none",
            border: "none",
            background: "transparent",
          }}
        >
          {optionsList.map((option, index) => (
            <IonSelectOption key={index} value={option}>
              {option}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonPopover>
      <IonToast isOpen={toast} message="Error while changing the role. Please try again later." duration={5000} onDidDismiss={() => {setToast(false)}}></IonToast>
    </div>
  );
};

export default RoleSelection;
