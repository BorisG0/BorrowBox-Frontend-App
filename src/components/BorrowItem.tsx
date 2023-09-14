import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
} from "@ionic/react";
import { startRental } from "../apiService";

const BorrowItem: React.FC<{
  item: any;
  isFunctionStartRental: boolean;
  itemActionText?: string;
  loginToken: boolean;
}> = ({ item, itemActionText, isFunctionStartRental, loginToken }) => {
  

  const newRental = {
    "userId": 'aaabbbaaabbbaaabbbaaabbb', //test id, muss noch richtig gesetzt werden
    "itemId": item._id
  }

  const handleStartRental = async () => {
    try{
      console.log(newRental)
      const response = await startRental(newRental);
      console.log(response);
    }catch(error){
      console.log(error);
    }
  }

  const handleEndRental = () => {
    console.log("End rental");
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
          disabled={!loginToken} // Deaktiviere den Button, wenn nicht authentifiziert
        >
          {itemActionText ? itemActionText : "Ausleihen"}
        </IonButton>
      </div>
    </IonCard>
  );
};

export default BorrowItem;
