import {
  IonContent,
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
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp,cubeSharp, cubeOutline, folderOpenSharp, folderOpenOutline, cardOutline, cardSharp, cartSharp, statsChartOutline, statsChartSharp, contractOutline, contractSharp, peopleCircleOutline, peopleCircleSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Products',
    url: '/page/products',
    iosIcon: cubeOutline,
    mdIcon: cubeSharp
  },
  
  {
    title: 'trolley',
    url: '/page/carrito',
    iosIcon: cardOutline,
    mdIcon: cartSharp
  },
  {
    title: 'Almacenamiento',
    url: '/page/alma',
    iosIcon: folderOpenOutline,
    mdIcon: folderOpenSharp
  },
  {
    title: 'Reports',
    url: '/page/ventas',
    iosIcon: statsChartOutline,
    mdIcon: statsChartSharp
  },
  {
    title: 'Clients',
    url: '/page/clients',
    iosIcon: peopleCircleOutline,
    mdIcon: peopleCircleSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
        
          <IonListHeader>iLog  <img className='logo' src="data:image/png;base64,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" alt="This is an test" /></IonListHeader>
          
          <IonNote>Tomas Fernandez</IonNote>
          
        </IonList>

        <IonList id="labels-list">
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
