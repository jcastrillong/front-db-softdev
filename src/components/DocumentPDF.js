import React from 'react';
import { 
  Document, 
  Page, 
  View,
  Text,
  StyleSheet,
  Image
} from '@react-pdf/renderer'
import logo from '../img/logo.jpeg'

// STYLES
const styles = StyleSheet.create({
  headerText: {
    fontSize: 11,
    textAlign: "center",
    fontWeight: "bold"
  },
  clientText: {
    fontSize: 11,
    textAlign: "left",
    fontWeight: "bold"
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { 
    margin: "auto", 
    flexDirection: "row",
  },
  tableCell: {
    margin: 5,
    fontSize: 11,
    textAlign: "center",
    fontWeight: 500,
    overflow: "hidden",
  },
  columnWidth1: {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  columnWidth2: {
    width: "30%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  columnWidth3: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

const DocumentPDF = ({bill}) => {
  return (
    <Document>
      <Page size="B5" style={{ fontFamily: "Courier"}}>
        <View style={{ display: "flex", flexDirection: "column", padding: "15px" }}>
          {/* HEADER BILL */}
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" , border: "1px", borderBottomWidth: 0}}>
            <View>
              <Image 
                style={{ width: "80px", height: "80px", marginLeft: "10px" }}
                src={logo} 
              />
            </View>
            <View style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <Text style={{ fontSize: "14px", marginTop: "5px"}}>
                TECNOCOMPUTO PROVIDENCIA
              </Text>
              <Text style={styles.headerText}>
                NIT 1193594296-3
              </Text>
              <Text style={styles.headerText}>
                BARRIO LA BASE
              </Text>
              <Text style={styles.headerText}>
                CALI - VALLE
              </Text>
              <Text style={styles.headerText}>
                TELEFONO 302 374 9990
              </Text>
            </View>
            <View style={{ borderLeft: "1px solid black" }}>
              <Text style={{
                fontSize: "10px",
                textAlign: "left",
                padding: "0px 10px 0px 5px"
              }}>
                FACTURA 
              </Text>
              <Text style={{
                fontSize: "10px",
                padding: "0px 0px 0px 5px"
              }}>
                No.
              </Text>
              <Text style={{
                color: "red",
                fontSize: "10px",
                padding: "0px 5px 0px 5px",
                marginTop: "20px"
              }}>
                {bill.idBill}
              </Text>
            </View>
          </View>

          {/* CLIENT BILL */}
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "spacer-beetween", border: "1px", borderBottomWidth: 0}}>
            <View style={{ width: "100%", borderRight: "1px", padding: "10px 5px"}}>
              <Text style={styles.clientText}>
                CLIENTE: {bill.client.firstName} {bill.client.lastName}
              </Text>
              <Text style={styles.clientText}>
                C.C / NIT: {bill.client.idClient}
              </Text>
              <Text style={styles.clientText}>
                DIRECCION: {bill.client.address}
              </Text>
              <Text style={styles.clientText}>
                TELEFONO: {bill.client.phone}
              </Text>
              <Text style={styles.clientText}>
                CIUDAD: {bill.client.city}
              </Text>
            </View>
            <View style={{ width: "100%", padding: "5px"}}>
              <Text style={styles.clientText}>
                FORMA DE PAGO: {bill.wayToPay}
              </Text>
              <Text style={styles.clientText}>
                FECHA: {bill.date}
              </Text>
            </View>
          </View>

          {/* TABLE PRODUCTS BILL */}
          <View style={styles.table}>
            { /* TABLE HEADER */}
            <View style={styles.tableRow}>
              <View style={styles.columnWidth1}>
                <Text style={styles.tableCell}>CANTIDAD</Text>
              </View>
              <View style={styles.columnWidth2}>
                <Text style={styles.tableCell}>DETALLE</Text>
              </View>
              <View style={styles.columnWidth1}>
                <Text style={styles.tableCell}>VALOR</Text>
              </View>
              <View style={styles.columnWidth2}>
                <Text style={styles.tableCell}>VALOR TOTAL</Text>
              </View>
            </View>

            { /* TABLE CONTENT */}
            {
              bill.productsSold.map((detail) => {
                return (
                  <View style={styles.tableRow}>
                    <View style={styles.columnWidth1}>
                      <Text style={styles.tableCell}>{detail.quantity}</Text>
                    </View>
                    <View style={styles.columnWidth2}>
                      <Text style={styles.tableCell}>{detail.product.description}</Text>
                    </View>
                    <View style={styles.columnWidth1}>
                      <Text style={styles.tableCell}>{detail.product.price}</Text>
                    </View>
                    <View style={styles.columnWidth2}>
                      <Text style={styles.tableCell}>{detail.totalValue}</Text>
                    </View>
                  </View>
                )
              })
            }

            <View style={styles.tableRow}>
              <View style={styles.columnWidth3}>
                <Text style={styles.tableCell}>TOTAL</Text>
              </View>
              <View style={styles.columnWidth3}>
                <Text style={{ 
                  textAlign: "right", 
                  fontSize: 11,
                  margin: "5px"
                }}>
                  {bill.total}
                </Text>
              </View>
            </View>

          </View>

          {/* FOOTER BILL */} 
          <View style={{
            borderStyle: "solid",
            borderColor: "#000",
            borderWidth: 1,
            borderTopWidth: 0,
          }}>
            <Text style={{ fontSize: "13px", padding: "30px", textAlign: "center"}}>
              Documento equivalente a factura régimen simplificado según el Artículo 3 del Decreto 522 de 2003.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default DocumentPDF