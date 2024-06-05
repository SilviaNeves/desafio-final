import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './componentes/header/logo.png';
import Carrinho from './componentes/Carrinho/Carrinho';


const App = () => {
const [itens, setItens] = useState([]);
const [carregando, setCarregando] = useState('false');
const [erro, setErro] = useState('null');
const [pesquisa, setPesquisa] = useState("");
const [categorias, setCategorias] = useState([]);
const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
const [carrinho, setCarrinho] = useState([]);
const [carrinhoVisivel, setCarrinhoVisivel] = useState([true]);


// Função para buscar itens na api do mercado livre
  const buscarItem = async (consulta = "", categorias="")=>{
    setCarregando(true);
    setErro(null);
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=ofertas${consulta}${categorias ? `&category=${categorias}` : ''}`);
      const data = await response.json();
      setItens(data.results);
    } catch (error) {
      setErro(error);
    } finally {
      setCarregando(false);
    }
  };
  const buscarCategorias = async () => {
    try {
      const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      setErro(error);
    }
  };
// useEffect para buscar os itens iniciais
  useEffect (() => { 
    buscarItem();
    buscarCategorias();
  }, [ ]);
  // Função para pesquisar itens na api do mercado livre
  const handleSearch=(evento) => {
    evento.preventDefault();
    buscarItem(pesquisa, categoriaSelecionada);
  };
  // Função para adicionar item ao carrinho
  const adicionarAoCarrinho = (item) => {
    setCarrinho([...carrinho, item]);
  };

  // Função para remover item do carrinho
  const removerDoCarrinho = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
  };
  // Função para alternar visibilidade do carrinho
  const toggleCarrinhoVisivel = () => {
    setCarrinhoVisivel(!carrinhoVisivel);
  };


  // Função para pesquisar itens na api do mercado livre
  return (
    <div className="App">
      <header className="App-header">
          <img src= {logo} alt='logo' className='logo-header'/>
          <h1>Mercado Campinho Girassol</h1>
            <button onClick={toggleCarrinhoVisivel}>
              {carrinhoVisivel ? 'Ocultar Carrinho' : 'Mostrar Carrinho'}
            </button>
          {carrinhoVisivel && (
        <Carrinho
          itensCarrinho={carrinho}
          removerDoCarrinho={removerDoCarrinho}
        />
      )}
</header>
      <form className='pesquisa-form' onSubmit={handleSearch}>    
        <select
          value={categoriaSelecionada}
          onChange={e => setCategoriaSelecionada(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          {categorias.map(categoria => (
          <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
          ))}
          </select>
        <input type="text" 
          placeholder="  Pesquise pelo seu produto  🔍" 
          value={pesquisa} 
          onChange={e => setPesquisa(e.target.value)}
          />
          <button type='submit' className='buttonPesquisar'> Pesquisar 🔍</button>
      </form>

          {carregando && <div> Carregando </div>}
          {erro && <div>Erro: {erro.message} </div>}
 
<div className="itens-container">
  {itens.map((item )=> (
    <div key={item.id} className='item-card'>
      <div className='item-image'>
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div className='item-details'>
        <h2>{item.title}</h2>
        <h3> Valor: R$ {Number(item.price).toFixed(2)} </h3>
        <a href={item.permalink} target='_blank' rel='noopener noreferrer'>Ver Produto
        </a>
        <button onClick={() => adicionarAoCarrinho(item)}>Comprar</button>
      </div>
    </div>  
  ))}
</div> 

</div>
);
}
export default App;

