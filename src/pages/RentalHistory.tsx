import {
  IonAvatar,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, fileTrayStackedOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { fetchCurrentUser, fetchRentalHistory } from "../apiService";
import EmptyPage from "../components/EmptyPage";

interface RentalHistoryProps extends RouteComponentProps {
  history: any;
}

interface RentalHistory {
  start: string;
  end: string;
  itemName: string;
  active: boolean;
  userName: string;
}

const RentalHistory: React.FC<RentalHistoryProps> = ({ history }) => {
  const [exampleRentalData, setExampleRentalData] = useState<RentalHistory[]>(
    []
  );
  const [showMoreItems, setShowMoreItems] = React.useState(10);
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      try {
        const data = await fetchCurrentUser();
        if (data.data.role === "admin") setIsAdmin(true);
      } catch (error) {
        console.log(error);
      }
      try {
        const data = await fetchRentalHistory();
        if (data.data !== null) {
          setExampleRentalData(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginAndFetchData();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IonIcon
                icon={arrowBack}
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  history.push("/user");
                }}
              />
              <IonTitle style={{ marginLeft: "8px" }}>Benutzertabelle</IonTitle>
            </div>
          </IonToolbar>
        </IonHeader>

        {exampleRentalData.length === 0 ? (
          <EmptyPage message="Keine Einträge vorhanden" />
        ) : (
          <IonList>
            {exampleRentalData.slice(0, showMoreItems).map((rental, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>{rental.itemName}</h2>
                  <p>
                    Start: {new Date(rental.start).toLocaleString()} <br />
                    End: {new Date(rental.end).toLocaleString()} <br />
                    {isAdmin && rental.userName && (
                      <span>User: {rental.userName}</span>
                    )}
                  </p>
                </IonLabel>
                {rental.active && (
                  <IonChip color="primary" slot="end">
                    Active
                  </IonChip>
                )}
              </IonItem>
            ))}
            {exampleRentalData.length > showMoreItems && (
              <IonInfiniteScroll
                threshold="100px"
                disabled={showMoreItems >= exampleRentalData.length}
                onIonInfinite={(e) => {
                  setTimeout(() => {
                    setShowMoreItems(showMoreItems + 10);
                    (e.target as HTMLIonInfiniteScrollElement).complete();
                  }, 1000);
                }}
              >
                <IonInfiniteScrollContent
                  loadingText="Loading more items..."
                  loadingSpinner="bubbles"
                ></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            )}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default RentalHistory;
