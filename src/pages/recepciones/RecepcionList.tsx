import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonItem,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { add, pencil, close, checkmarkDoneCircleSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Recepcion.css';
import { removeRecepcion, searchRecepcion } from './recepcionApi';

interface Recepcion {
  idRecep: string;
  estadoRecep: string;
}

const RecepcionList: React.FC = () => {
  const [recepcion, setRecepcion] = useState<Recepcion[]>([]);

  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    const result = await searchRecepcion();
    setRecepcion(result);
  };

  const remove = async (id: string) => {
    await removeRecepcion(id);
    search();
  };

  const addRecep = () => {
    history.push('/page/recepciones/new');
  };

  const controlarRecepcion = (id: string) => {
    history.push(`/page/controlarRecepcion/${id}`);
  };

  const editRecep = (id: string) => {
    history.push(`/page/recep/${id}`);
  };

  const renderRecepcionRows = () => {
    return recepcion.map((recep: Recepcion) => (
      <IonRow key={recep.idRecep}>
        <IonCol>{recep.idRecep}</IonCol>
        <IonCol>{recep.estadoRecep}</IonCol>
        <IonCol>
          <IonButton color="primary" fill="clear" onClick={() => editRecep(String(recep.idRecep))}>
            <IonIcon icon={pencil} slot="icon-only" />
          </IonButton>
          <IonButton color="danger" fill="clear" onClick={() => remove(String(recep.idRecep))}>
            <IonIcon icon={close} slot="icon-only" />
          </IonButton>
          <IonButton color="success" fill="clear" onClick={() => controlarRecepcion(String(recep.idRecep))}>
            Controlar
            <IonIcon icon={checkmarkDoneCircleSharp} slot="icon-only" />
          </IonButton>
        </IonCol>
      </IonRow>
    ));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Recepciones</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>Maestro de Recepciones</IonTitle>

          <IonItem>
            <IonButton className="add-recepcion" onClick={addRecep} fill="solid" slot="end" size="default">
              <IonIcon icon={add} />
              Agregar Recepcion
            </IonButton>
          </IonItem>

          <IonGrid className="table">
            <IonRow>
              <IonCol>Id</IonCol>
              <IonCol>Estado</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>

            {renderRecepcionRows()}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default RecepcionList;