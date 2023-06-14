import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

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
import ProductList from './pages/products/ProductList';
import ProductEdit from './pages/products/ProductEdit';
import CarritoList from './pages/carrito/CarritoList';
import AlmacenamientoList from './pages/almacenamientos/AlmacenamientoList';
import AlmacenamientoEdit from './pages/almacenamientos/AlmacenamientoEdit';
import CarritoEdit from './pages/carrito/CarritoEdit';
import VentasReport from './pages/reports/VentasReport';
import RecepcionList from './pages/recepciones/RecepcionList';
import RecepcionEdit from './pages/recepciones/RecepcionEdit';
import ProductosPendientesList from './pages/products/ProductosPendientesList';
import ControlarRecepcion from './pages/recepciones/ControlarRecepcion';
import ProvList from './pages/proveedores/ProvList';
import GeterarEtiqueta from './pages/products/GenerarEtiquetas';


setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/page/products" />
            </Route>
            
            
            <Route path="/page/products" exact={true}>
              <ProductList />
              </Route>
              <Route path="/page/product/:id" exact={true}>
              <ProductEdit />
              </Route>
              <Route path="/page/product/:id/:idAlma" exact={true}>
              <ProductEdit />
              </Route>
              <Route path="/page/carrito" exact={true}>
              <CarritoList />
              </Route>
              <Route path="/page/carrito/:id" exact={true}>
              <CarritoEdit />
              </Route>
              <Route path="/page/alma" exact={true}>
              <AlmacenamientoList />
              </Route>
              <Route path="/page/alma/:id" exact={true}>
                <AlmacenamientoEdit/>
              </Route>
              <Route path="/page/ventas" exact={true}>
              <VentasReport />
              </Route>
              <Route path="/page/recepciones" exact={true}>
              <RecepcionList />
              </Route>
              <Route path="/page/recepciones/:id" exact={true}>
              <RecepcionEdit />
              </Route>
              <Route path="/page/productos/pendiente" exact={true}>
              <ProductosPendientesList />
              </Route>
              <Route path="/page/controlarRecepcion/:id" exact={true}>
              <ControlarRecepcion />
              </Route>
              <Route path="/page/proveedores" exact={true}>
              <ProvList />
              </Route>
              <Route path="/page/barcode" exact={true}>
              <GeterarEtiqueta />
              </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
