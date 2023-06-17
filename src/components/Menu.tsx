import React from 'react';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { archiveOutline, cartSharp, cubeOutline, folderOpenOutline, peopleCircleOutline, statsChartOutline, serverOutline, barcodeOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

const appPages: AppPage[] = [
  {
    title: 'Carrito',
    url: '/page/carrito',
    icon: cartSharp,
  },
  {
    title: 'Pedidos',
    url: '/page/pedido',
    icon: folderOpenOutline,
  },
  {
    title: 'Clientes',
    url: '/page/clients',
    icon: peopleCircleOutline,
  },
];

const compras: AppPage[] = [
  {
    title: 'Recepciones',
    url: '/page/recepciones',
    icon: archiveOutline,
  },
  {
    title: 'Control-Recepciones',
    url: '/page/controlarRecepcion/new',
    icon: folderOpenOutline,
  },
  {
    title: 'Proveedores',
    url: '/page/proveedores',
    icon: peopleCircleOutline,
  },
  {
    title: 'Etiquetas',
    url: '/page/barcode',
    icon: barcodeOutline,
  },
];

const stock: AppPage[] = [
  {
    title: 'Almacenamiento',
    url: '/page/alma',
    icon: serverOutline,
  },
  {
    title: 'Reports',
    url: '/page/ventas',
    icon: statsChartOutline,
  },
  {
    title: 'Productos',
    url: '/page/products',
    icon: cubeOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list" lines="none">
          <IonListHeader>
            iLog <img className="logo" src="src/images/logo.png" alt="This is a test" />
          </IonListHeader>
          <IonNote>Tomas Fernandez</IonNote>
        </IonList>

        <IonList id="labels-list" lines="none">
          <IonHeader>Compras</IonHeader>
          {compras.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={appPage.icon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        <IonList id="inbox-list" lines="none">
          <IonHeader>Control de stock</IonHeader>
          {stock.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={appPage.icon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>

        <IonList id="labels-list" lines="none">
          <IonHeader>Ventas</IonHeader>
          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? 'selected' : ''}
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={appPage.icon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

