import React from 'react';
const CarrinhoItem = ({ item, onRemove }) => {
    return (
    <div className='remove'>
        <h4>{item.title}</h4>
        <p>Valor: R$ {Number(item.price).toFixed(2)} </p>
        <button className='removeItem' onClick={() => onRemove(item.id)}>Remover Item X</button>
    </div>
    );
};
export default CarrinhoItem;


