import React from 'react';
import './BotaoToggle.css';

const BotaoToggle = ({ visivel, onToggle, quantidade }) => {
  return (
    <button onClick={onToggle}>
      {visivel ? 'Fechar Carrinho' : 'Meu Carrinho'} 
    </button>
  );
};

export default BotaoToggle;
