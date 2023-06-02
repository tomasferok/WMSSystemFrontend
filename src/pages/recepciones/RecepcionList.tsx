import { useEffect, useState } from "react";
import Recepcion from "./Recepcion";
import { useHistory, useParams } from "react-router";
import { removeRecepcion, searchRecepcion } from "./recepcionApi";
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { add, checkmarkDoneCircleSharp, close, pencil } from "ionicons/icons";

const RecepcionList: React.FC = () => {

    const [recepcion, setRecepcion] = useState<Recepcion[]>([]);
    const { name } = useParams<{ name: string; }>();
    const history = useHistory();
    useEffect(() => {
      search();
    }, [history.location.pathname]);
    const search = async () => {
      let result = await searchRecepcion();
      setRecepcion(result);
    }
  
    const remove = async (id: string) => {
      await removeRecepcion(id);
      search();
    }
  
  
  
    const addRecep = () => {
      history.push('/page/recepciones/new');
    }
    const controlarRecepcion = (id:string)=>{

    }
  
    const editRecep = (id: string) => {
      history.push('/page/recep/' + id);
    }
  
    
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>
  
  
  
  
  
          <IonContent>
            <IonCard>
              <IonTitle>Recepcion Managment</IonTitle>
  
              <IonItem>
                <IonButton onClick={addRecep} color="primary" fill="solid" slot="end" size="default">
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
  
                {recepcion.map((recep: Recepcion) =>
                  <IonRow>
                    <IonCol>{recep.idRecep}</IonCol>
                    <IonCol>{recep.estadoRecep}</IonCol>
  
                    <IonCol>
                      <IonButton color="primary" fill="clear" onClick={() => editRecep(String(recep.idRecep))}
                      >
                        <IonIcon icon={pencil} slot="icon-only" />
                      </IonButton>
                      <IonButton color="danger" fill="clear"
                        onClick={() => remove(String(recep.idRecep))}>
                        <IonIcon icon={close} slot="icon-only" />
                      </IonButton>
                      <IonButton color="secondary" fill="clear"
                        onClick={() => controlarRecepcion(String(recep.idRecep))}>
                          Controlar
                        <IonIcon icon={checkmarkDoneCircleSharp} slot="icon-only" />
                      </IonButton>
  
                    </IonCol>
                  </IonRow>
                )}
  
  
  
              </IonGrid>
            </IonCard>
  
  
          </IonContent>
  
  
  
  
  
  
        </IonContent>
      </IonPage>
    );
  };

  export default RecepcionList;