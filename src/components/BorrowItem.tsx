import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonImg,
} from "@ionic/react";
import { useEffect, useState } from "react";
import BorrowReturnButton from "./BorrowReturnButton";
import { fetchItemImage } from "../apiService";

const BorrowItem: React.FC<{
  item: any;
  isFunctionStartRental: boolean;
}> = ({ item, isFunctionStartRental }) => {
  const [isItemAvailable, setIsItemAvailable] = useState(item.available);
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    setIsItemAvailable(item.available);
  }
  , [item.available]);

  useEffect(() => {
    async function fetchData(){
        try{
          const url = await fetchItemImage(item._id);
          setImageURL(url);
        }catch(error){
          setImageURL("https://content.mycutegraphics.com/graphics/household/box-black-white.png")
        }
    }
    fetchData()
  }, [item])

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            {item.name}
            <div style={{ float: "right" }}>
              {isItemAvailable ? (
                <IonChip color="success">Verfügbar</IonChip>
              ) : (
                <IonChip color="danger">Nicht Verfügbar</IonChip>
              )}
            </div>
          </IonCardTitle>
          <IonCardSubtitle>
            {item.location}
            <div style={{ float: "right" }}>
              {item.tags?.map((tag: string, index: number) => (
                <IonChip key={index}>{tag}</IonChip>
              ))}
            </div>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <IonImg src={imageURL} />
        </IonCardContent>

        <div style={{ float: "right", padding: "10px" }}>
          <IonButton routerLink={`/item/${item._id}`} fill="clear">Details</IonButton>
          <BorrowReturnButton item={item} isFunctionStartRental={isFunctionStartRental} isItemAvailable={isItemAvailable} setIsItemAvailable={setIsItemAvailable}/>
        </div>
      </IonCard>
    </>
    
  );
};

export default BorrowItem;
