import { Redirect, Route, useHistory } from "react-router-dom";
import {
  IonApp,
  IonBadge,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { addCircle, layers, person } from "ionicons/icons";
import UserProfile from "./pages/User";
import MyItemsTab from "./pages/MyItemsTab";
import DetailPage from "./pages/DetailPage";

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
import BorrowTab from "./pages/BorrowTab";
import Login from "./pages/Login";
import { checkLoginStatus } from "./data/utils";
import UserTable from "./pages/UserManagement";
import Test from "./pages/Test";
import RentalHistory from "./pages/RentalHistory";

setupIonicReact();

const App: React.FC = () => {
  const [loginToken, setLoginToken] = useState(String);

  useEffect(() => {
    const loginToken = checkLoginStatus();
    if (loginToken) {
      setLoginToken(loginToken);
    }
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
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
            <Route exact path="/item/:id">
              <DetailPage />
            </Route>
            <Route exact path="/borrow">
              <BorrowTab/>
            </Route>
            <Route exact path="/myItems">
              <MyItemsTab/>
            </Route>
            <Route exact path="/test">
              <Test/>
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
            path="/usermanagement"
            render={(props) => ( <UserTable {...props} loginToken={loginToken}/> ) } />
            <Route
            exact
            path="/rentalhistory"
            render={(props) => ( <RentalHistory {...props}/> ) } />
            <Route
              exact
              path="/"
              render={(props) => (
                <UserProfile {...props} loginToken={loginToken} setLoginToken={setLoginToken} />
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
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
