import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PDFViewer } from '@react-pdf/renderer'

import DocumentPDF from "../components/DocumentPDF";
import { getBills, getBill } from "../services/bill.service"

import "./Bill.css"

const details = [
  {
    cantidad: 1,
    descripcion: "Producto 1",
    valor: 100000,
    valorTotal: 100
  },
  {
    cantidad: 3,
    descripcion: "Producto 212312 123 12 312 31231 231 2321 3123",
    valor: 300,
    valorTotal: 900
  },
  {
    cantidad: 2,
    descripcion: "Producto 3",
    valor: 500,
    valorTotal: 1000
  },
  {
    cantidad: 1,
    descripcion: "Producto 4",
    valor: 1000,
    valorTotal: 1000
  },
]

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [bill, setBill] = useState({
    client: {},
    productsSold: [],
    total: 0
  });
  
  useEffect(() => {
    getBills().then(res => {
      console.log(res)
      setBills(res);
    });
  }, []);
  console.log(bill)
  const handleClick = (e) => {
    const id = e.target.id
    getBill(id).then(res => {
      setBill(res);
    });
  }

  return (
    <div className="bill-content">
      <div className="bill-subcontent">
        <div className="list-bills">
        {
          bills.map((bill, key) => (
            <div className="bill-item" key={bill.idBill} onClick={handleClick}>
              <div className="bill-key" id={bill.idBill}>{key + 1}</div>
              <div className="bill-id" id={bill.idBill}>{`Factura No. ${bill.idBill}`}</div>
              <div className="bill-date" id={bill.idBill}>{bill.date.split("T")[0]}</div>
            </div>
          ))
        }
        </div>
        <Link to="/add-bills" className="btn btn-blue">Agregar Factura</Link>
      </div>
      {
        bill 
          ? (
            <div className="view-bill-pdf">
              <PDFViewer style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                borderColor: "#9F9F9F"
              }}>
                <DocumentPDF bill={bill} />
              </PDFViewer>
            </div>
          ) : null
      }
    </div>
  );
}

export default Bills;
