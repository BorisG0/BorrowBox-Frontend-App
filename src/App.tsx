import { Redirect, Route, useHistory } from "react-router-dom";
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
import { addCircle, layers, person } from "ionicons/icons";
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
import Login from "./pages/Login";
import { checkLoginStatus } from "./data/utils";
import UserLoginSwitch from "./pages/UserLoginSwitch";

setupIonicReact();

const App: React.FC = () => {
  const [availableItems, setAvailableItems] = useState([] as any[]);
  const [myItems, setMyItems] = useState([] as any[]);
  const [loginToken, setLoginToken] = useState(String);
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
    },
  ];

  useEffect(() => {
    setAvailableItems(dummyItems);
    const loginToken = checkLoginStatus();
    if (loginToken) {
      setLoginToken(loginToken);
    }
  }, []);

  const borrowItem = (item: any) => {
    const updatedAvailableItems = availableItems.filter(
      (availableItem) => availableItem.id !== item.id
    );
    setAvailableItems(updatedAvailableItems);
    const updatedMyItems = [...myItems, item];
    setMyItems(updatedMyItems);
  };

  const returnItem = (item: any) => {
    const updatedMyItems = myItems.filter((myItem) => myItem.id !== item.id);
    setMyItems(updatedMyItems);
    const updatedAvailableItems = [...availableItems, item];
    setAvailableItems(updatedAvailableItems);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonHeader>
          <Header loginToken={loginToken} />
        </IonHeader>
        <IonContent>
          <IonTabs>
            <IonRouterOutlet>
              <Route
                exact
                path="/user"
                render={(props) => (
                  <UserProfile
                    {...props}
                    loginToken={loginToken}
                    setLoginToken={setLoginToken}
                  />
                )}
              />
              <Route exact path="/borrow">
                <BorrowTab
                  availableItems={availableItems}
                  borrowItem={borrowItem}
                  loginToken={loginToken}
                />
              </Route>
              <Route exact path="/myItems">
                <MyItemsTab
                  myItems={myItems}
                  returnItem={returnItem}
                  loginToken={loginToken}
                />
              </Route>
              <Route
                exact
                path="/login"
                render={(props) => (
                  <Login {...props} setLoginToken={setLoginToken} />
                )}
              />
              <Route
                exact
                path="/"
                render={(props) => (
                  <UserLoginSwitch {...props} loginToken={loginToken} />
                )}
              ></Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="borrow" href="/borrow">
                <IonIcon aria-hidden="true" icon={addCircle} />
                <IonLabel>Borrow</IonLabel>
              </IonTabButton>
              <IonTabButton tab="myItems" href="/myItems">
                <IonIcon aria-hidden="true" icon={layers} />
                <IonLabel>My Items</IonLabel>
              </IonTabButton>
              <IonTabButton tab="User" href="/user">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>User</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonContent>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
