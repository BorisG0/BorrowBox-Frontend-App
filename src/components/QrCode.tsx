import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonImg,
} from '@ionic/react';
import QRCode from 'qrcode.react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeText: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, qrCodeText }) => {
    //qrCodeText = "prefix/" + qrCodeText;
    qrCodeText = "https://www.google.com";

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QR Code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
        <QRCode value={qrCodeText} size={200} />
        <IonButton expand="full" onClick={onClose}>
          Close
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default QRCodeModal;
