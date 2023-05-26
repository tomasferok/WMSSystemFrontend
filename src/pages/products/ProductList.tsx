import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeProduct, searchProduct } from './ProductApi';
import Product from './Product';


const ProductList: React.FC = () => {

const [productos, setProductos] = useState<Product[]>([]);
  const { name } = useParams<{ name: string; }>();
  const history = useHistory();
  const FilteredProds:Product[] = productos?.filter(p=> p.state === "PEDIDO")
  const FilteredProds2:Product[] = productos?.filter(p=> p.state === "ENSTOCK")
  useEffect(() =>{
    search();
  }, [history.location.pathname]);
  const search = async () => {
    let result = await searchProduct();
    setProductos(result);
  }

  const remove = async (id: string) => {
    await removeProduct(id);
    search();
  }

  const addCustomer = () => {
    history.push('/page/product/new');
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
            <IonToolbar>
            <IonTitle>Productos en Stock</IonTitle>
            </IonToolbar>
            <IonItem>
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

              {FilteredProds2.map((producto: Product) =>
              <IonRow>
                  <IonCol>{producto.nameProd}</IonCol>
                  <IonCol>{producto.price}</IonCol>
                  <IonCol>{producto.amount}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear" onClick={()=> editProduct(String(producto.idProd))}
                     >
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>
                    <IonButton color="danger" fill="clear"
                      onClick={() => remove(String(producto.idProd))}>
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
                    
                  </IonCol>
                </IonRow>
                )}
                
             

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
              {FilteredProds.map((producto: Product) =>
            
              <IonRow>
                  <IonCol>{producto.nameProd}</IonCol>
                  <IonCol>{producto.price}</IonCol>
                  <IonCol>{producto.amount}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear" onClick={()=> editProduct(String(producto.idProd))}
                     >
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>
                    <IonButton color="danger" fill="clear"
                      onClick={() => remove(String(producto.idProd))}>
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

export default ProductList;