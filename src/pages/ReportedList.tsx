import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Route, RouteComponentProps } from "react-router";
import { deleteItem, fetchReports, fixReport } from "../apiService";
import { arrowBack } from "ionicons/icons";
import { checkLoginStatus } from "../data/utils";

interface ReportedListProps extends RouteComponentProps {
  history: any;
}
type FixedReport = {
  userId: string;
  itemId: string;
}
interface Report {
  _id: string;
  description: string;
  itemName: string;
  time: string;
  userName: string;
}
const ReportedList: React.FC<ReportedListProps> = ({ history }) => {
  const [fixSheet, setFixSheet] = useState(false);
  const [currentEntry, setCiurrentEntry] = useState();

  const [reports, setReports] = useState<Report[]>([]);
  // Andere State-Variablen hier ...

  const handleFixButtonClick = (reportId: any) => {
    setCiurrentEntry(reportId);
    setFixSheet(true);
    console.log(`Problem beheben für Report ID: ${reportId.itemId}`);
  };

  const handleRemoveItem = (reportId: any) => {
    try {
      deleteItem(reportId); 
      setReports((prevReports) =>
        prevReports.filter((report) => report._id !== reportId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFixReport = async (report: any) => {
    try {
      console.log(report);
      const userId = await checkLoginStatus();
      const fixedReport: FixedReport = {
        userId: userId + "",
        itemId: report.itemId + "",
      }
      fixReport(fixedReport); 
/*       setReports((prevReports) =>
        prevReports.filter((report) => report._id !== reportId)
      ); */
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchReports();
        if (response.data != null) {
          setReports(response.data);
        }
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButton
              color="light"
              slot="start"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                history.push("/user");
              }}
            >
              <IonIcon icon={arrowBack} />
            </IonButton>
            <IonTitle style={{ marginLeft: "8px" }}>
              Gemeldete Gegenstände
            </IonTitle>
          </IonToolbar>
          <IonList>
            {reports.map((report: any) => (
              <IonItem key={report._id}>
                <IonLabel>
                  <h2>{report.itemName}</h2>
                  <p>{report.description}</p>
                  <p>{report.userName}</p>
                </IonLabel>
                <IonButton
                  expand="full"
                  fill="clear"
                  onClick={() => handleFixButtonClick(report)}
                >
                  Beheben
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </IonHeader>
        <IonActionSheet
          isOpen={fixSheet}
          buttons={[
            {
              text: "Entfernen",
              role: "destructive",
              data: {
                action: "delete",
              },
            },
            {
              text: "Problem behoben",
              data: {
                action: "fix",
              },
            },
            {
              text: "Abbrechen",
              role: "cancel",
              data: {
                action: "cancel",
              },
            },
          ]}
          onDidDismiss={(detail) => {
            if (detail.detail.data?.action === "delete") {
              handleRemoveItem(currentEntry);
            } else if (detail.detail.data?.action === "fix") {
              handleFixReport(currentEntry);
            }
            setFixSheet(false);
          }}
        ></IonActionSheet>
      </IonContent>
    </IonPage>
  );
};
export default ReportedList;
