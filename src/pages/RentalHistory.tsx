import {
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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { fetchCurrentUser, fetchRentalHistory } from "../apiService";

interface RentalHistoryProps extends RouteComponentProps {
  history: any;
}

interface RentalHistory {
  start: string ;
  end: string ;
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
/*         setExampleRentalData([
          {
            start: { $date: "2023-09-20T15:12:34.211Z" },
            end: { $date: "2023-09-20T15:25:22.320Z" },
            item: "Laptop",
            active: false,
            userName: "John Doe",
          },
          {
            start: { $date: "2023-09-19T12:30:00.000Z" },
            end: { $date: "2023-09-19T14:45:00.000Z" },
            item: "Camera",
            active: true,
            userName: "Jane Smith",
          },
          {
            start: { $date: "2023-09-18T10:00:00.000Z" },
            end: { $date: "2023-09-18T11:30:00.000Z" },
            item: "Projector",
            active: false,
            userName: "Admin User",
          },
        ]); */
        const data = await fetchRentalHistory();
        setExampleRentalData(data.data);
        console.log(data.data);
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
      </IonContent>
    </IonPage>
  );
};

export default RentalHistory;
