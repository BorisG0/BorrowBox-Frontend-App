import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonButton,
  IonBadge,
  IonFooter,
} from "@ionic/react";
import {
  logoIonic,
  closeCircle,
  addCircle,
  removeCircle,
  book,
} from "ionicons/icons";

interface CartItem {
  id: number;
  name: string;
  icon: string;
  quantity: number;
}
interface Tab2Props {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Tab2: React.FC<Tab2Props> = ({ cartItems, setCartItems }) => {
  const [borrowedItems, setBorrowedItems] = useState([] as CartItem[]);
  const sampleData: CartItem[] = [
    {
      id: 1,
      name: "Lernschieber",
      icon: logoIonic,
      quantity: 0
    },
    {
      id: 2,
      name: "Buch",
      icon: book,
      quantity: 0
    },
    // Weitere Beispiele hier...
  ];

  const handleAddItemClick = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === existingItem.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(updatedCartItems);
    }
  };

  const handleRemoveItemClick = (item: CartItem) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem && existingItem.quantity > 1) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === existingItem.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      handleRemoveItemClick(item);
    }
  };
  const handleCheckout = () =>{
    setCartItems([]);
  };
  return (
    <IonPage>
      <IonContent>
        {cartItems.length === 0 ? (

            borrowedItems.length != 0 ? ( 
              <IonList>
              {cartItems.map((item) => (
                <IonItem key={item.id}>
                  <IonAvatar slot="start">
                    <IonIcon icon={item.icon} size="large" />
                  </IonAvatar>
                  <IonLabel>{item.name}</IonLabel>
                  <IonButton
                    color="danger"
                    slot="end"
                    onClick={() => handleRemoveItemClick(item)}
                  >
                    <IonIcon icon={closeCircle} />
                  </IonButton>
                  <IonButton
                    color="primary"
                    slot="end"
                    onClick={() => handleAddItemClick(item)}
                  >
                    <IonIcon icon={addCircle} />
                  </IonButton>
                  <IonButton
                    color="primary"
                    slot="end"
                    onClick={() => handleDecreaseQuantity(item)}
                  >
                    <IonIcon icon={removeCircle} />
                  </IonButton>
                  <IonBadge color="dark">{item.quantity}</IonBadge>
                </IonItem>
              ))}
              </IonList> ) : ( 
                <div style={{ textAlign: "center", marginTop: "20%" }}>
                <p>Keine Elemente vorhanden.</p>
                </div>
                )
         ) : (
        <IonList>
          {cartItems.map((item) => (
            <IonItem key={item.id}>
              <IonAvatar slot="start">
                <IonIcon icon={item.icon} size="large" />
              </IonAvatar>
              <IonLabel>{item.name}</IonLabel>
              <IonButton
                color="danger"
                slot="end"
                onClick={() => handleRemoveItemClick(item)}
              >
                <IonIcon icon={closeCircle} />
              </IonButton>
              <IonButton
                color="primary"
                slot="end"
                onClick={() => handleAddItemClick(item)}
              >
                <IonIcon icon={addCircle} />
              </IonButton>
              <IonButton
                color="primary"
                slot="end"
                onClick={() => handleDecreaseQuantity(item)}
              >
                <IonIcon icon={removeCircle} />
              </IonButton>
              <IonBadge color="dark">{item.quantity}</IonBadge>
            </IonItem>
          ))}
        </IonList>
        )}
      </IonContent>
      <IonFooter>
        {cartItems.length != 0 ? (
        <IonToolbar>
          <IonButton expand="full" color="success" onClick={handleCheckout}>
            Ausleihen
          </IonButton>
        </IonToolbar>
        ) : (
          borrowedItems.length != 0 ? (
          <IonToolbar>
            <IonButton expand="full" color="success" onClick={handleCheckout}>
              Rückgabe
            </IonButton>
          </IonToolbar>
          ) : ( <div></div> ) )}
      </IonFooter>
    </IonPage>
  );
};

export default Tab2;
