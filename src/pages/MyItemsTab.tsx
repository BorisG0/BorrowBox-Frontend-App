import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BorrowItem from "../components/BorrowItem";

const MyItemsTab: React.FC<{
  myItems: any[];
  returnItem: (item: any) => void;
  loginToken: any;
}> = ({ myItems, returnItem, loginToken }) => {

  const [items, setItems] = useState([] as any[]);

  useEffect(() => {
    async function fetchItems(){
      try{
        const itemData = await fetchUserItemData();
        setItems(itemData.data.items);
        console.log(itemData.data);
      }catch(error){
        console.log(error);
      }
    }
    fetchItems();
  }, [])

  if (!loginToken) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonHeader>
            <IonToolbar>
              <IonTitle>My Items</IonTitle>
            </IonToolbar>
          </IonHeader>
          {/* TODO: Schön machen */}
          <div>Bitte melden Sie sich an, um diese Seite anzuzeigen.</div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonTitle>My Items</IonTitle>
          </IonToolbar>
        </IonHeader>
        {myItems.map((item, index) => (
          <BorrowItem
            item={item}
            key={index}
            loginToken={loginToken}
            itemActionText="zurückgeben"
            isFunctionStartRental={true}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MyItemsTab;
