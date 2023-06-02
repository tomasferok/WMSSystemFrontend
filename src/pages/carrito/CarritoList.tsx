import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, checkmark, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { comprar, removeCarrito, searchCarrito } from './CarritoApi';
import Carrito from './Carrito';


const CarritoList: React.FC = () => {

  const [carrito, setCarrito] = useState<Carrito[]>([]);
  const { name } = useParams<{ name: string; }>();
  const history = useHistory();
  useEffect(() => {
    search();
  }, [history.location.pathname]);
  const search = async () => {
    let result = await searchCarrito();
    setCarrito(result);
  }

  const remove = async (id: string) => {
    await removeCarrito(id);
    search();
  }



  const addCarrito = () => {
    history.push('/page/carrito/new');
  }


  const editCarrito = (id: string) => {
    history.push('/page/carrito/' + id);
  }

  const comprarCarrito = async(id: string) =>{
        await comprar(id);
        window.location.reload();
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
            <IonTitle>Carrito Managment</IonTitle>

            <IonItem>
              <IonButton onClick={addCarrito} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
                Add Carrito
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>Id</IonCol>
                <IonCol>Precio</IonCol>
                <IonCol>Acciones</IonCol>

              </IonRow>

              {carrito.map((carrito: Carrito) =>
                <IonRow>
                  <IonCol>{carrito.id}</IonCol>
                  <IonCol>{carrito.total}</IonCol>

                  <IonCol>
                    <IonButton color="primary" fill="clear" onClick={() => editCarrito(String(carrito.id))}
                    >
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>
                    <IonButton color="danger" fill="clear"
                      onClick={() => remove(String(carrito.id))}>
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
                    <IonButton color="secondary" fill="clear"
                      onClick={() => comprarCarrito(String(carrito.id))}>
                        Comprar
                      <IonIcon icon={checkmark} slot="icon-only" />
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

export default CarritoList;