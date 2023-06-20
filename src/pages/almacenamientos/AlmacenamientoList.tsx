import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import ExploreContainer from '../../components/ExploreContainer';
import { add, close, eye, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { removeAlma, searchAlma } from './AlmacenamientoApi';

import Almacenamiento from './Almacenamiento';


const AlmacenamientoList: React.FC = () => {

const [almas, setAlma] = useState<Almacenamiento[]>([]);
  const { name } = useParams<{ name: string; }>();
  const history = useHistory();
  useEffect(() =>{
    search();
  }, [history.location.pathname]);
  const search = async () => {
    let result = await searchAlma();
    setAlma(result);
  }

  const remove = async (id: string) => {
    await removeAlma(id);
    search();
  }

  const addAlma = () => {
    history.push('/page/alma/new');
  }

  const editAlma = (id: string) => {
    history.push('/page/alma/' + id);
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
            <IonTitle>Almacenamiento Managment</IonTitle>

            <IonItem>
              <IonButton onClick={addAlma} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add} />
                Add Almacenamiento
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>Id</IonCol>
                
              </IonRow>

              {almas.map((alma: Almacenamiento) =>
              <IonRow>
                  <IonCol>{alma.id}</IonCol>
                
                  <IonCol>
                    <IonButton color="primary" fill="clear" onClick={()=> editAlma(String(alma.id))}
                     >
                      <IonIcon icon={eye} slot="icon-only" />
                    </IonButton>
                    <IonButton color="danger" fill="clear"
                      onClick={() => remove(String(alma.id))}>
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

export default AlmacenamientoList;