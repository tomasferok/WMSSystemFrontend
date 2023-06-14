import { useEffect, useState } from "react";
import Product from "./Product";
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import { searchAlma } from "../almacenamientos/AlmacenamientoApi";
import { generarEtiqueta, searchProductByAlmaId } from "./ProductApi";
import ComboBoxAlmacenamientos from "./comboboxAlmacenamiento";
import Almacenamiento from "../almacenamientos/Almacenamiento";
import { Document, Page } from 'react-pdf';
import { addOutline, barcodeOutline } from "ionicons/icons";

const GeterarEtiqueta: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [almas, setAlmas] = useState<Almacenamiento[]>([]);
 
    useEffect(() => {
      search();
     
    }, []);
    const search = async()=>{

      let result = await searchAlma();

      setAlmas(result);

    }
    const searchProduct = async(idAlma:string)=>{
      let result = await searchProductByAlmaId(idAlma);

      setProducts(result);
    }

    const generateEtiquetas = async()=>{
      await generarEtiqueta(products);
    
    }
    return (
      <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonTitle>Modulo De Generacion de etiquetas</IonTitle>
        </IonToolbar>
      </IonHeader>
        
        <IonContent fullscreen>
        
        <ComboBoxAlmacenamientos alma={almas} onSelect={searchProduct}></ComboBoxAlmacenamientos>
        <IonGrid className="table">
        <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Precio</IonCol>
                <IonCol>Cantidad</IonCol>
                
              </IonRow>
        {products?.map((prod: Product)=>
          <IonRow>
                  <IonCol>{prod.nameProd}</IonCol>
                  <IonCol>{prod.price}</IonCol>
                  <IonCol>{prod.amount}</IonCol>
                 </IonRow>
        )}
        <IonButton color={"danger"} onClick={generateEtiquetas}>
        <IonIcon slot="icon-only" icon={barcodeOutline} />GenerarEtiquetas</IonButton>
        </IonGrid>
      

        </IonContent>
      </IonPage>
    );
  };
  
  export default GeterarEtiqueta;