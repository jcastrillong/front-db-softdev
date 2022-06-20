import React from "react";
import {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import './../components/styles/AddProduct.css';
import { Modal, Button} from 'react-bootstrap';
import {TextField } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { axios }  from 'axios';

const Products = () => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  const formatNumber = (number) =>{
    return new Intl.NumberFormat('en-US').format(number);
  }

  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id_product: '',
    name: '',
    description: '',
    price: formatNumber(''),
    quantity_available: formatNumber(''),
    id_category: ''
  });

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }  

  const handleCloseInsertar = () => setModalInsertar(false);
  const handleShowInsertar = () => setModalInsertar(true);

  const peticionPut = async (productoSeleccionado) => {  
    const url = 'http://localhost:4000/Products';
    const {data} = await axios.put(`${url}/${productoSeleccionado.id_product}`, productoSeleccionado);
    return data;
    console.log(data);
  }  

  const peticionPost = async () => {
      return fetch('http://localhost:4000/Products', { 
        method:"POST", 
        body: JSON.stringify(productoSeleccionado),
        headers: {
          "content-type": "application/json"
        },
      })
      .then((res)=>res.json())
      .then((res)=>{
        setModalInsertar(false);
      })
      .catch ((err)=>{
        console.log(err)
      })
    }  

  const getCategories = () => {
    return fetch('http://localhost:4000/Categories', { 
      method:"GET", 
      headers: {
        "content-type": "application/json"
      },
    })
      .then((res)=>res.json())
      .then((res)=>{
        setCategories(res)
      })
      .catch ((err)=>{
        console.log(err)
      })
  } 

  const getProducts = () => {
    return fetch('http://localhost:4000/Products', { 
      method:"GET", 
        headers: {
          "content-type": "application/json"
        },
    })
    .then((res)=>res.json())
    .then((res)=>{
      setProducts(res)
      setProduct(res)
    })
    .catch ((err)=>{
      console.log(err)
    });
  } 

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda)=>{
    var resultadosBusqueda = product.filter((elemento)=> {
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
      }
    })  
    setProducts(resultadosBusqueda);
  }  

  const onChange = (e) => {
    const {name, value}=e.target;
    setProductoSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(productoSeleccionado);
  } 

  const seleccionarProducto = (elemento, caso) => {
    setProductoSeleccionado(elemento);
    (caso==='Editar')&&setModalEditar(true)
    console.log(elemento);
  }  

  useEffect(() => {   
    getProducts()
    getCategories()
  }, []) 

  const onChangeCombobox = (e) => {
    if (e.target.value === 'Seleccione una categoria'){
      setProducts(product)
    }
    else{
      const selectedId = e.target.value;
      var selectedProduct = product.filter(category => category.id_category == selectedId)
      console.log(selectedProduct);
      setProducts(selectedProduct);
    } 
  }


  return (
    <section className='container-app'>
      <div className='container-div'>
        <header className='header-app'>  
          <div className='categorias-filtro'>
            <select className='select-categorias' onChange={(e)=> {onChangeCombobox(e);}}>
              <option>Seleccione una categoria</option>
              {
                categories.map((category)=>(
                  <option key={category.id_category} value={category.id_category}>{category.name}</option>                )
              )}
            </select>
          </div>  
          <div className="container-input">
            <input 
              className="form-control inputBuscar"
              value = {busqueda}
              placeholder= "Buscar"
              onChange = {handleChange}
            /> 
            <button className="btn btn-success btn-buscar">
              <FontAwesomeIcon icon={faSearch}/>
            </button>
          </div> 
        </header>   
        <div className='products'>
          <h1> PRODUCTOS DISPONIBLES </h1>
          {
            products.map(product=>{
              if(product.quantity_available > 0){
              return(
                <div className='product-content'>
                  <div className='product-body'>
                      <h2 key = {product.id_product} className='product-id'>{product.id_product}</h2>
                      <p className='product-name'>{product.name}</p>
                      <p className='product-description'>{product.description}</p>
                      <p className='product-price'>${product.price}</p>
                      <p className='product-stock'>{product.quantity_available}</p>
                    <div className='product-btn'>
                      <Button className="btn btn-primary" onClick={()=>seleccionarProducto(product, 'Editar')}> Editar </Button>
                    </div>
                  </div>   
                </div>
              )
            }})
          }
          </div>
          <Modal show={modalEditar}>
            <Modal.Header>
              <Modal.Title>EDITAR PRODUCTOS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='form-group'>
                <label htmlFor="id_product">ID</label>
                <input className = "form-control" name="id_product" label="ID" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.id_product}
                />  
                <br />
                <label htmlFor="name">Nombre</label>
                <input className="form-control" name="name" label="Nombre" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.name}/>
                <br />
                <label htmlFor="description">Descripcion</label>
                <input className="form-control" name="description" label="Descripcion" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.description}/>
                <br />
                <label htmlFor="price">Precio</label>
                <input className="form-control" name="price" label="Precio" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.price}/>
                <br />
                <label htmlFor="quantity_available">Cantidad</label>
                <input className="form-control" name="quantity_available" label="Cantidad" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.quantity_available}/>
                <br />
                <label htmlFor="id_category">Categoria</label>
                <input className="form-control" name="id_category" label="Categoria" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.id_category}/>
                <br />
              </div>
             </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setModalEditar(false)}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={()=>peticionPut(productoSeleccionado.id_product)}>
                Editar
              </Button>
            </Modal.Footer>
          </Modal>
          <div className='products'>
          <h1> PRODUCTOS AGOTADOS </h1>
          {
            products.map(product=>{
              if(product.quantity_available === 0){
              return(
                <div className='product-content'>
                  <div className='product-body'>
                      <h2 key = {product.id_product} className='product-id'>{product.id_product}</h2>
                      <p className='product-name'>{product.name}</p>
                      <p className='product-description'>{product.description}</p>
                      <p className='product-price'>${product.price}</p>
                      <p className='product-stock'>{product.quantity_available}</p>
                    <div className='product-btn'> 
                      <Button className="btn btn-primary" onClick={()=>seleccionarProducto(product, 'Editar')}> Editar </Button>
                    </div>
                  </div>   
                </div>
              )
            }})
          }
           <Modal show={modalEditar}>
            <Modal.Header>
              <Modal.Title>EDITAR PRODUCTOS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='form-group'>
                <label htmlFor="id_product">ID</label>
                <input className = "form-control" name="id_product" label="ID" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.id_product}
                />  
                <br />
                <label htmlFor="name">Nombre</label>
                <input className="form-control" name="name" label="Nombre" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.name}/>
                <br />
                <label htmlFor="description">Descripcion</label>
                <input className="form-control" name="description" label="Descripcion" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.description}/>
                <br />
                <label htmlFor="price">Precio</label>
                <input className="form-control" name="price" label="Precio" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.price}/>
                <br />
                <label htmlFor="quantity_available">Cantidad</label>
                <input className="form-control" name="quantity_available" label="Cantidad" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.quantity_available}/>
                <br />
                <label htmlFor="id_category">Categoria</label>
                <input className="form-control" name="id_category" label="Categoria" onChange={e=>onChange(e)} value={productoSeleccionado&&productoSeleccionado.id_category}/>
                <br />
              </div>
             </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setModalEditar(false)}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={()=>peticionPut(productoSeleccionado.id_product)}>
                Editar
              </Button>
            </Modal.Footer>
          </Modal>
          </div>
          <div className="btn-final"> 
            <div className="btn-add">     
              <Button variant="contained" className="btn btn-primary" onClick={handleShowInsertar}> Nuevo producto </Button>  
              <Modal show={modalInsertar} onHide={handleCloseInsertar}>
                <Modal.Header closeButton>
                  <Modal.Title>AÑADIR PRODUCTO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <TextField className="form-control" name="id_product" label="ID" onChange={e=>onChange(e)}/>
                  <TextField className="form-control" name="name" label="Nombre" onChange={e=>onChange(e)}/>
                  <TextField className="form-control" name="description" label="Descripcion" onChange={e=>onChange(e)}/>
                  <TextField className="form-control" name="price" label="Precio" onChange={e=>onChange(e)}/>
                  <TextField className="form-control" name="quantity_available" label="Cantidad" onChange={e=>onChange(e)}/>
                  <TextField className="form-control" name="id_category" label="Categoria" onChange={e=>onChange(e)}/>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>handleCloseInsertar()}>
                    Cerrar
                  </Button>
                  <Button variant="primary" onClick={()=>peticionPost()}>
                    Añadir producto
                  </Button>
                </Modal.Footer>
              </Modal> 
            </div>
            <div className="btn-normales">
            </div>
          </div>       
      </div>
    </section>  
  );
};

export default Products;
