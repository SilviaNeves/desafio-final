import React from 'react';
import PropTypes from 'prop-types';
import './Carrinho.css';
import CarrinhoItem from './CarrinhoItem';

const Carrinho = ({ itensCarrinho, removerDoCarrinho, fecharCarrinho }) => {
  // Função para calcular o subtotal
  const calcularSubtotal = () => {
    return itensCarrinho.reduce((total, item) => total + item.price, 0).toFixed(2);
  };


  return (
    <div className='container'>
      <h1> 🛒 </h1>
      {itensCarrinho.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          {itensCarrinho.map((item, index) => (
          <CarrinhoItem key={item.id} item={item} onRemove={() => removerDoCarrinho(index)} />
          ))}
          <h2>Subtotal: R$ {calcularSubtotal()}</h2> {/* Exibe o subtotal */}
        </>
      )}
   </div>
  );
};



Carrinho.propTypes = {
  itensCarrinho: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  removerDoCarrinho: PropTypes.func.isRequired,
};

export default Carrinho;
