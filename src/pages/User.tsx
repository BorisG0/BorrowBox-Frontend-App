import React, { useEffect, useState } from "react";
import "@ionic/react/css/core.css";
import {
  IonContent,
  IonPage,
  IonAvatar,
  IonText,
  IonButton,
  IonIcon,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonCol,
  IonGrid,
  IonRow,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonChip,
  IonModal,
  IonAlert,
} from "@ionic/react";
import {
  personCircle,
  informationCircle,
  logOut,
  closeCircleOutline,
} from "ionicons/icons";
import { RouteComponentProps } from "react-router-dom";
import { checkLoginStatus, deleteCookie, hashPassword } from "../data/utils";
import {
  fetchCurrentUser,
  updateUserData,
  fetchTags,
  updateUserTag,
  addFilter,
  deleteFilter,
} from "../apiService";
import { useTranslation } from "react-i18next";
import styles from "./User.module.scss";

interface UserProfileProps extends RouteComponentProps {}
interface ChipData {
  id: string;
  name: string;
}

const UserProfile: React.FC<
  UserProfileProps & {
    loginToken: any;
    setLoginToken: (authenticated: any) => void;
  }
> = ({ loginToken, setLoginToken, history }) => {
  const [userData, setUserData] = useState<any>(null);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<any>(null);
  const [emailValue, setEmailValue] = useState<any>();
  const [passwordValue, setPasswordValue] = useState<any>();
  const [passwordValue2, setPasswordValue2] = useState<any>();
  const [selectedChips, setSelectedChips] = useState(new Set());
  const [editModeEnabled, setEditModeEnabled] = useState<any>(false);
  const [isManageUsersModalOpen, setIsManageUsersModalOpen] = useState(false);
  const [chipData, setChipData] = useState<ChipData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [alertState, setAlertState] = useState(false);

  const [tagsEditState, setTagsEditState] = useState(false);

  const toggleChip = async (chip: any) => {
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

  const addChip = () => {
    setAlertState(!alertState);
  };

  const openManageUsersModal = () => {
    setIsManageUsersModalOpen(true);
  };

  const closeManageUsersModal = () => {
    setIsManageUsersModalOpen(false);
  };

  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      if (!loginToken) {
        const result = checkLoginStatus();
        setLoginToken(result);
        loginToken = result;
        if (result === null) {
          history.push("/login");
          console.log("Test2")
          return;
        }
      }
      try {
        const data = await fetchCurrentUser();
        setUserData(data.data);
        setEmailValue(data.data.email);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetchTags(loginToken);
        const updatedChips = new Set(selectedChips);
        response.data.map((tag: any) => {
          if (tag.tagged) {
            updatedChips.add(tag.name);
          }
        });
        setSelectedChips(updatedChips);
        setChipData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginAndFetchData();
  }, [loginToken, history]);

  const handleLogOut = () => {
    deleteCookie("loginToken");
    setLoginToken("");
  };

  if (!loginToken) {
    return null;
  }

  const pagePersonalInfo = "personal-info";
  const pageFilter = "filter";

  const togglePersonalInfo = () => {
    if (currentPage === pagePersonalInfo) {
      setCurrentPage(null);
    } else {
      setCurrentPage(pagePersonalInfo);
    }
  };
  const toggleFilter = () => {
    if (currentPage === pageFilter) {
      setCurrentPage(null);
    } else {
      setCurrentPage(pageFilter);
    }
  };
  const editSaveButton = async () => {
    if (editModeEnabled) {
      if (emailValue != userData?.email && passwordValue != "") {
        let updatedUserData = {
          id: loginToken,
          username: userData?.username,
          email: "",
          password: "",
        };
        if (passwordValue != "" && passwordValue === passwordValue2) {
          const hashedPassword = await hashPassword(passwordValue);
          updatedUserData.password = hashedPassword.toString();
        }
        if (emailValue != null) {
          updatedUserData.email = emailValue;
        }
        const result = await updateUserData(updatedUserData);
      }
    }
    setEditModeEnabled(!editModeEnabled);
    setChipData([]);
    setEmailValue("");
    setPasswordValue("");
    setPasswordValue2("");
  };

  const handleDeleteChip = async (chip: any) => {
    const result = await deleteFilter(chip._id);
    setChipData(result.data);
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>User Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <IonAvatar
            style={{ width: "120px", height: "120px", margin: "0 auto" }}
          >
            <img src="./user.jpg" alt /*  */="Benutzerbild" />
          </IonAvatar>
          <IonText style={{ fontSize: "24px", margin: "20px 0" }}>
            {t("welcome")} {userData?.username}
          </IonText>
        </div>
        <IonButton expand="full" color="primary" onClick={togglePersonalInfo}>
          <IonIcon icon={personCircle} />
          Persönliche Infos
        </IonButton>
        <div
          className={`${styles["personal-info-container"]} ${
            currentPage === pagePersonalInfo ? styles.open : ""
          }`}
        >
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="fixed">Username:</IonLabel>
                    <IonLabel>{userData?.username}</IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="fixed">Email:</IonLabel>
                    {editModeEnabled ? (
                      <IonInput
                        value={emailValue}
                        onIonChange={(e) => setEmailValue(e.detail.value!)}
                      />
                    ) : (
                      <IonLabel>{emailValue}</IonLabel>
                    )}
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="fixed">Password:</IonLabel>
                    {editModeEnabled ? (
                      <IonInput
                        value={passwordValue}
                        placeholder="**********"
                        onIonChange={(e) => setPasswordValue(e.detail.value!)}
                      />
                    ) : (
                      <IonLabel>*********</IonLabel>
                    )}
                  </IonItem>
                </IonCol>
              </IonRow>
              {editModeEnabled && (
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="fixed">repeat:</IonLabel>
                      <IonInput
                        value={passwordValue2}
                        placeholder="**********"
                        onIonChange={(e) => setPasswordValue2(e.detail.value!)}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
              )}
            </IonGrid>
            <IonButton expand="full" onClick={editSaveButton}>
              {editModeEnabled ? "Save" : "Edit"}
            </IonButton>
          </IonCardContent>
        </div>
        <IonButton expand="full" color="primary" onClick={toggleFilter}>
          <IonIcon icon={informationCircle} />
          Filter
        </IonButton>
        <div
          className={`${styles["filter-container"]} ${
            currentPage === pageFilter ? styles.open : ""
          }`}
        >
          <IonCardContent>
            <p>Select chips by clicking on them:</p>
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
                    color={selectedChips.has(chip.name) ? "success" : "primary"}
                    onClick={() => toggleChip(chip)}
                    onContextMenu={(e) => handleChipContextMenu(e, chip)}
                    className={tagsEditState ? styles.wobbleanimation : ""} // Fügen Sie die CSS-Klasse hinzu, wenn tagsEditState aktiviert ist
                  >
                    {chip.name}
                    {tagsEditState && (
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
                    )}
                  </IonChip>
                );
              })}
              <IonChip
                key={"add"}
                color="primary"
                id="present-alert"
                onClick={() => addChip()}
              >
                +
              </IonChip>
            </div>
          </IonCardContent>
        </div>
        {userData?.role == "admin" && (
          <IonButton
            expand="full"
            color="primary"
            routerLink="/usermanagement"
          >
            <IonIcon icon={logOut} />
            Manage Users
          </IonButton>
        )}
        <IonButton expand="full" color="primary" onClick={handleLogOut}>
          <IonIcon icon={logOut} />
          Log Out
        </IonButton>
        <IonModal
          isOpen={isManageUsersModalOpen}
          onDidDismiss={closeManageUsersModal}
        >
          <IonText>Das ist das Manage Users Modal.</IonText>
          <IonButton onClick={closeManageUsersModal}>Schließen</IonButton>
        </IonModal>
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
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
