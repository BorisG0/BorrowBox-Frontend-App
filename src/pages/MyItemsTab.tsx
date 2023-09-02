import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import BorrowItem from '../components/BorrowItem';

const MyItemsTab: React.FC<{ myItems: any[], setMyItems: React.Dispatch<React.SetStateAction<any[]>> }> 
    = ({myItems, setMyItems}) => {

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

            <BorrowItem item={item} />

            {myItems.map((item, index) =>
                <BorrowItem item={item} key={index}/>
            )}

        </IonContent>
        </IonPage>
    );
};

export default MyItemsTab;
