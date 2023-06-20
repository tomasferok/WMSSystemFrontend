import React, { useEffect, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { add, addCircle, close, pencil, searchCircle } from 'ionicons/icons';
import { removeProduct, searchProduct } from './ProductApi';
import Product from './Product';

interface RouteParams {
  name: string;
}

const ProductosEnPedido: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const { name } = useParams<RouteParams>();
  const history = useHistory();
  const filteredProds: Product[] = productos?.filter(p => p.state === "PEDIDO");

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    const result = await searchProduct();
    setProductos(result);
  };

  const remove = async (id: string) => {
    await removeProduct(id);
    search();
  };

  const editProduct = (id: string) => {
    history.push('/page/product/' + id);
  };

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
            <IonToolbar>
              <IonTitle>Productos En Pedido</IonTitle>
            </IonToolbar>
            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Precio</IonCol>
                <IonCol>Cantidad</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>
              {filteredProds.map((producto: Product) => (
                <IonRow key={producto.idProd}>
                  <IonCol>{producto.nameProd}</IonCol>
                  <IonCol>{producto.price}</IonCol>
                  <IonCol>{producto.amount}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear" onClick={() => editProduct(String(producto.idProd))}>
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>
                    <IonButton color="danger" fill="clear" onClick={() => remove(String(producto.idProd))}>
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default ProductosEnPedido;