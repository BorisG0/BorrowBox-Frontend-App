import React, { useEffect, useState } from "react";
import {
  IonAlert,
  IonButton,
  IonCheckbox,
  IonChip,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import {
  add,
  colorPalette,
  globe,
  document,
  pencil,
  trashBin,
  backspace,
  arrowBack,
  remove,
  key,
  closeCircleOutline,
} from "ionicons/icons";
import { generateRandomPassword } from "../data/auth";
import { addUser, deleteUsers, fetchUser } from "../apiService";
import { logDOM } from "@testing-library/react";
import { checkLoginStatus, hashPassword } from "../data/utils";
import { AxiosResponse } from "axios";
interface UserProfileProps extends RouteComponentProps {}

interface User {
  email: string;
  id: string;
  role: string;
  username: string;
  password: string;
}

const UserTable: React.FC<UserProfileProps & { loginToken: any }> = ({
  history,
  loginToken,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [inputUsername, setinputUsername] = useState("");
  const [inputEmail, setinputEmail] = useState("");
  const [inputPassword, setinputPassword] = useState(generateRandomPassword());

  const handlePasswordReset = (user: any) => {
    // Hier kannst du die Logik für das Passwort-Reset implementieren
    console.log(`Reset Password for User: ${user.name}`);
  };

  const handleUserDelete = async () => {
    setEditModeEnabled(!editModeEnabled);
    let ids = selectedUsers.map(user => ({ id: user.id }));
    const response = await deleteUsers(ids)      
    const filteredResponse = response.data.map((user: any) => {
      return {
        ...user,
        id: user._id,
      };
    });
    
    const filterd = setUsersWithFilter(filteredResponse);
    setUsers(filterd);
    console.log(response);
  };

  const handleAddUser = () => {
    console.log(`Add User: ${newUserName}`);
    setShowAddUserModal(false);
    setNewUserName("");
    setNewUserPassword("");
  };

  const handleCheckboxChange = (e: any, user: User) => {
    const isChecked = e.detail.checked;
    console.log(user.username);
    if (isChecked) {
      // Überprüfe, ob der Benutzer bereits ausgewählt ist
      const isUserSelected = selectedUsers.some(
        (selectedUser) => selectedUser.id === user.id
      );
      if (!isUserSelected) {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      // Entferne den Benutzer aus der ausgewählten Liste
      const updatedSelectedUsers = selectedUsers.filter(
        (selectedUser) => selectedUser.id !== user.id
      );
      setSelectedUsers(updatedSelectedUsers);
    }
  };

  const handleAlertDismiss = async (e: any) => {
    const hash = hashPassword(e.detail.data.values[1]);
    if (e.detail.role !== "cancel") {
      const userData: User = {
        username: e.detail.data.values[0],
        email: e.detail.data.values[1],
        password: (await hash).toString(),
        id: "",
        role: "teacher",
      };
      const response = await addUser(userData);

      const filteredResponse = response.data.map((user: any) => {
        return {
          ...user,
          id: user._id,
        };
      });
      
      const filterd = setUsersWithFilter(filteredResponse);
      setUsers(filterd);
      console.log(filterd);
    } else {
      setinputPassword("");
      setinputUsername("");
    }
    setAlertState(false);
  };

  function handleChipContextMenu(
    e: React.MouseEvent<HTMLIonChipElement, MouseEvent>,
    user: User
  ): void {
    e.preventDefault();
    throw new Error("Function not implemented.");
  }

  useEffect(() => {
    async function test() {
      const result = await fetchUser();
      const filteredArray = setUsersWithFilter(result);
      setUsers(filteredArray);
      console.log(filteredArray);
    }
    test();
  }, []);

  const setUsersWithFilter = (result: AxiosResponse<any, any>) => {
    const loginToken = checkLoginStatus();
    const filterArray: User[] = result as unknown as User[];
    const filteredArray = filterArray.filter((item) => item.id !== loginToken);
    return filteredArray;
  };
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <div style={{ display: "flex", alignItems: "center" }}>
              {editModeEnabled ? (
                <IonIcon
                  icon={closeCircleOutline}
                  style={{ marginLeft: "20px" }}
                  onClick={() => {
                    setEditModeEnabled(false);
                  }}
                />
              ) : (
                <IonIcon
                  icon={arrowBack}
                  style={{ marginLeft: "20px" }}
                  onClick={() => {
                    history.push("/user");
                  }}
                />
              )}
              <IonTitle style={{ marginLeft: "8px" }}>Benutzertabelle</IonTitle>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {users.map((user: User, index) => (
            <IonItem
              key={user.id}
              lines="none"
              style={{
                marginBottom: index === users.length - 1 ? "0" : "16px",
              }}
            >
              {" "}
              <div style={{ marginRight: "16px" }}>
                {editModeEnabled && (
                  <IonCheckbox
                    checked={selectedUsers.includes(user)}
                    onIonChange={(e) => handleCheckboxChange(e, user)}
                    aria-label="Auswählen"
                    labelPlacement="fixed"
                  />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <IonLabel>
                  <h2>{user.username}</h2>
                  <p>{user.email}</p>
                </IonLabel>
                <IonChip
                  color={user.role === "admin" ? "danger" : "primary"}
                  onContextMenu={(e) => handleChipContextMenu(e, user)}
                >
                  {user.role}
                </IonChip>
              </div>
              {!editModeEnabled && (
                <IonButton onClick={() => handlePasswordReset(user)}>
                  <IonIcon icon={key} />
                </IonButton>
              )}
            </IonItem>
          ))}
        </IonList>

        <IonModal isOpen={showAddUserModal}>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              type="text"
              value={newUserName}
              onIonChange={(e: any) => setNewUserName(e.detail.value)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Passwort</IonLabel>
            <IonInput
              type="password"
              value={newUserPassword}
              onIonChange={(e: any) => setNewUserPassword(e.detail.value)}
            ></IonInput>
          </IonItem>

          <IonButton onClick={handleAddUser}>Hinzufügen</IonButton>
          <IonButton onClick={() => setShowAddUserModal(false)}>
            Abbrechen
          </IonButton>
        </IonModal>
        {editModeEnabled ? (
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton onClick={handleUserDelete}>
              <IonIcon icon={trashBin}></IonIcon>
            </IonFabButton>
          </IonFab>
        ) : (
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
            <IonFabList side="top">
              <IonFabButton
                onClick={() => {
                  setinputPassword(generateRandomPassword);
                  setAlertState(true);
                }}
              >
                <IonIcon icon={add}></IonIcon>
              </IonFabButton>
              <IonFabButton
                onClick={() => {setEditModeEnabled(!editModeEnabled); setSelectedUsers([])} }
              >
                <IonIcon icon={pencil}></IonIcon>
              </IonFabButton>
            </IonFabList>
          </IonFab>
        )}
        <IonAlert
          isOpen={alertState}
          header="Please enter user data"
          buttons={["OK", "CANCEL"]}
          inputs={[
            {
              placeholder: "username",
              value: inputUsername,
            },
            {
              placeholder: "email",
              value: inputEmail,
            },
            {
              placeholder: "password",
              value: inputPassword,
            },
          ]}
          onDidDismiss={handleAlertDismiss}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default UserTable;
