import { IonButton, IonIcon } from '@ionic/react';
import { addCircleSharp, cartSharp } from 'ionicons/icons';
import React from 'react';


interface CardProps {
  title: string;
  iconCard: string;
}

const Card: React.FC<CardProps> = ({ title, iconCard }) => {
  return (
    <div className="card">
    <h2 className="card-title">{title}</h2>
    <IonIcon className='cardIcons' icon={iconCard}></IonIcon>
  </div>
  );
};

export default Card;
