import React, { useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonAvatar,
  IonText,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {
  personCircle,
  informationCircle,
  settings,
  logOut,
} from "ionicons/icons";
import { RouteComponentProps } from "react-router-dom";
import { deleteCookie } from "../data/utils";

interface UserProfileProps extends RouteComponentProps {}

const UserLoginSwitch: React.FC<
  UserProfileProps & {
    loginToken: any;
  }
> = ({ loginToken, history }) => {
  useEffect(() => {
    if (loginToken) {
      history.push("borrow");
    } else {
      history.push("login");
    }
  });
  return <div></div>;
};

export default UserLoginSwitch;
