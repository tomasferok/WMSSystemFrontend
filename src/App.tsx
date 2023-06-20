import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
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
import ProveedorEdit from './pages/proveedores/ProveedorEdit';
import ProductosEnPedido from './pages/products/ProductosEnPedido';

setupIonicReact();

const routes = [
  { path: "/", exact: true, component: <Redirect to="/page/products" /> },
  { path: "/page/products", exact: true, component: <ProductList /> },
  { path: "/page/product/:id", exact: true, component: <ProductEdit /> },
  { path: "/page/product/:id/:idAlma", exact: true, component: <ProductEdit /> },
  { path: "/page/carrito", exact: true, component: <CarritoList /> },
  { path: "/page/carrito/:id", exact: true, component: <CarritoEdit /> },
  { path: "/page/alma", exact: true, component: <AlmacenamientoList /> },
  { path: "/page/alma/:id", exact: true, component: <AlmacenamientoEdit /> },
  { path: "/page/ventas", exact: true, component: <VentasReport /> },
  { path: "/page/recepciones", exact: true, component: <RecepcionList /> },
  { path: "/page/recepciones/:id", exact: true, component: <RecepcionEdit /> },
  { path: "/page/productos/pendiente", exact: true, component: <ProductosPendientesList /> },
  { path: "/page/controlarRecepcion/:id", exact: true, component: <ControlarRecepcion /> },
  { path: "/page/proveedores", exact: true, component: <ProvList /> },
  { path: "/page/barcode", exact: true, component: <GeterarEtiqueta /> },
  { path: "/page/pedido", exact: true, component: <ProductosEnPedido /> },
  { path: "/page/proveedoresnew", exact: true, component: <ProveedorEdit /> }
];

const App: React.FC = () => {
  const renderRoutes = routes.map((route, index) => (
    <Route key={index} path={route.path} exact={route.exact}>
      {route.component}
    </Route>
  ));

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">{renderRoutes}</IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
