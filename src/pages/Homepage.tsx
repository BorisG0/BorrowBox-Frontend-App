import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonItemOptions,
  IonItemOption,
  IonButton,
  IonButtons,
  IonAlert,
} from "@ionic/react";
import { logoIonic, book, camera } from "ionicons/icons";
import { Camera } from "@ionic-native/camera";

interface CartItem {
  id: number;
  name: string;
  icon: string;
  quantity: number;
}

interface Tab1Props {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isAuthenticated: boolean;
}

const Tab1: React.FC<Tab1Props> = ({ cartItems, setCartItems, isAuthenticated }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CartItem[]>([]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const sampleData: CartItem[] = [
    {
      id: 1,
      name: "Lernschieber",
      icon: logoIonic,
      quantity: 0,
    },
    {
      id: 2,
      name: "Buch",
      icon: book,
      quantity: 0,
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
    console.log(cartItems)
  };

  const handleConsoleClick = async () => {
    handleOpenPopup();
    try {
      const image = await Camera.getPicture({
        quality: 90,
        allowEdit: true,
        sourceType: Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.DATA_URL,
      });

      console.log("Image data:", image);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleSearchInputChange = (event: CustomEvent) => {
    const value = event.detail.value || "";
    setSearchQuery(value);
    // Mock search results based on sampleData
    const results = sampleData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <IonPage>
      <IonContent>
        <div
          style={{
            textAlign: "center",
            marginTop: "10rem",
            marginBottom: "1rem",
          }}
        >
          <h2>Herzlich willkommen user</h2>
          <IonSearchbar
            placeholder="Was möchtest du ausleihen?"
            onIonChange={handleSearchInputChange}
          >
            <IonButtons slot="end">
              <IonButton onClick={handleConsoleClick}>
                <IonIcon icon={camera} size="large" />
              </IonButton>
            </IonButtons>
          </IonSearchbar>
          {searchQuery.length > 0 && (
            <div style={{ position: "relative", zIndex: 1 }}>
              <IonList>
                {searchResults.length != 0 ? (
                  searchResults.map((item) => (
                    <IonItemSliding key={item.id}>
                      <IonItem onClick={() => handleAddItemClick(item)}>
                        <IonAvatar slot="start">
                          <IonIcon icon={item.icon} size="large" />
                        </IonAvatar>
                        <IonLabel>{item.name}</IonLabel>
                      </IonItem>
                      <IonItemOptions side="end">
                        <IonItemOption color="danger" expandable>
                          Löschen
                        </IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                  ))
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <p>Keine Elemente vorhanden.</p>
                  </div>
                )}
              </IonList>
            </div>
          )}
        </div>
        <IonList style={{ marginTop: "10%", backgroundcolor: "transparent" }}>
          {sampleData.map((item) => (
            <IonItemSliding key={item.id}>
              <IonItem
                onClick={() => handleAddItemClick(item)}
                style={{ marginBottom: "1rem" }}
              >
                <IonAvatar slot="start">
                  <IonIcon icon={item.icon} size="large" />
                </IonAvatar>
                <IonLabel>{item.name}</IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger" expandable>
                  Löschen
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
        <IonAlert
          isOpen={showPopup}
          onDidDismiss={handleClosePopup}
          header="Einfaches Popup"
          message="Hier soll sich die Kamera öffnen"
          buttons={[
            {
              text: "Abbrechen",
              role: "cancel",
              handler: handleClosePopup,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
