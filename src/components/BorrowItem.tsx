import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip } from "@ionic/react";

const BorrowItem: React.FC<{ item: any}> = ({item}) => {
    return(
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{item.name}</IonCardTitle>
                <IonCardSubtitle>
                    {item.tags.map((tag: string, index: number) =>
                        <IonChip key={index}>{tag}</IonChip>
                    )}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
            <IonButton>Details</IonButton>
            <IonButton>Borrow</IonButton>
        </IonCard>
    )
}

export default BorrowItem;