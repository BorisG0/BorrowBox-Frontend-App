import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonBadge,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  square,
  triangle,
  cart,
  home,
  cube,
  apps,
  addCircle,
  layers,
} from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import UserProfile from "./pages/User";
import MyItemsTab from "./pages/MyItemsTab";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import BorrowTab from "./pages/BorrowTab";

setupIonicReact();
interface CartItem {
  id: number;
  name: string;
  icon: string;
  quantity: number;
}

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState([] as CartItem[]);

  const [availableItems, setAvailableItems] = useState([] as any[]);
  const [myItems, setMyItems] = useState([] as any[]);

  const dummyItems = [
      {
          id: 1,
          name: "Ausgestopfter Papagei",
          tags: ["Biologie", "Tier"],
          description: "Ein ausgestopfter Papagei, der auf einem Ast sitzt.",
          available: true,
      },
      {
          id: 2,
          name: "Schutzbrillen",
          tags: ["Chemie", "Brille"],
          description: "Schutzbrillen für den Chemieunterricht.",
          available: true,
      },
      {
          id: 3,
          name: "Experiment Handbuch",
          tags: ["Buch", "Chemie"],
          description: "Ein Handbuch mit vielen Experimenten.",
          available: true,
      }
  ]

  useEffect(() => {
      setAvailableItems(dummyItems);
  }, []);

  const borrowItem = (item: any) => {
    const updatedAvailableItems = availableItems.filter((availableItem) => availableItem.id !== item.id);
    setAvailableItems(updatedAvailableItems);
    const updatedMyItems = [...myItems, item];
    setMyItems(updatedMyItems);
  }

  const returnItem = (item: any) => {
    const updatedMyItems = myItems.filter((myItem) => myItem.id !== item.id);
    setMyItems(updatedMyItems);
    const updatedAvailableItems = [...availableItems, item];
    setAvailableItems(updatedAvailableItems);
  }

  return (
    <IonApp>
      <IonHeader>
        <Header />
      </IonHeader>
      <IonContent>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 cartItems={cartItems} setCartItems={setCartItems} />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route exact path="/tab2">
                <Tab2 cartItems={cartItems} setCartItems={setCartItems} />
              </Route>
              <Route exact path="/user">
                <UserProfile/>
              </Route>
              <Route exact path="/borrow">
                <BorrowTab availableItems={availableItems} borrowItem={borrowItem}/>
              </Route>
              <Route exact path="/myItems">
                <MyItemsTab myItems={myItems} returnItem={returnItem}/>
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tab1">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3">
                <IonIcon aria-hidden="true" icon={apps} />
                <IonLabel>Categories</IonLabel>
              </IonTabButton>
              <IonTabButton tab="cart" href="/tab2">
                <IonIcon aria-hidden="true" icon={cube} />
                <IonLabel>Borrow Box</IonLabel>
                {cartItems.length > 0 && (
                  <IonBadge color="danger">{cartItems.length}</IonBadge>
                )}
              </IonTabButton>
              <IonTabButton tab="borrow" href="/borrow">
                <IonIcon aria-hidden="true" icon={addCircle} />
                <IonLabel>Borrow</IonLabel>
              </IonTabButton>
              <IonTabButton tab="myItems" href="/myItems">
                <IonIcon aria-hidden="true" icon={layers} />
                <IonLabel>My Items</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
      
      
    </IonApp>
  );
};

export default App;
