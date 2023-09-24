import { IonAvatar, IonIcon, IonText } from "@ionic/react";
import { fileTrayStackedOutline } from "ionicons/icons";
import React from "react";

interface EmtpyPageProps {
  message: string;
}

const EmptyPage: React.FC<EmtpyPageProps> = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginBottom: "10px",
        height: "70vh",
      }}
    >
      {" "}
      <IonAvatar
        style={{
          width: "120px",
          height: "120px",
          margin: "20px auto",
          boxShadow: "0px 0px 10px 0px rgba(200, 200, 200, 0.5)", // Hinzugefügte Schatten-Stilregel
        }}
      >
        <IonIcon
          icon={fileTrayStackedOutline}
          style={{
            fontSize: "80px",
            color: "#626262",
            marginTop: "15px",
          }}
        />
      </IonAvatar>
      <IonText style={{ fontSize: "24px" }}>{message}</IonText>
    </div>
  );
};

export default EmptyPage;