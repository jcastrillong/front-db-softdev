import React from "react";
import { PDFViewer } from '@react-pdf/renderer'

import DocumentPDF from "../components/DocumentPDF";

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
  return (
    <div>
      <PDFViewer>
        <DocumentPDF details={details} />
      </PDFViewer>
    </div>
  );
}

export default Bills;
