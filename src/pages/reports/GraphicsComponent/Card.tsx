import { IonButton, IonIcon } from '@ionic/react';
import { addCircleSharp, cartSharp } from 'ionicons/icons';
import React from 'react';


interface CardProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <div className="card">
    <h2 className="card-title">{title}</h2>
    <IonIcon className='cardIcons' icon={cartSharp}></IonIcon>
  </div>
  );
};

export default Card;
