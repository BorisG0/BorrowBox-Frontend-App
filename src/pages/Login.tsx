import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styles from "./Login.module.scss";

import { arrowBack, person, shapesOutline } from "ionicons/icons";
import CustomField from "../components/CustomField";
import { useLoginFields } from "../data/fields";
import { Wave } from "../components/Wave";
import { useEffect, useState } from "react";
import {
  checkLoginStatus,
  getLoginData,
  hashPassword,
  setCookie,
  validateForm,
} from "../data/utils";
import { RouteComponentProps, useParams } from "react-router";
import { fetchLogin } from "../apiService";
import CryptoJS from "crypto-js";

const Login: React.FC<
  RouteComponentProps & { setLoginToken: (loginToken: any) => void }
> = ({ history, setLoginToken }) => {
  const params = useParams();
  const fields = useLoginFields();
  const [errors, setErrors] = useState<{ id: any; message: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    const formErrors = validateForm(fields);
    setErrors(formErrors);
    if (formErrors.length === 0) {
      try {
        let loginData = getLoginData(fields);
        /*         loginData.email = "admin";
        loginData.password = "admin"; */
        // Passwort hashen
        const hashedPassword = await hashPassword(loginData.password);
        loginData.password = hashedPassword.toString(); // Verwenden Sie den gehashten Wert
        const response = await fetchLogin(loginData);
        if (response.data.loginToken) {
          setCookie("loginToken", response.data.loginToken, 1);
          setLoginToken(response.data.loginToken);
          history.push("/user");
        } else {
          setErrors([
            {
              id: "password",
              message: "Something went wrong",
            },
          ]);
        }
      } catch (error: any) {
        setErrors([
          {
            id: "password",
            message: "Something went wrong",
          },
          {
            id: "email",
            message: "Something went wrong",
          },
        ]);
        if (error.response.status != 401) {
          console.error(
            "An error occurred during login:",
            error.response.status
          );
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      fields.forEach((field) => field.input.state.reset(""));
      setErrors([]);
    };
  }, [params]);

  return (
    <IonPage className={styles.loginPage}>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Log in</IonTitle>
          </IonToolbar>
        </IonHeader>
        {isLoading && <IonProgressBar type="indeterminate" color="success" />}{" "}
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <h5>Welcome back, hope you're doing well</h5>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              {fields.map((field) => (
                <CustomField key={field.id} field={field} errors={errors} />
              ))}
              <IonButton
                className={styles.customButton}
                expand="block"
                onClick={login}
              >
                Login
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <Wave />
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
