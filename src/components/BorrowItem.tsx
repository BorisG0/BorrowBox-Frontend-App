import { useAuth0 } from "@auth0/auth0-react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
} from "@ionic/react";

const BorrowItem: React.FC<{
  item: any;
  itemAction: (item: any) => void;
  itemActionText?: string;
}> = ({ item, itemAction, itemActionText }) => {
  const { isAuthenticated } = useAuth0();

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
        <IonButton fill="clear">Details</IonButton>
        <IonButton
          onClick={() => itemAction(item)}
          disabled={!isAuthenticated} // Deaktiviere den Button, wenn nicht authentifiziert
        >
          {itemActionText ? itemActionText : "Ausleihen"}
        </IonButton>
      </div>
    </IonCard>
  );
};

export default BorrowItem;
