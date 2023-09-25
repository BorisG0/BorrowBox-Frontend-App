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
  IonToast,
  IonLoading,
  IonBadge,
} from "@ionic/react";
import {
  personCircle,
  informationCircle,
  logOut,
  time,
  alert,
} from "ionicons/icons";
import { RouteComponentProps } from "react-router-dom";
import { checkLoginStatus, deleteCookie, hashPassword } from "../data/utils";
import {
  fetchCurrentUser,
  updateUserData,
  fetchTags,
  fetchReports,
} from "../apiService";
import { useTranslation } from "react-i18next";
import styles from "./User.module.scss";
import FilterManagement from "../components/FilterManagement";

interface UserProfileProps extends RouteComponentProps {}

interface ChipData {
  _id: string;
  name: string;
  tagged: boolean;
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
  const [passwordValue, setPasswordValue] = useState<any>("");
  const [passwordValue2, setPasswordValue2] = useState<any>("");
  const [editModeEnabled, setEditModeEnabled] = useState<any>(false);
  const [chipData, setChipData] = useState<ChipData[]>([]);
  const [selectedChips, setSelectedChips] = useState(new Set());
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState(0);

  const pagePersonalInfo = "personal-info";
  const pageFilter = "filter";

  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      setLoading(true);
      if (!loginToken) {
        const result = await checkLoginStatus();
        setLoginToken(result);
        loginToken = result;
        if (result === null) {
          history.push("/login");
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
      try {
        const response = await fetchReports();
        setReports(response.data.length);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
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
      if (emailValue != userData?.email || passwordValue != "") {
        let updatedUserData = {
          id: loginToken,
          username: userData?.username,
          email: userData?.email,
          password: "",
        };
        if (passwordValue != "") {
          if (passwordValue != passwordValue2) {
            setToast(true);
            return;
          } else {
            const hashedPassword = await hashPassword(passwordValue);
            updatedUserData.password = hashedPassword.toString();
          }
        }
        if (emailValue != null) {
          updatedUserData.email = emailValue;
        }
        const result = await updateUserData(updatedUserData);
      }
      setPasswordValue("");
      setPasswordValue2("");
    }
    setEditModeEnabled(!editModeEnabled);
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>User Page</IonTitle>
            <IonButton
              slot="end"
              color="light"
              onClick={handleLogOut}
              style={{ marginRight: "10px" }}
            >
              <IonIcon icon={logOut} />
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <IonAvatar
            style={{
              width: "120px",
              height: "120px",
              margin: "20px auto",
              boxShadow: "0px 0px 10px 0px rgba(200, 200, 200, 0.5)", // Hinzugefügte Schatten-Stilregel
            }}
          >
            <img src="./userPicture.svg" alt /*  */="Benutzerbild" />
          </IonAvatar>
          <IonText style={{ fontSize: "24px" }}>
            {t("welcome")} {userData?.username}
          </IonText>
        </div>

        <IonGrid>
          <IonRow style={{ justifyContent: "center" }}>
            <IonCol size="12" size-md="8" size-lg="6">
              <IonButton
                expand="block"
                shape="round"
                color="primary"
                onClick={togglePersonalInfo}
              >
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
                              onIonChange={(e) =>
                                setEmailValue(e.detail.value!)
                              }
                              aria-label="email-input"
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
                              onIonChange={(e) =>
                                setPasswordValue(e.detail.value!)
                              }
                              aria-label="password-input"
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
                              onIonChange={(e) =>
                                setPasswordValue2(e.detail.value!)
                              }
                              aria-label="password-input2"
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
            </IonCol>
            <IonCol size="12" size-md="8" size-lg="6">
              <IonButton
                expand="block"
                shape="round"
                color="primary"
                onClick={toggleFilter}
              >
                <IonIcon icon={informationCircle} />
                Filter
              </IonButton>
              <div
                className={`${styles["filter-container"]} ${
                  currentPage === pageFilter ? styles.open : ""
                }`}
              >
                <FilterManagement
                  loginToken={loginToken}
                  chipData={chipData}
                  setChipData={setChipData}
                  userData={userData}
                  selectedChips={selectedChips}
                  setSelectedChips={setSelectedChips}
                />
              </div>
            </IonCol>
            {userData?.role == "admin" && (
              <IonCol size="12" size-md="8" size-lg="6">
                <IonButton
                  expand="block"
                  shape="round"
                  color="primary"
                  routerLink="/usermanagement"
                >
                  <IonIcon icon={logOut} />
                  Nutzerverwaltung
                </IonButton>
              </IonCol>
            )}
            <IonCol size="12" size-md="8" size-lg="6">
              {" "}
              <IonButton
                expand="block"
                shape="round"
                color="primary"
                routerLink="/rentalhistory"
              >
                <IonIcon icon={time} />
                Historie
              </IonButton>
            </IonCol>

            {userData?.role == "admin" && reports > 0 && (
              <IonCol size="12" size-md="8" size-lg="6">
                <IonButton
                  expand="block"
                  shape="round"
                  color="warning"
                  routerLink="/reportlist"
                >
                  {reports} Gemeldete Gegenstände
                </IonButton>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonToast
        isOpen={toast}
        message="This toast will close in 5 seconds"
        onDidDismiss={() => setToast(false)}
        duration={5000}
      ></IonToast>
      <IonLoading isOpen={loading} message="Daten werden geladen..." />
    </IonPage>
  );
};

export default UserProfile;
