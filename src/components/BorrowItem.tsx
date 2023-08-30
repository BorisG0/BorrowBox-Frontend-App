import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip } from "@ionic/react";

const BorrowItem: React.FC = () => {
    return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Ausgestopfter Papagei</IonCardTitle>
                <IonCardSubtitle>
                    <IonChip color="primary">Biologie</IonChip>
                    <IonChip color="secondary">Tier</IonChip>
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
        </IonCard>
    )
}

export default BorrowItem;