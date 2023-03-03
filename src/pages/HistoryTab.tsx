import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow, IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './HistoryTab.css';
import {useBankDataHistoryContext} from "../context/BankDataHistoryContext";
import React from "react";

const HistoryTab: React.FC = () => {
    const bankDataHistoryContext = useBankDataHistoryContext();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>History</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {bankDataHistoryContext.history.length == 0 &&
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonHeader>
                                    <IonText>
                                        <h2 className="emptyState">History is empty</h2>
                                    </IonText>
                                </IonHeader>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
                <IonList>
                    {bankDataHistoryContext.history.map((bankData, index) =>
                        <IonItem key={index}>
                            <IonLabel>{bankData.iban}</IonLabel>
                            {bankData.valid &&<IonLabel>{bankData.bank_data.name}</IonLabel>}
                        </IonItem>
                    )}
                </IonList>
                {bankDataHistoryContext.history.length > 0 &&
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonButton shape="round" expand="block" color="secondary" onClick={() => bankDataHistoryContext.clearHistory()}>Clear history</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                }
            </IonContent>
        </IonPage>
    );
};

export default HistoryTab;
