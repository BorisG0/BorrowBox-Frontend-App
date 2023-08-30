import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip } from "@ionic/react";

const BorrowItem: React.FC<{ item: any}> = ({item}) => {
    return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    {item.name}
                    <div style={{float: "right"}}>
                        {item.available ? <IonChip color="success">Verfügbar</IonChip> : <IonChip color="danger">Ausgeliehen</IonChip>}
                    </div>
                </IonCardTitle>
                <IonCardSubtitle>
                    {item.tags.map((tag: string, index: number) =>
                        <IonChip key={index}>{tag}</IonChip>
                    )}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
            
            <div style={{float: "right", padding: "10px"}}>
                <IonButton fill="clear">Details</IonButton>
                <IonButton>Ausleihen</IonButton>
            </div>
            
        </IonCard>
    )
}

export default BorrowItem;