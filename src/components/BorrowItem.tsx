import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
} from "@ionic/react";
import { endRental, startRental } from "../apiService";

const BorrowItem: React.FC<{
  item: any;
  isFunctionStartRental: boolean;
  loginToken: boolean;
}> = ({ item, isFunctionStartRental, loginToken }) => {

  const handleStartRental = async () => {
    try{
      const response = await startRental(item._id);
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }

  const handleEndRental = async () => {
    try{
      console.log("ending rental")
      const response = await endRental(item._id);
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {item.name}
          <div style={{ float: "right" }}>
            {item.available ? (
              <IonChip color="success">Verfügbar</IonChip>
            ) : (
              <IonChip color="danger">Ausgeliehen</IonChip>
            )}
          </div>
        </IonCardTitle>
        <IonCardSubtitle>
          {item.tags?.map((tag: string, index: number) => (
            <IonChip key={index}>{tag}</IonChip>
          ))}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent></IonCardContent>

      <div style={{ float: "right", padding: "10px" }}>
        <IonButton routerLink={`/item/${item._id}`} fill="clear">Details</IonButton>
        <IonButton
          onClick={ (isFunctionStartRental ? handleStartRental: handleEndRental) }
          disabled={(!loginToken) || (!item.available && isFunctionStartRental)} // Deaktiviere den Button, wenn nicht authentifiziert oder Item nicht verfügbar
        >
          {isFunctionStartRental ? "Ausleihen" : "Zurückgeben"}
        </IonButton>
      </div>
    </IonCard>
  );
};

export default BorrowItem;
