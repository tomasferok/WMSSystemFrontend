import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark, pencil, close } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';

import { saveAlma, searchAlmaById } from './AlmacenamientoApi';
import Almacenamiento from './Almacenamiento';
import Product from '../products/Product';
import { removeProduct } from '../products/ProductApi';


const AlmacenamientoEdit: React.FC = () => {
  const { name } = useParams<{ name: string; }>();

  const [alma, setAlma] = useState<Almacenamiento>({});
  const history = useHistory();

  const routeMatch: any = useRouteMatch("/page/alma/:id");
  const id = routeMatch?.params?.id;

  useEffect(() => {
    search();
    
  }, [history.location.pathname]);

  const search = async () => {
    if (id === 'new') {
      setAlma({});
    } else {
      let result = await searchAlmaById(id);
      setAlma(result);
    }
  }
  const removeProd = async (id: string) => {
    await removeProduct(id);
    search();
  }
  const rellenarCampo = async () => {
  
    { await alma.prods.map((prods:Product) => {
      return  ( <IonInput onIonChange={e => prods.nameProd = String(e.detail.value)}
           value={prods.nameProd}> </IonInput>)
})}
  }
  const save = async () => {
    await saveAlma(alma);
    history.push('/page/alma');

  }
  const addProduct = (id: string) => {
    history.push('/page/product/new/' + id);
  }
  const editProduct = (id: string) => {
    history.push('/page/product/' + id);
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
            <IonTitle>{id === 'new' ? 'Agregar Almacenamiento' : 'Editar Almacenamiento'}</IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">IdAlma</IonLabel>
                  <IonInput onIonChange={e => alma.id = String(e.detail.value)}
                    value={alma.id}> </IonInput>
                </IonItem>
              </IonCol>
              </IonRow>
              <IonRow>
                <IonCol> 
                <IonItem disabled={alma.prods === undefined}>
                <IonLabel position="stacked">NombreProd</IonLabel>
               
                { alma.prods?.map((prods:Product) => {
      return  ( 
          <IonRow>
          <IonInput onIonChange={e => prods.nameProd = String(e.detail.value)}
           value={prods.nameProd}> </IonInput> 
           <IonInput onIonChange={e => prods.nameProd = String(e.detail.value)}
           value={prods.amount}> </IonInput> 
           <IonButton color="primary" fill="clear" onClick={()=> editProduct(String(prods.idProd))}
                     >
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>
                    <IonButton color="danger" fill="clear"
                      onClick={() => removeProd(String(prods.idProd))}>
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
           </IonRow>
           )})}
         </IonItem>
            </IonCol>
             
            </IonRow>

            <IonItem>
              <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
                <IonIcon icon={checkmark} />
                Guardar
              </IonButton>
              <IonButton onClick={()=>addProduct(String(alma.id))} color="medium" fill="solid" slot="end" size="default">
                <IonIcon icon={checkmark} />
                +Add Product
              </IonButton>
            </IonItem>
            

          </IonCard>


        </IonContent>






      </IonContent>
    </IonPage>
  );
};

export default AlmacenamientoEdit;