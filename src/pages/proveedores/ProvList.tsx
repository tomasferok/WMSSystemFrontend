import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, addCircle, close, pencil, searchCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeProv, searchProv } from './ProvApi';
import Product from './Proveedor';
import Proveedor from './Proveedor';


const ProvList: React.FC = () => {

const [provs, setprovs] = useState<Product[]>([]);

  const history = useHistory();
  
  useEffect(() =>{
    search();
  }, [history.location.pathname]);
  const search = async () => {
    let result = await searchProv();
    setprovs(result);
  }

  const remove = async (id: string) => {
    await removeProv(id);
    search();
  }

  const addProv = () => {
    history.push('/page/product/new');
  }
  const verPendientes = () => {
    history.push('/page/provs/pendiente');
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
          <IonTitle></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        </IonHeader>





        <IonContent>
          <IonCard>
            <IonToolbar>
            <IonTitle>Mestro de Proveedores</IonTitle>
            </IonToolbar>
            <IonItem>
            
              <IonButton onClick={addProv} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
                Add Product
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Contacto</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>

              {provs.map((prov: Proveedor) =>
              <IonRow>
                  <IonCol>{prov.nombreProv}</IonCol>
                  <IonCol>{prov.contacto}</IonCol>
                  <IonCol>{prov.email}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear" onClick={()=> editProduct(String(prov.idProv))}
                     >
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>
                    <IonButton color="danger" fill="clear"
                      onClick={() => remove(String(prov.idProv))}>
                      <IonIcon icon={close} slot="icon-only" />
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

export default ProvList;


