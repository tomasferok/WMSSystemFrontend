import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonPopover, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { add, checkmark, close } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import Carrito from './Carrito';
import { calcularTotal, saveCarrito, searchProductById } from './CarritoApi';
import Product from "../products/Product";
import { searchProduct } from '../products/ProductApi';
import Autosuggest from 'react-autosuggest'

const CarritoEdit: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const [inputFields, setInputFields] = useState<JSX.Element[]>([]);
  const [amountValue, setAmountValue] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [total, setTotal] = useState<number>(0);
  const [showPopover, setShowPopover] = useState(false);
  const [carrito, setCarrito] = useState<Carrito>({});
  const history = useHistory();

  const routeMatch: any = useRouteMatch("/page/carrito/:id");
  const id = routeMatch?.params?.id;

  useEffect(() => {
    search();
    searchSuggest();
    calcularTotalProds();
  }, [history.location.pathname]);
  
  const searchSuggest = async () => {

    let result = await searchProduct();
    setSuggestions(result);

  }
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setShowPopover(true);

    if (e.target.value === '') {
      setSuggestions([]);
      setShowPopover(false);
    } else {
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.nameProd.toLowerCase().includes(e.target.value.toLowerCase()) && suggestion.state.includes("ENSTOCK")
      );
      setSuggestions(filteredSuggestions);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    setShowPopover(false);
   
  };

  const search = async () => {
    if (id === 'new') {
      setCarrito({});
    } else {
      let result = await searchProductById(id);
      setCarrito(result);
    }
  }

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
        nameProd:searchText,
        amount:Number(amountValue),
        state: "ENSTOCK"
      }]);
    }
    
    setSearchText('');
    setAmountValue('');
   

  }
  const save = async () => {

    let e:Carrito;
    e = {
      productos:product
    }

    await saveCarrito(e);
    history.push('/page/carrito');
    setCarrito({});
    setProduct([]);
  }
  const removeProduct = (item:String) =>{
 
    let productosFiltrados:Product[] = product.filter((p) =>
      p.nameProd != item
    );

    setProduct(productosFiltrados);
  }
  const calcularTotalProds = async () =>{
    let e:Carrito;
    e = {
      productos:product
    }
   let result:number = await calcularTotal(e);
   setTotal(result);
  
  }
 

  return (
    <IonPage>
      <IonHeader>
        
        <IonToolbar>
        <IonText className=''>errre</IonText>
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
            <IonTitle>{id === 'new' ? 'Agregar carritoo' : 'Editar carritoo'}</IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">NameProd
                  </IonLabel>
                  
                  <IonInput onIonChange={handleInputChange} value={searchText}
                  >
                  </IonInput>
                  
                </IonItem>
              </IonCol>
            
            </IonRow>
            <IonPopover isOpen={showPopover} onDidDismiss={() => setShowPopover(false)}>
                <IonList>
                  <IonListHeader>Suggestions</IonListHeader>
                  {suggestions.map((suggestion, index) => (
                    <IonItem key={index} button onClick={() => handleSuggestionClick(suggestion.nameProd)}>
                      <IonLabel>{suggestion.nameProd}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </IonPopover>
            <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="stacked">Amount</IonLabel>
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
          <IonTitle color={'dark'}>{"Productos en el carrito"}</IonTitle>
          <IonGrid className="table">
          <IonHeader>
            <IonRow>
              <IonCol>Nombre Producto</IonCol>
              <IonCol>Cantidad</IonCol>
              <IonCol>Acciones  </IonCol>
            </IonRow>
          </IonHeader>
          {product?.map((item) => (
            <IonRow>
              <IonCol>{item.nameProd}</IonCol>
              <IonCol>{item.amount}</IonCol>
              <IonCol>
                    
                  
                    <IonButton  onClick={() => removeProduct(item.nameProd)} color="danger" fill="clear"
                      >
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
                    
                  </IonCol>
                  
            </IonRow>
            
          ))}
          
        </IonGrid>
        <IonItem>
          <IonText>Precio total:{total}</IonText>
        </IonItem>
       
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

export default CarritoEdit;