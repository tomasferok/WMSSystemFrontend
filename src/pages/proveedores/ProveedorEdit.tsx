import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonPopover, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { add, checkmark, close, save } from "ionicons/icons";
import Proveedor from "./Proveedor";
import { saveProv, searchProv, searchProvById } from "./ProvApi";
import ComboBoxProveedores from "./ComboBoxProveedores";


const ProveedorEdit: React.FC = () => {
const [prov, setProv] = useState<Proveedor>({});

  useEffect(() => {
    

  }, []);
  
  const save = async () => {
    
    await saveProv(prov);
    
  }
  return (
    <IonPage>
      <IonHeader>

        <IonToolbar>
        <IonTitle>Crear Proveedor</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Proveedor</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonTitle>Editar Proveedor</IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">NameProd </IonLabel> 
                  <IonInput placeholder="Se debe ingresar un contacto" onIonChange={e => prov.contacto = String(e.target.value)}
                  value={prov.contacto}/>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Precio</IonLabel>
                  <IonInput placeholder="Se debe ingresar un documento" onIonChange={e => prov.documento = Number(e.target.value)}
                  value={prov.documento}/>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Cantidad</IonLabel>
                  <IonInput placeholder="Se debe ingresar un nombre" onIonChange={e => prov.nombreProv = String(e.target.value)}
                  value={prov.nombreProv}/>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">IdAlmacenamiento</IonLabel>
                  <IonInput placeholder="Se debe ingresar un nombre" onIonChange={e => prov.email = String(e.target.value)}
                  value={prov.email}/>
                </IonItem>
              </IonCol>
            </IonRow>
           
            <IonItem>
              <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
              </IonButton>
            </IonItem>

          </IonCard>
         

        </IonContent>






      </IonContent>
    </IonPage>
  );
};

export default ProveedorEdit;