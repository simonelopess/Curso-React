import React, {Component} from 'react';
import api from '../../services/api';
import {Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component{
    
    state = {
        products: [], //variaveis para armazenar os dados retornados da API (ARRAY)
        productInfo:{},
        page: 1,
    };
   
    componentDidMount(){
        this.loadProducts();
    }
    
    loadProducts = async (page = 1) =>{
        const response = await api.get(`/products?page=${page}`);
        
        const {docs, ...productInfo} = response.data;  //pega todos os campos do docs

        this.setState({products: docs, productInfo,page}) //armazena os dados retornados na variavel
    }

    prevPage = () =>{
        const {page, productInfo} = this.state;

        if(page === 1) return;

        const pageNumber = page -1;

        this.loadProducts(pageNumber);


    } //criação de função para chamar próxima página
    nextPage = () =>{
        const {page, productInfo} = this.state;

        if(page ===productInfo.pages) return; //função pages contabiliza o numero de páginas

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render(){
        // return <h1>Contagem de produtos: {this.state.products.length}</h1> //passa a informação pra tela de quantos produtos estão cadastrados
        const {products, page, productInfo} = this.state;

        return(
            <div className='product-list'>
                {products.map(product =>(
                    // <h2 key={product._id}>{product.title}</h2> //product._id (insere um chave para cada produto retornado)
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/product._id`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button disabled = {page === productInfo.pages} onClick={this.nextPage}>Próximo</button> 
                </div>
            </div>
        )
    }
}