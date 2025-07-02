import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Members from './pages/Members';
import Scrutin from './components/Scrutin';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import ScrutinMembers from './components/ScrutinMembers';
import ScrutinMembersTable from './components/ScrutinMembersTable';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/members">
          <Members />
        </Route>
        <Route exact path="/">
          <Redirect to="/scrutins" />
        </Route>
        <Route exact path="/scrutins">
          <Scrutin />
        </Route>
        <Route exact path="/stats">
          <ScrutinMembersTable />
        </Route>
        <Route path="/stats/:id" component={ScrutinMembersTable} exact />
        <Route path="/scrutin/:id" component={ScrutinMembers} exact />
        <Route path="/scrutin/:id/members" component={ScrutinMembers} exact />
        <Route path="/scrutin/:id/members/:memberId" component={ScrutinMembers} exact />
        <Route path="/scrutin/:id/members/:memberId/vote" component={ScrutinMembers} exact />
        <Route path="/scrutin/:id/members/:memberId/unvote" component={ScrutinMembers} exact />
        <Route path="/scrutin/:id/members/:memberId/details" component={ScrutinMembers} exact />
        <Route path="/scrutin/:id/members/:memberId/edit" component={ScrutinMembers} exact />
        <Route path="/scrutin/:id/members/:memberId/delete" component={ScrutinMembers} exact />
       
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
  
        
export default App;
