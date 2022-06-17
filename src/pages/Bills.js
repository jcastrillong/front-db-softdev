import React from "react";

import FormItem from "../components/FormItem";

import './Bills.css'

const products = [
  {
    id: 1,
    name: "Producto 1",
    price: "$1.000",
    quantity: 1,
    total: "$1.000"
  },
  {
    id: 2,
    name: "Producto 2",
    price: "$1.000",
    quantity: 1,
    total: "$1.000"
  }
]

const Bills = () => {
  return (
    <>
    <form className="form-container">
      <div className="form-group">
        <h2 className="form-group-title">Cliente</h2>
        <div className="form-items-client">
          <FormItem label="Nombre" type="text" />
          <FormItem label="Apellido" type="text"/>
          <FormItem label="C.C / NIT" type="text"/>
          <FormItem label="Dirección" type="text"/>
          <FormItem label="Teléfono" type="text" />
          <FormItem label="Ciudad" type="text"/>
        </div>
      </div>
      <div className="form-group">
        <div className="form-items-product">
          <FormItem label="Cantidad" type="number" />
          <FormItem label="Producto" select options={products}/>
          <FormItem label="Valor" type="text" disable/>
          <FormItem label="Valor Total" type="text" disable/>
          <button className="btn btn-blue">Agregar</button>
        </div>
      </div>
    </form>

    <div className="table-wrapper">
      <table className="tb-products">
        <thead className="tb-products-header">
          <tr>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Detalle</th>
            <th>Valor</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody className="tb-products-body">
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
          <tr>
            <td>Juan</td>
            <td>Perez</td>
            <td>123456789</td>
            <td>Calle 123</td>
            <td>123456789</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="btn-group">
      <button className="btn btn-blue">Agregar Factura</button>
      <button className="btn btn-red">Cancelar</button>
    </div>
    </>
  );
};

export default Bills;
