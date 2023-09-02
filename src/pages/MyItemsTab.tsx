import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import BorrowItem from '../components/BorrowItem';

const MyItemsTab: React.FC = () => {

    const item = {
        id: 2,
        name: "Schutzbrillen",
        tags: ["Chemie", "Brille"],
        description: "Schutzbrillen für den Chemieunterricht.",
        available: true,
    };


    return (
        <IonPage>
        <IonContent fullscreen>
            <IonHeader>
            <IonToolbar>
                <IonTitle size="large">my items</IonTitle>
            </IonToolbar>
            </IonHeader>

            <BorrowItem item={item} />

        </IonContent>
        </IonPage>
    );
};

export default MyItemsTab;
