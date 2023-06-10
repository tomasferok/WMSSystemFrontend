import React, { useState } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';
import Proveedor from './Proveedor';




interface ComboBoxProps {
  proveedor: Proveedor[];
  onSelect: (documento: number) => void;
}

const ComboBoxProveedores: React.FC<ComboBoxProps> = ({ proveedor, onSelect }) => {
  const [selectedProvId, setselectedProvId] = useState('');

  const handleprovSelect = (event: CustomEvent) => {
    const selectedId = event.detail.value;
    setselectedProvId(selectedId);
    onSelect(selectedId);
  };

  return (
    <IonSelect value={selectedProvId} placeholder="Seleccionar un proveedor" onIonChange={handleprovSelect}>
      {proveedor?.map((prov) => (
        <IonSelectOption key={prov.idProv} value={prov.idProv}>
          {prov.documento}
        </IonSelectOption>
      ))}
    </IonSelect>
  );
};

export default ComboBoxProveedores;