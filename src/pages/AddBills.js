import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import sweal from 'sweetalert';

import FormItem from "../components/FormItem";
import Context from "../context/UserContext"

import { getProduct, getProducts } from '../services/product.service'
import { createBill } from "../services/bill.service";
import { createClient } from "../services/client.service";
import { createDetail } from "../services/detail.service";

import './AddBills.css'

const medioDePago = ["Efectivo", "Tarjeta de debito", "Tarjeta de credito"];

const AddBills = () => {
  const { user } = useContext(Context);
  const [client, setClient ] = useState({
    firstName: "",
    lastName: "",
    idClient: "",
    address: "",
    phone: "",
    city: "",
  })
  const [ detail, setDetail ] = useState({})
  const [ products, setProducts ] = useState([]);
  const [ details, setDetails ] = useState([]);
  const [ productSelected, setProductSelected ] = useState("");
  const [ bill, setBill ] = useState({
    idEmployee: user.user.idEmployee,
    idClient: "",
    wayToPay: "",
    date: "",
  })
  const navigate = useNavigate();

  // USE EFFECT
  useEffect(() => {
    getProducts()
      .then(({data}) => setProducts(data))
  }, [])

  useEffect(() => {
    setBill({...bill, idClient: +client.idClient})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client])
  
  useEffect(() => {
    calcularTotalBill();
    calcularTotalDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details, productSelected])

  // FUNCTIONS
  const handleChangeClient = (e) => {
    e.preventDefault();
    setClient({
      ...client,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeBill= (e) => {
    e.preventDefault();
    setBill({
      ...bill,
      [e.target.name]: e.target.value
    })
  }
  
  const saveBill= (e) => {
    try {
      if(client.firstName === "" || client.lastName === "" || client.idClient === "" || client.address === "" || client.phone === "" || client.city === "" || bill.wayToPay === "" || bill.date === "") {
        throw new Error("Todos los campos son obligatorios");
      }
      if(details.length === 0) {
        throw new Error("No hay productos en la factura");
      }
      createClient({
        ...client,
        idClient: +client.idClient,
        phone: +client.phone
      })
        .then((res) => {
          console.log(res)
          return res;
        }) 
        .then(() => {
          createBill(bill)
            .then((res) => {
              console.log(res)
              return res;
            }
            ).then((res) => {
              details.forEach((detail) => {
                createDetail({
                  ...detail,
                  idBill: res.data.idBill,
                  idProduct: detail.product.idProduct,
                })
                 .then((res) => {
                  return res;
                  })
              })
              sweal("Factura creada", "success");
            }
            ).then(() => {
              navigate("/bills")
            }
            ).catch(err => {
              sweal(err.message, "Error", "error")
            }
            )
        }
        ).catch(err => {
          sweal(err.message, "Error", "error")
        }
        )
    } catch (error) {
      sweal({
        title: "Error",
        text: error.message,
        icon: "warning",
        timer: 2000,
      })
    }
  }

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/");
  }

  const addDetail = (newDetail) => {
    if(Object.keys(productSelected).length > 0) {
      if(details.length > 0) {
        for (let i = 0; i < details.length; i++) {
          if(details[i].product.idProduct === newDetail.product.idProduct) {
            details[i].quantity += newDetail.quantity;
            details[i].totalValue += newDetail.totalValue;
            setDetails([...details]);
            return;
          }          
        }
        setDetails([...details, newDetail]);
      } else {
        setDetails([...details, newDetail])
      }
    } else {
      sweal({
        title: "Error",
        text: "Complete los campos requeridos",
        icon: "warning",
        button: "Aceptar",
        timer: 2500,
        dangerMode: true
      })
    }
  }

  const formDetalle = (e) => {
    e.preventDefault();
    const quantity = +e.target[0].value
    const detail = {
      quantity,
      product: productSelected,
      totalValue: quantity * productSelected.price
    }
    addDetail(detail)
  }

  const getProductSelected = (e) => {
    e.preventDefault();
    const idProduct = e.target.options[e.target.selectedIndex].id
    getProduct(idProduct)
    .then((res) => {
      setProductSelected(res.data)
    }
    ).catch((err) => {
      console.log("err", err);
    }
    );
  }

  const deleteDetail = (e) => {
    e.preventDefault();
    const id = e.target.value
    const products = details.filter((detail) => {
      if(detail.product.idProduct !== +id) {
        return detail
      }
    })
    setDetails(products)
  }
  
  const calcularTotalDetail = () => {
    const quantity = document.getElementById("quantity")
    if(quantity) {
      setDetail({
        ...detail,
        totalValue: quantity.value * productSelected.price
      })
    }
  }
  
  const calcularTotalBill = () => {
    bill.total = details.reduce((total, detail) => {
      return total + detail.totalValue
    }
    , 0)
  }

  return (
    <>
      {/* FORM CLIENT */}
      <div className="form-group">
        <div className="form-items-client">
          <FormItem name="firstName" value={client.firstName} label="Nombre" type="text" onChange={handleChangeClient}/>
          <FormItem name="lastName" value={client.lastName} label="Apellido" type="text" onChange={handleChangeClient}/>
          <FormItem name="idClient" value={client.idClient} label="C.C / NIT" type="number" onChange={handleChangeClient}/>
          <FormItem name="address" value={client.address} label="Dirección" type="text" onChange={handleChangeClient}/>
          <FormItem name="phone" value={client.phone} label="Teléfono" type="tel" onChange={handleChangeClient}/>
          <FormItem name="city" value={client.city} label="Ciudad" type="text" onChange={handleChangeClient}/>
          <FormItem name="date" value={bill.date} label="Fecha" type="date" onChange={handleChangeBill}/>
          <div className="form-item">
            <label>Medio de Pago</label>
            <select name="wayToPay" defaultValue={0} onChange={handleChangeBill}>
              <option value="0" disabled>--Select Product--</option>
              {
                medioDePago.map((option) => {
                  return (
                    <option key={option} id={option} value={option.toLowerCase()}>{option}</option>
                  )
                })  
              }
            </select>
          </div>
        </div>
      </div>
      
      {/* FORM DETAIL */}
      <form className="form-container" onSubmit={formDetalle}>
        <div className="form-group">
          <div className="form-items-product">
            {
              productSelected
              ? <FormItem id="quantity" label="Cantidad" type="number" min={1} max={productSelected.quantityAvailable} defaultValue={1} onChange={calcularTotalDetail}/>
              : <FormItem id="quantity" label="Cantidad" type="number" min={1} max={productSelected.quantityAvailable} defaultValue={0} onChange={calcularTotalDetail} disabled/>
            }
            <FormItem id="select-products" label="Producto" options={products} defaultValue="0" onChange={getProductSelected}/>
            <FormItem id="price-product" label="Valor" type="number" value={productSelected.price ? productSelected.price : 0} disabled/>
            <FormItem label="Valor Total" type="number" value={detail.totalValue ? detail.totalValue : 0} disabled/>
            <button className="btn btn-blue">Agregar</button>
          </div>
        </div>
      </form>
      {/*TABLE PRODUCTS*/}
      <div className="table-wrapper">
              <table className="tb-products">
                <thead className="tb-products-header">
                  <tr>
                    <th>Cantidad</th>
                    <th>Producto</th>
                    <th>Detalle</th>
                    <th>Valor</th>
                    <th>Valor Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="tb-products-body">
                  {
                    details.map((detail) => {
                      return (
                        <tr key={detail.product.idProduct} id={detail.product.idProduct}>
                          <td>{detail.quantity}</td>
                          <td>{detail.product.name}</td>
                          <td>{detail.product.description}</td>
                          <td>{detail.product.price}</td>
                          <td>{detail.totalValue}</td>
                          <td>
                            <button value={detail.product.idProduct} className="btn btn-red" onClick={deleteDetail}>Eliminar</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
                <tfoot className="tb-products-footer">
                  <tr>
                    <td id="tb-total" colSpan={5}>Total</td>
                    <td>{bill.total}</td>            
                  </tr>
                </tfoot>
              </table>
      </div>
      {/*BUTTONS BILL*/}
      <div className="btn-group">
        <button className="btn btn-blue" onClick={saveBill}>Guardar</button>
        <button className="btn btn-red" onClick={cancelHandler}>Cancelar</button>
      </div>
    </>
  );
};

export default AddBills;
