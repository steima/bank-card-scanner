import {
    IonCheckbox,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './SettingsTab.css';
import React, {useState} from "react";

const SettingsTab: React.FC = () => {
    const [text, setText] = useState<string>();
    const [logic, setLogic] = useState<boolean>(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel>Texteingabe:</IonLabel>
                                <IonInput value={text} onIonChange={e => setText(e.detail.value!)}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonCheckbox slot="start" checked={logic} onIonChange={e => setLogic(e.detail.checked)}></IonCheckbox>
                                <IonLabel>I agree to the terms and conditions</IonLabel>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default SettingsTab;
