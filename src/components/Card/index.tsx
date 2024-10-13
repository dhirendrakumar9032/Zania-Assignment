import { FC } from 'react';
import { List } from '../../containers/cardContainers';
import './index.css';

interface CardProps {
  item: List;
}

const CardComponent: FC<CardProps> = ({ item }) => {
  return (
    <div className="card">
      <h3>{item.title}</h3>
      {item.isLoading ? (
        <div>Loading...</div>
      ) : (
        <img src={item.link} alt={item.title} />
      )}
    </div>
  );
};

export default CardComponent;
