import { IonContent, IonPage } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';

const MyItemsTab: React.FC<{
        myItems: any[],
        returnItem: (item: any) => void,
    }> = ({myItems, returnItem}) => {

    const item = {
        id: 1,
        name: "My Test Item",
        tags: ["Chemie", "Brille"],
        description: "Schutzbrillen für den Chemieunterricht.",
        available: true,
    };


    return (
        <IonPage>
        <IonContent fullscreen>

            {myItems.map((item, index) =>
                <BorrowItem item={item} itemAction={returnItem} key={index} itemActionText='zurückgeben'/>
            )}

        </IonContent>
        </IonPage>
    );
};

export default MyItemsTab;
