import Ventas from './Ventas'
import { useEffect, useState } from 'react';
import { searchVentas } from './ventasApi'
import { useHistory } from 'react-router';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale } from 'chart.js';
import ProductosEnVenta from './ProductosEnVenta';
import LinesChart from './GraphicsComponent/LinesChar';
import { addCircleSharp, analyticsSharp, cartSharp, cubeSharp } from 'ionicons/icons';
import './Card.css';
import Card from './GraphicsComponent/Card';
const VentasReport: React.FC = () => {
 

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Reportes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="card-container">
          <Card title="Ventas" iconCard={cartSharp}/>
          <Card title="Productos" iconCard={cubeSharp}/>
          <Card title="Beneficio" iconCard={analyticsSharp}/>
        </div>
      </IonContent>
    </IonPage >

  );
};

export default VentasReport;