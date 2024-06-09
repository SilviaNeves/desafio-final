import React from 'react';
import PropTypes from 'prop-types';
import './CarrinhoItem.css';
const CarrinhoItem = ({ item, onRemove }) => {
    return (
    <div className='remove'>
        <h4>{item.title}</h4>
        <p>Valor: R$ {Number(item.price).toFixed(2)} </p>
        <button className='removeItem' onClick={() => onRemove(item.id)}>Remover Item X</button>
    </div>
    );
};

CarrinhoItem.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
  };
export default CarrinhoItem;
