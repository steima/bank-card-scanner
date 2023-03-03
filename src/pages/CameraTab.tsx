import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar, useIonLoading
} from '@ionic/react';
import {Camera, CameraResultType} from '@capacitor/camera';
import './CameraTab.css';
import React, {useState} from "react";
import {apiLayerOcrAdapter} from "../libs/apiLayerOcrAdapter";
import {apiLayerBankDataAdapter, BankData} from "../libs/apiLayerBankDataAdapter";
import {useBankDataHistoryContext} from "../context/BankDataHistoryContext";

const CameraTab: React.FC = () => {
    const [currentPicture, setCurrentPicture] = useState<string>();
    const [iban, setIban] = useState<string>();
    const [bankData, setBankData] = useState<BankData>();

    const bankDataHistoryContext = useBankDataHistoryContext();

    const [present, dismiss] = useIonLoading();

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        });
        if(image.dataUrl) {
            setCurrentPicture(image.dataUrl);
            try {
                await present('Processing image ...');
                const tmpIban = await apiLayerOcrAdapter.getOcrResult(image.dataUrl);
                setIban(tmpIban);
                const tmpBankData = await apiLayerBankDataAdapter.getBankData(tmpIban);
                setBankData(tmpBankData);
                bankDataHistoryContext.addBankData(tmpBankData);
            }catch (e) {
                console.error(e);
            }finally {
                await dismiss();
            }
        }
    };

    const clear = () => {
        setCurrentPicture(undefined);
        setIban(undefined);
        setBankData(undefined);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Scan card</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Scan card</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {!currentPicture && <div className="info-box">Please scan a bank card to start</div>}
                            {currentPicture && <img src={currentPicture} alt=""/>}
                        </IonCol>
                    </IonRow>
                    {iban &&
                        <>
                            <IonRow>
                                <IonCol>
                                    <IonText color="primary">OCR result:</IonText>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonText>{iban}</IonText>
                                </IonCol>
                            </IonRow>
                        </>
                    }
                    {bankData &&
                        <>
                            {!bankData.valid &&
                                <IonRow>
                                    <IonCol>
                                        <IonText color="danger">Invalid IBAN</IonText>
                                    </IonCol>
                                </IonRow>
                            }
                            {bankData.valid &&
                                <>
                                    <IonRow>
                                        <IonCol>
                                            <IonText color="primary">Bank data:</IonText>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol>
                                            <IonText>{bankData.bank_data.name}</IonText>
                                        </IonCol>
                                    </IonRow>
                                    <IonRow>
                                        <IonCol>
                                            <IonText>{bankData.bank_data.city}</IonText>
                                        </IonCol>
                                    </IonRow>
                                </>
                            }
                        </>
                    }
                    <IonRow>
                        <IonCol>
                            <IonButton shape="round" expand="block" color="primary" onClick={takePicture}>Take a picture</IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton shape="round" expand="block" color="secondary" onClick={clear}>Clear</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default CameraTab;
