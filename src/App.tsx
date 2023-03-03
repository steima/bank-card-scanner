import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {ellipse, square, triangle} from 'ionicons/icons';
import CameraTab from './pages/CameraTab';
import HistoryTab from './pages/HistoryTab';
import SettingsTab from './pages/SettingsTab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {BankDataHistoryContextProvider} from "./context/BankDataHistoryContext";

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <BankDataHistoryContextProvider>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/camera">
                            <CameraTab/>
                        </Route>
                        <Route exact path="/history">
                            <HistoryTab/>
                        </Route>
                        <Route path="/settings">
                            <SettingsTab/>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/camera"/>
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="camera" href="/camera">
                            <IonIcon aria-hidden="true" icon={triangle}/>
                            <IonLabel>Camera</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="history" href="/history">
                            <IonIcon aria-hidden="true" icon={ellipse}/>
                            <IonLabel>History</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="settings" href="/settings">
                            <IonIcon aria-hidden="true" icon={square}/>
                            <IonLabel>Settings</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </BankDataHistoryContextProvider>
    </IonApp>
);

export default App;
