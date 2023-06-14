import React, { useState } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import Almacenamiento from '../almacenamientos/Almacenamiento';





interface ComboBoxProps {
  alma: Almacenamiento[];
  onSelect: (id: string) => void;
}

const ComboBoxAlmacenamientos: React.FC<ComboBoxProps> = ({ alma, onSelect }) => {
  const [selectedAlmaId, setselectedAlmaId] = useState('');

  const handlealmaSelect = (event: CustomEvent) => {
    const selectedId = event.detail.value;
    setselectedAlmaId(selectedId);
    onSelect(selectedId);
  };

  return (
    <IonSelect value={selectedAlmaId} placeholder="Seleccionar un almacenamiento" onIonChange={handlealmaSelect}>
      {alma?.map((alma) => (
        <IonSelectOption key={alma.id} value={alma.id}>
          {alma.id}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
};

export default ComboBoxAlmacenamientos;