import React from "react";
import {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import './../components/styles/AddProduct.css';
import { Modal, Button} from 'react-bootstrap';
import {TextField } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { axios }  from 'axios';


import { getProduct, getProducts } from '../services/product.service'
import { createProduct } from '../services/product.service'
import { updateProduct } from '../services/product.service'
import { getCategories } from '../services/categories'
import { getCategoryById } from '../services/categories'
import { createCategory } from '../services/categories'
import { updateCategory } from '../services/categories'

const Products = () => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalInsertarCategoria, setModalInsertarCategoria] = useState(false);
  const [modalEditarCategoria, setModalEditarCategoria] = useState(false);

  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id_product: '',
    name: '',
    description: '',
    price: '',
    quantity_available: '',
    id_category: ''
  });

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({
    id_category: '',
    name: ''
  });

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }     

  const handleCloseEditarCategoria = () => { setModalEditarCategoria(false); }
  const handleOpenEditarCategoria = () => { setModalEditarCategoria(true); }

  const handleCloseInsertarCategoria = () => { setModalInsertarCategoria(false); }
  const handleOpenInsertarCategoria = () => { setModalInsertarCategoria(true); }

  const handleCloseInsertar = () => setModalInsertar(false);
  const handleShowInsertar = () => setModalInsertar(true);
 

  const saveProduct = async (e) => {
    try {
      if (productoSeleccionado.id_product === '' || productoSeleccionado.name === '' || productoSeleccionado.description === ''   
      || productoSeleccionado.price === '' || productoSeleccionado.quantity_available === '' 
      || productoSeleccionado.id_category === '') {
        throw new Error("Tdos los campos son obligatorios");
      }if (productoSeleccionado.price < 0) {
        throw new Error("El precio no puede ser negativo");
      } if (productoSeleccionado.quantity_available < 0) {
        throw new Error("La cantidad disponible no puede ser negativa");
      } else {
        const producto = await createProduct(productoSeleccionado);
        setProduct(producto);
        setModalInsertar(false);
      }
     } catch (error) {
      console.log(error);
    }
  }

  const saveCategoria = async (e) => {  
    try {
      if (categoriaSeleccionada.name === '') {
        throw new Error("El nombre de la categoria es obligatorio");
      } if (categoriaSeleccionada.id_category === '') {
        throw new Error("El id de la categoria es obligatorio");
      } if (categoriaSeleccionada.id_category === categoriaSeleccionada.id_category) {
        throw new Error("El id de la categoria ya existe");
      } else {
        const categoria = await createCategory(categoriaSeleccionada);
        setCategoriaSeleccionada(categoria);
        setModalInsertarCategoria(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editProduct = async (e) => {
    try {
      if (productoSeleccionado.quantity_available < 0) {
        throw new Error("La cantidad disponible no puede ser negativa");
      } else {  
        const { data } = await updateProduct(productoSeleccionado);
        setProduct(data);
        setModalEditar(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editCategory= async (e) => {
    try {
      if (categoriaSeleccionada.name === '') {
        throw new Error("El nombre de la categoria es obligatorio");
      } else {  
        const { data } = await updateCategory(categoriaSeleccionada);
        setCategoriaSeleccionada(data);
        setModalInsertarCategoria(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
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

  const onChangeCategory = (e) => {
    const {name, value}=e.target;
    setCategoriaSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(categoriaSeleccionada);
  } 

  const seleccionarProducto = (elemento, caso) => {
    setProductoSeleccionado(elemento);
    (caso==='Editar')&&setModalEditar(true)
    console.log(elemento);
  }  

  const seleccionarCategoria = (elemento) => {
    setCategoriaSeleccionada(elemento);
    setModalEditarCategoria(true)
    console.log(elemento);
  } 

  useEffect(() => {   
    getProducts()
      .then(({data}) => setProducts(data))
    }, [])
    
  
  useEffect(() => {   
    getProducts()
      .then(({data}) => setProduct(data))
  }, [])  

  useEffect(() => {   
    getCategories()
      .then(({data}) => setCategories(data))
  }, [])  

  const onChangeCombobox = (e) => {
    if (e.target.value === 'Seleccione una categoria'){
      setProducts(product);
    } else{
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
            <select className='select-categorias' onChange={(e)=> {onChangeCombobox(e)}}>
              <option>Seleccione una categoria</option>
              {
                categories.map((category)=>(
                  <option key={category.id_category} value={category.id_category}>{category.name}</option>               
                )
              )}
            </select>
            <div className="boton-categoria">
              <button className='btn btn-primary' onClick={handleOpenInsertarCategoria}>Añadir</button>
            </div>
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
              }
            })
          }
        </div>
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
              }
            })
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
              <Button variant="primary" onClick={()=>editProduct()}>
                Editar
              </Button>
            </Modal.Footer>
          </Modal>
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
                  <Button variant="primary" onClick={()=>saveProduct()}>
                    Añadir producto
                  </Button>
                </Modal.Footer>
              </Modal> 
            </div>
            <div className="btn-normales">
            </div>
          </div>       
      </div>
      <Modal show={modalInsertarCategoria} onHide={handleCloseInsertarCategoria}>
        <Modal.Header closeButton>
          <Modal.Title>AÑADIR CATEGORIA </Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <TextField className="form-control" name="id_category" label="ID" onChange={e=>onChangeCategory(e)}/>
            <TextField className="form-control" name="name" label="Nombre" onChange={e=>onChangeCategory(e)}/>
          </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>handleCloseInsertarCategoria()}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={()=>saveCategoria()}>
                Añadir
              </Button>
            </Modal.Footer>
     </Modal>
     <Modal show={modalEditarCategoria}>
            <Modal.Header>
              <Modal.Title>EDITAR CATEGORIA</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='form-group'>
                <label htmlFor="id_category">ID</label>
                <input className = "form-control" name="id_product" label="ID" onChange={e=>onChangeCategory(e)} value={categoriaSeleccionada&&categoriaSeleccionada.id_category}
                />  
                <br />
                <label htmlFor="name">Nombre</label>
                <input className="form-control" name="name" label="Nombre" onChange={e=>onChangeCategory(e)} value={categoriaSeleccionada&&categoriaSeleccionada.name}/>
                <br />
              </div>
             </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setModalEditarCategoria(false)}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={()=>editCategory()}>
                Editar
              </Button>
            </Modal.Footer>
          </Modal>
    </section>  
  );
};

export default Products;
