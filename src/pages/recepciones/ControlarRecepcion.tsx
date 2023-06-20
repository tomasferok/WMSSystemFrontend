import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonPopover, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import { add, addCircle, close, pencil, searchCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { controlarRecep, guardarConDiferencias, saveRecep, searchRecepcion, searchRecepcionById } from './recepcionApi';
import Recepcion from './Recepcion';
import Product from '../products/Product';
import ControlarRecepcionRequest from './ControlarRecepcionRequest';
import ComboBoxRecepcion from './ComboBoxRecepciones';

const ControlarRecepcion: React.FC = () => {

  const [recepcion, setRecepcion] = useState<Recepcion>({});
  const [recepcions, setRecepcions] = useState<Recepcion[]>([]);
  const [controlado, setControlado] = useState(false);
  const [listProds, setListProds] = useState<Product[]>([]);
  const [showPopover, setShowPopover] = useState(false);
  
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/controlarRecepcion/:id");
  const id = routeMatch?.params?.id;

  useEffect(() => {
    searchById();
    searchRecepcions();
    
  }, [history.location.pathname]);
  const searchById = async () => {
    setControlado(false);
    if (id === "new") {
      setRecepcion({});
    }
    else {
      let result = await searchRecepcionById(id);
      if(result.estadoRecep === "CONTROLADO"){
        setRecepcion({});
        setControlado(true);
      }else{
        setRecepcion(result);
      }
      
    }

  }

  const searchRecepcions = async () => {

    let result = await searchRecepcion();
    setRecepcions(result);
  }

  const chargeRequest = (prodName: string, requestAmount: string, id: string, price: number, almaId:number) => {

    setListProds([...listProds, {
      idProd: id,
      nameProd: prodName,
      amount: Number(requestAmount),
      price: price,
      state: "PENDIENTE",
      idAlma: almaId
    }])

  }

  const findByIdRecep = (idRecep: string) => {

    history.push('/page/controlarRecepcion/' + idRecep);
  }

  const controlar = async () => {

    let request: ControlarRecepcionRequest = {
      idRecep: id,
      listProds: recepcion.listaProds
    };
    let response = await controlarRecep(request);
    if (response.Recepcion.estadoRecep == "DIFERENCIAS") {
      confirmation();
      setListProds(null);
    } else {
      history.push('/page/recepciones');
      setListProds(null);
    }



  }

  const confirmation = () => {
    setShowPopover(true);
  }
const cancelConfirmation = () =>{
  history.push('/page/recepciones');
} 
  
const confirmSaveWithDifer = async() =>{
      let request: ControlarRecepcionRequest = {
        idRecep: id,
        listProds: recepcion.listaProds
      };
      await guardarConDiferencias(request);
      history.push('/page/recepciones');
      setShowPopover(false);
    }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Control De Recepciones</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Control</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow>
          <IonText color={'danger'}>Recepcion Seleccionada:</IonText>
          <ComboBoxRecepcion recepcion={recepcions} onSelect={findByIdRecep}></ComboBoxRecepcion>
        </IonRow>

        <IonContent>
          <IonCard>
            <IonTitle>Productos de la recepcion</IonTitle>
            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Precio</IonCol>
                <IonCol>Almacenamiento</IonCol>
                <IonCol>CantidadEnRecpcion</IonCol>
                <IonCol>CantidadEsperada</IonCol>
              </IonRow>
              {recepcion.listaProds?.map((producto: Product) =>

                <IonRow>
                  <IonCol>{producto.nameProd}</IonCol>
                  <IonCol>{producto.price}</IonCol>
                  <IonCol>{producto.idAlma}</IonCol>
                  <IonCol>{producto.amount}</IonCol>
                  <IonCol><IonInput placeholder='Ingresar cantidad esperada'
                   onIonChange={e => producto.amount = Number(e.detail.value)}
                   ></IonInput></IonCol>

                </IonRow>
              )}
              {controlado && (<IonRow >
                  <IonText color={'success'}>Controlado exitosamente !!!</IonText>
              </IonRow>)}
              
              <IonButton onClick={controlar} color={'warning'}>ControlarRecepcion</IonButton>
            </IonGrid>

          </IonCard>
          <IonPopover isOpen={showPopover} onDidDismiss={() => setShowPopover(false)}>
            <IonContent>
            <IonItem>
              <IonTitle>Guardar con diferencias</IonTitle>
              
                <IonText>Desea Agregar el stock de productos aunque haya diferencias</IonText>     

            </IonItem>
            <IonButton onClick={confirmSaveWithDifer} color={'success'}>Si</IonButton>
                <IonButton onClick={cancelConfirmation} color={'danger'}>No</IonButton>
            </IonContent>
          </IonPopover>
        </IonContent>

      </IonContent>
    </IonPage>
  );
};

export default ControlarRecepcion;


