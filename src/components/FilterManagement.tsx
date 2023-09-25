// FilterManagement.tsx
import React, { useState, useEffect } from "react";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonIcon,
  IonInput,
} from "@ionic/react";
import { closeCircleOutline, compass, colorFilterOutline } from "ionicons/icons";
import { useTranslation } from "react-i18next";
import {
  fetchTags,
  updateUserTag,
  deleteFilter,
  fetchCurrentUser,
  addFilter,
} from "../apiService";
import styles from "../Pages/User.module.scss";

interface FilterManagementProps {
  loginToken: any;
  chipData: ChipData[];
  userData: any;
  setChipData: (data: any) => void;
  selectedChips: any;
  setSelectedChips: (data: any) => void;
}

interface ChipData {
  _id: string;
  name: string;
  tagged: boolean;
}

const FilterManagement: React.FC<FilterManagementProps> = ({
  loginToken,
  chipData,
  userData,
  setChipData,
  selectedChips,
  setSelectedChips,
}) => {
  const [tagsEditState, setTagsEditState] = useState(false);
  const { t } = useTranslation();
  const [alertState, setAlertState] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleAlertDismiss = async (e: any) => {
    if (e.detail.role !== "cancel") {
      const enteredValue = e.detail.data.values[0];
      const response = await addFilter({
        loginToken: loginToken,
        filterName: enteredValue,
      });
      setChipData(response.data);
    } else {
      setInputValue("");
    }
    setAlertState(false);
  };

  const toggleChip = async (chip: ChipData) => {
    if (!tagsEditState) {
      const updatedChips = new Set(selectedChips);
      if (updatedChips.has(chip.name)) {
        updatedChips.delete(chip.name);
      } else {
        updatedChips.add(chip.name);
      }
      const data = {
        userId: loginToken,
        tagId: chip._id,
      };
      const response = await updateUserTag(data);
      if (response.status === 200) {
        setSelectedChips(updatedChips);
      }
    }
  };

  const handleDeleteChip = async (chip: ChipData) => {
    const result = await deleteFilter(chip._id);
    setChipData(result.data);
  };

  const addChip = () => {
    setAlertState(true);
  };

  useEffect(() => {
    const updatedChips = new Set(selectedChips);
    chipData.forEach((tag: any) => {
      if (tag.tagged) {
        updatedChips.add(tag.name);
      }
    });
    setSelectedChips(updatedChips);
  }, []);

  return (
    <>
      <IonCard>
        {" "}
        <IonCardContent>
          <div>
            {chipData.map((chip, index) => {
              function handleChipContextMenu(
                e: React.MouseEvent<HTMLIonChipElement, MouseEvent>,
                chip: ChipData
              ): void {
                e.preventDefault();
                setTagsEditState(!tagsEditState);
              }

              return (
                <IonChip
                  key={index}
                  color={selectedChips.has(chip.name) ? "success" : "medium"}
                  onClick={() => toggleChip(chip)}
                  onContextMenu={(e) => handleChipContextMenu(e, chip)}
                  className={tagsEditState ? styles.wobbleanimation : ""} // Fügen Sie die CSS-Klasse hinzu, wenn tagsEditState aktiviert ist
                >
                  {chip.name}
                  {tagsEditState ? (
                    <IonIcon
                      icon={closeCircleOutline}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChip(chip);
                      }}
                      style={{
                        fontSize: "14px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <IonIcon
                      icon={colorFilterOutline}
                      style={{
                        fontSize: "14px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}/>
                  )}
                </IonChip>
              );
            })}
            {userData?.role == "admin" && (
              <IonChip
                key={"add"}
                color="warning"
                id="present-alert"
                onClick={() => addChip()}
              >
                +
              </IonChip>
            )}
          </div>
        </IonCardContent>
        {userData?.role === "admin" && (
          <IonAlert
            isOpen={alertState}
            header="Please enter a filter name"
            buttons={["OK", "CANCEL"]}
            inputs={[
              {
                placeholder: "Math, English, ...",
                value: inputValue,
              },
            ]}
            onDidDismiss={handleAlertDismiss}
          ></IonAlert>
        )}
      </IonCard>
    </>
  );
};

export default FilterManagement;
