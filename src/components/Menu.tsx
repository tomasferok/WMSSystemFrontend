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
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, cubeSharp, cubeOutline, folderOpenSharp, folderOpenOutline, cardOutline, cardSharp, cartSharp, statsChartOutline, statsChartSharp, contractOutline, contractSharp, peopleCircleOutline, peopleCircleSharp, serverOutline, albumsOutline, albumsSharp, peopleOutline, peopleSharp, handLeftOutline, handLeftSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [

  {
    title: 'Carrito',
    url: '/page/carrito',
    iosIcon: cardOutline,
    mdIcon: cartSharp
  },
  {
    title: 'Pedidos',
    url: '/page/pedido',
    iosIcon: folderOpenOutline,
    mdIcon: folderOpenSharp
  },
  {
    title: 'Clientes',
    url: '/page/clients',
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleSharp
  }
];

const compras:AppPage[]=[
  {
    title: 'Recepciones',
    url: '/page/recepciones',
    iosIcon: albumsOutline,
    mdIcon: albumsSharp
  },
  {
    title: 'Control-Recepciones',
    url: '/page/controlarRecepcion/new',
    iosIcon: handLeftOutline,
    mdIcon: handLeftSharp
  },
  {
    title: 'Proovedores',
    url: '/page/prooverdores',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp
  }
];

const stock:AppPage[]=[
  {
    title: 'Almacenamiento',
    url: '/page/alma',
    iosIcon: serverOutline,
    mdIcon: serverOutline
  },
  {
    title: 'Reports',
    url: '/page/ventas',
    iosIcon: statsChartOutline,
    mdIcon: statsChartSharp
  },
  {
    title: 'Productos',
    url: '/page/products',
    iosIcon: cubeOutline,
    mdIcon: cubeSharp
  },

];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">

          <IonListHeader>iLog  <img className='logo' src="src/images/logo.png" alt="This is an test" /></IonListHeader>

          <IonNote>Tomas Fernandez</IonNote>

        </IonList>
    
        <IonList id="labels-list">
        <IonHeader>Compras</IonHeader>
          {compras.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="inbox-list">
        <IonHeader>Control de stock</IonHeader>
        {stock.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonHeader>Ventas</IonHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>

    </IonMenu>
  );
};

export default Menu;
