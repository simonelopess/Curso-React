import React, {Component} from 'react';
import api from '../../services/api'

import './styles.css';

export default class Main extends Component{
    
    state = {
        products: [], //variaveis para armazenar os dados retornados da API (ARRAY)
    };
   
    componentDidMount(){
        this.loadProducts();
    }
    
    loadProducts = async () =>{
        const response = await api.get(`/products`);
        console.log(response.data.docs);
        this.setState({products: response.data.docs}) //armazena os dados retornados na variavel
    }

    render(){
        // return <h1>Contagem de produtos: {this.state.products.length}</h1> //passa a informação pra tela de quantos produtos estão cadastrados
        const {products} = this.state;

        return(
            <div className='product-list'>
                {products.map(product =>(
                    // <h2 key={product._id}>{product.title}</h2> //product._id (insere um chave para cada produto retornado)
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <a href="">Acessar</a>
                    </article>
                ))}
            </div>
        )
    }
}