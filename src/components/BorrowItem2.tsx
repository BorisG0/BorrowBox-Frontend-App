import React, { useEffect, useState } from "react";
import BorrowReturnButton from "./BorrowReturnButton";
import { fetchItemImage } from "../apiService";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonChip,
  IonImg,
  IonCol,
  IonGrid,
  IonRow,
  IonThumbnail,
  IonLabel,
} from "@ionic/react";

import "./BorrowItem2.css";
import { RouteComponentProps } from "react-router";

interface ContainerProps {
    item: any;
    isFunctionStartRental: boolean;
    navigate: (src: string) => void;
}

const BorrowItem2: React.FC<ContainerProps> = ({ item, isFunctionStartRental, navigate }) => {
  const [isItemAvailable, setIsItemAvailable] = useState(item.available);
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    setIsItemAvailable(item.available);
  }, [item.available]);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = await fetchItemImage(item._id);
        setImageURL(url);
      } catch (error) {
        setImageURL("");
      }
    }
    fetchData();
  }, [item]);

  return (
    <>
      <IonCol
        size="auto"
        className="ion_col_custom"
        style={{ minWidth: "170px", maxWidth: "180px",backgroundcolor: "red" }}
      >
        <IonCardTitle>{item.name}</IonCardTitle>
        <IonCardSubtitle>{item.location}</IonCardSubtitle>
        <IonCardContent>
          <IonThumbnail onClick={() => {       window.location.href = `/item/${item._id}`; }}>
            {imageURL ? <img src={imageURL} /> : <img src="/box_logo.png" />}
          </IonThumbnail>
        </IonCardContent>
        <div style={{ float: "right", padding: "10px" }}>
          {isItemAvailable ? (
            <BorrowReturnButton
              item={item}
              isFunctionStartRental={isFunctionStartRental}
              isItemAvailable={isItemAvailable}
              setIsItemAvailable={setIsItemAvailable}
            />
          ) : (
            <IonChip color="danger" style={{textAlign: "center"}}>nicht verfügbar</IonChip>
          )}
        </div>
      </IonCol>
    </>
  );
};

export default BorrowItem2;
