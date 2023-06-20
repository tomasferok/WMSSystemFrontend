import React, { FC, useEffect, useState } from 'react';
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { add, close, pencil, searchCircle } from 'ionicons/icons';
import { searchProduct, removeProduct } from './ProductApi';
import Product from './Product';

const ProductList: FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const filteredProds: Product[] = productos.filter(p => p.state === 'PEDIDO');
  const filteredProds2: Product[] = productos.filter(p => p.state === 'ENSTOCK');

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

  const addCustomer = () => {
    history.push('/page/product/new');
  };

  const verPendientes = () => {
    history.push('/page/productos/pendiente');
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
              <IonTitle>Productos en Stock</IonTitle>
            </IonToolbar>
            <IonItem>
              <IonButton onClick={verPendientes} color="dark" fill="solid" slot="end" size="default">
                <IonIcon icon={searchCircle} />
                Ver Productos Pendientes
              </IonButton>
              <IonButton onClick={addCustomer} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
                Add Product
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Precio</IonCol>
                <IonCol>Cantidad</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>

              {filteredProds2.map((producto: Product) => (
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

        <IonContent>
          <IonCard>
            <IonTitle>Productos en Pedido</IonTitle>
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

export default ProductList;

