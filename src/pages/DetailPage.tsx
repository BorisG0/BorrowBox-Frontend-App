import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import BorrowItem from '../components/BorrowItem';
import { useParams } from 'react-router-dom';

const DetailPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();  return (
    <IonPage>
      <IonContent fullscreen>
        test {id}
      </IonContent>
    </IonPage>
  );
};

export default DetailPage;