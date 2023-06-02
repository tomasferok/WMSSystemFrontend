import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { add, addCircle, close, pencil, searchCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { searchRecepcionById } from './recepcionApi';
import Recepcion from './Recepcion';
import Product from '../products/Product';

const ControlarRecepcion: React.FC = () => {

  const [recepcion, setRecepcion] = useState<Recepcion>({});
  const { name } = useParams<{ name: string; }>();
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/controlarRecepcion/:id");
  const id = routeMatch?.params?.id;
  
  useEffect(() =>{
    searchById("");
  }, [history.location.pathname]);
  const searchById = async (param:string) => {
    if(id != "new"){
      let result = await searchRecepcionById(id);
      setRecepcion(result);
    }else{
      let result = await searchRecepcionById(param);
     setRecepcion(result);
    }
    
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
              <IonTitle>Productos de la recepcion</IonTitle>
                <IonGrid className="table">
                <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Precio</IonCol>
                <IonCol>Cantidad</IonCol>
               
              </IonRow>
              {recepcion.listaProds.map((producto: Product) =>
            
              <IonRow>
                  <IonCol>{producto.nameProd}</IonCol>
                  <IonCol>{producto.price}</IonCol>
                  <IonCol>{producto.amount}</IonCol>
                  
                </IonRow>
                )}
                </IonGrid>

              </IonCard>

            </IonContent>

      </IonContent>
    </IonPage>
  );
};

export default ControlarRecepcion;


