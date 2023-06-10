import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import Recepcion from "./Recepcion";
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonPopover, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { add, checkmark, close, save } from "ionicons/icons";
import Product from "../products/Product";
import { saveProduct } from "../products/ProductApi";
import { saveRecep } from "./recepcionApi";
import Proveedor from "../proveedores/Proveedor";
import { searchProv } from "../proveedores/ProvApi";
import ComboBoxProveedores from "../proveedores/ComboBoxProveedores";

const RecepcionEdit: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [provs, setProvs] = useState<Proveedor[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [recepcion, setRecepcion] = useState<Recepcion>({});
  const history = useHistory();

  const routeMatch: any = useRouteMatch("/page/recepciones/:id");
  const id = routeMatch?.params?.id;

  useEffect(() => {
    chargeProvs();

  }, [history.location.pathname]);
  const addInput = async (e) => {
    e.preventDefault();
    let enter;
    product?.map((f)=>{
      if(f.nameProd?.includes(searchText)){
        f.amount = f.amount + Number(amountValue)
        enter = true;
      }

    }
    )
    if(enter != true){
      setProduct([...product, {
        amount:Number(amountValue),
        nameProd:searchText,
        price:Number(priceValue),
        state:"PENDIENTE"
      }]);
      
    }
    
    setSearchText('');
    setAmountValue('');
    setPriceValue('');

  }
  const chargeProvs = async()=>{

    let result = await searchProv();
    setProvs(result);
  }
const findByIdProv = ()=>{

}
  const save = async () => {
    let e:Recepcion;
    e = {
      listaProds:product,
      estadoRecep:"PENDIENTE"
    }
    await saveRecep(e);
    history.push('/page/products');
  }
  return (
    <IonPage>
      <IonHeader>

        <IonToolbar>
          <IonText className=''>Recepciones</IonText>
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
        <IonRow>
          <IonText color={'danger'}>Proveedor Seleccionado:</IonText>
          <ComboBoxProveedores proveedor={provs} onSelect={findByIdProv}></ComboBoxProveedores>
        </IonRow>
        <IonContent>
          <IonCard>
            <IonTitle>{id === 'new' ? 'Agregar Productos a Recepcion' : 'Editar '}</IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">NameProd
                  </IonLabel>

                  <IonInput value={searchText} onIonChange={(e) => setSearchText(e.detail.value)}
                  >
                  </IonInput>

                </IonItem>
              </IonCol>

            </IonRow>

          

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Precio</IonLabel>
                  <IonInput value={priceValue} onIonChange={(e) => setPriceValue(e.detail.value)}>
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Cantidad</IonLabel>
                  <IonInput value={amountValue} onIonChange={(e) => setAmountValue(e.detail.value)}>
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonItem>
              <IonButton onClick={addInput} color="tertiary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
              </IonButton>
            </IonItem>

          </IonCard>
          <IonCard>
            <IonTitle color={'dark'}>{"Productos de la recepcion"}</IonTitle>
            <IonGrid className="table">
              <IonHeader>
                <IonRow>
                  <IonCol>Nombre Producto</IonCol>
                  <IonCol>Cantidad</IonCol>
                  <IonCol>Acciones  </IonCol>
                </IonRow>
              </IonHeader>
              {product.map((prod) => (
                <IonRow>
                  <IonCol>{prod.nameProd}</IonCol>
                  <IonCol>{prod.amount}</IonCol>
                  <IonCol>


                    <IonButton color="danger" fill="clear"
                    >
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>

                  </IonCol>

                </IonRow>

              ))}

            </IonGrid>
       

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

export default RecepcionEdit;