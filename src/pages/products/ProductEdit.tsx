import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import Product from './Product';
import { saveProduct, searchProductById } from './ProductApi';


const ProductEdit: React.FC = () => {
  const { name } = useParams<{ name: string; }>();

  const [product, setProduct] = useState<Product>({});
  const history = useHistory();

  const routeMatch: any = useRouteMatch("/page/product/:id");
  const id = routeMatch?.params?.id;
  const idAlma = routeMatch?.params?.idAlma;
  
  useEffect(() => {
    search();
    setProduct({
      state:"ENSTOCK"
    })
  }, [history.location.pathname]);

  const search = async () => {
    if (id === 'new') {
      setProduct({});
      if(idAlma != null){
        setProduct({ idAlma: idAlma});

      }
    } else {
      let result = await searchProductById(id);
      setProduct(result);
    }
    
  }

  const save = async () => {
    await saveProduct(product);
    history.push('/page/products');
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
            <IonTitle>{id === 'new' ? 'Agregar Producto' : 'Editar Producto'}</IonTitle>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">NameProd</IonLabel>
                  <IonInput onIonChange={e => product.nameProd = String(e.detail.value)}
                    value={product.nameProd}> </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Price</IonLabel>
                  <IonInput onIonChange={e => product.price = Number(e.detail.value)}
                    value={product.price}> </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Amount</IonLabel>
                  <IonInput onIonChange={e => product.amount = Number(e.detail.value)}
                    value={product.amount}> </IonInput>
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">idAlma</IonLabel>
                  <IonInput onIonChange={e => product.idAlma = Number(e.detail.value)}
                    value={product.idAlma}> </IonInput>
                </IonItem>
              </IonCol>          
            </IonRow>
            
            <IonItem>
              <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
                <IonIcon icon={checkmark} />
                Guardar
              </IonButton>
            </IonItem>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default ProductEdit;