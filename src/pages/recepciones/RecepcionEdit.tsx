import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import Recepcion from "./Recepcion";
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonPopover, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { add, checkmark, close, save } from "ionicons/icons";
import Product from "../products/Product";
import { saveRecep } from "./recepcionApi";
import Proveedor from "../proveedores/Proveedor";
import { searchProv, searchProvById } from "../proveedores/ProvApi";
import ComboBoxProveedores from "../proveedores/ComboBoxProveedores";
import Almacenamiento from "../almacenamientos/Almacenamiento";
import { useForm } from "react-hook-form";

const RecepcionEdit: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [provs, setProvs] = useState<Proveedor[]>([]);
  const [mostrarProv, setMostrarProv]= useState<boolean>(false);
  const [prov, setProv] = useState<Proveedor>({});
  const [product, setProduct] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [error, setError] = useState('');
  const [alma, setAlma] = useState<Almacenamiento>({});
  const history = useHistory();

  const routeMatch: any = useRouteMatch("/page/recepciones/:id");

  const id = routeMatch?.params?.id;

  useEffect(() => {
    chargeProvs();

  }, [history.location.pathname]);
  const addInput = async (e) => {
    if (searchText.trim() === '') {
      setError('NameProd field cannot be empty');
      return;
    }
    if (priceValue.trim() === '') {
      setError('Precio field cannot be empty');
      return;
    }
    if (amountValue.trim() === '') {
      setError('Cantidad field cannot be empty');
      return;
    }
    if (alma.id.trim() === '') {
      setError('Cantidad field cannot be empty');
      return;
    }
    
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
        state:"PENDIENTE",
        idAlma: Number(alma.id)
      }]);
      
    }
    
    setSearchText('');
    setAmountValue('');
    setPriceValue('');
    setAlma({});
  }
  const chargeProvs = async()=>{

    let result = await searchProv();
    setProvs(result);
  }
const findByIdProv = async(idProv: string)=>{

    let result = await searchProvById(idProv);
    setProv(result);
    setMostrarProv(true);
}
  const save = async () => {
    let e:Recepcion;
    e = {
      listaProds:product,
      estadoRecep:"PENDIENTE",
      proveedor: prov
    }
    await saveRecep(e);
    history.push('/page/products');
  }
  return (
    <IonPage>
      <IonHeader>

        <IonToolbar>
        <IonTitle>Crear Recepcion</IonTitle>
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
         <IonButton className="comboProvs">
          <ComboBoxProveedores proveedor={provs} onSelect={findByIdProv}></ComboBoxProveedores>
          </IonButton>
          {mostrarProv && (
                  <IonGrid className="table">
                    <IonText color={'danger'}>Proveedor Seleccionado:</IonText>
                    <IonRow>
                      <IonCol color="tertiary">Nombre</IonCol>
                      <IonCol color="tertiary">Documento</IonCol>
                      <IonCol color="tertiary">E-Mail</IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol color="tertiary">{prov.nombreProv}</IonCol>
                      <IonCol color="tertiary">{prov.documento}</IonCol>
                      <IonCol color="tertiary">{prov.email}</IonCol>
                    </IonRow>
                  </IonGrid>
              )}
        </IonRow>
        
        <IonContent>
          <IonCard>
            <IonTitle>{id === 'new' ? 'Agregar Productos a Recepcion' : 'Editar '}</IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">NameProd </IonLabel> 
                  <IonInput placeholder="Se debe ingresar un nombre" value={searchText} onIonChange={(e) => setSearchText(e.detail.value)}/>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Precio</IonLabel>
                  <IonInput placeholder="Se debe ingresar un precio" value={priceValue} onIonChange={(e) => setPriceValue(e.detail.value)}/>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Cantidad</IonLabel>
                  <IonInput placeholder="Se debe ingresar una cantidad" value={amountValue} onIonChange={(e) => setAmountValue(e.detail.value)}/>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">IdAlmacenamiento</IonLabel>
                  <IonInput placeholder="Se debe ingresar un almacenamiento" value={alma.id} onIonChange={(e) => setAlma({id:e.detail.value})}/>
                </IonItem>
              </IonCol>
            </IonRow>
            {error && <div className="error-message">{error}</div>}
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