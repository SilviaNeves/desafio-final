import React from 'react';
import './Carrinho.css';
import CarrinhoItem from './CarrinhoItem';

const Carrinho = ({ itensCarrinho, removerDoCarrinho }) => {
  return (
    <div className='container'>
      <h1>🛒 Meu Carrinho</h1>
      {itensCarrinho.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        itensCarrinho.map((item, index) => (
          <CarrinhoItem key={index} item={item} onRemove={() => removerDoCarrinho(index)} />
        ))
      )}
    </div>
  );
};


export default Carrinho;
