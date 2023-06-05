import React, { useState } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import Recepcion from './Recepcion';


interface ComboBoxProps {
  recepcion: Recepcion[];
  onSelect: (idRecep: string) => void;
}

const ComboBoxRecepcion: React.FC<ComboBoxProps> = ({ recepcion, onSelect }) => {
  const [selectedRecepId, setSelectedRecepId] = useState('');

  const handleRecepSelect = (event: CustomEvent) => {
    const selectedId = event.detail.value;
    setSelectedRecepId(selectedId);
    onSelect(selectedId);
  };

  return (
    <IonSelect value={selectedRecepId} placeholder="Seleccionar una recepcion" onIonChange={handleRecepSelect}>
      {recepcion.map((recep) => (
        <IonSelectOption key={recep.idRecep} value={recep.idRecep}>
          {recep.idRecep}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
};

export default ComboBoxRecepcion;