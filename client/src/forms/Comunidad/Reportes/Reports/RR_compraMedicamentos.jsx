import React, { useState, useEffect } from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@nextui-org/react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: "30px",
  },
  section: {
    flexGrow: 1,
  },
  table: {
    display: "table",
    borderStyle: "solid",
    borderWidth: 1,
  },
  tableRow: { flexDirection: "row" },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: "center",
    fontSize: "11px",
    padding: "2px",
    height: "auto",
    justifyContent: "center",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  text: { margin: 0 },
  en1: { width: "75px", height: "auto", maxHeight: "60px" },
  en2: { width: "80px", height: "auto", maxHeight: "60px" },
  en3: { width: "90px", height: "auto", maxHeight: "60px" },
  en4: { width: "80px", height: "auto", maxHeight: "60px" },
  en5: { width: "90px", height: "auto", maxHeight: "60px" },
  en6: { width: "135px", height: "auto", maxHeight: "60px" },
});

function DataToPDF({ data }) {
  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 20, marginBottom: 10, textAlign: "center" }}>Reporte compra de Medicamentos</Text>
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, styles.en1]}>
                <Text>Cantidad</Text>
              </View>
              <View style={[styles.tableCol, styles.en2]}>
                <Text>Fecha</Text>
              </View>
              <View style={[styles.tableCol, styles.en3]}>
                <Text>Precio Compra</Text>
              </View>
              <View style={[styles.tableCol, styles.en4]}>
                <Text>Precio Venta</Text>
              </View>
              <View style={[styles.tableCol, styles.en5]}>
                <Text>Proveedor</Text>
              </View>
              <View style={[styles.tableCol, styles.en6]}>
                <Text>Observaciones</Text>
              </View>
            </View>

            {/* Datos de la tabla */}
            {data.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCol, styles.en1]}>
                  <Text>{item.cantidad} uds.</Text>
                </View>
                <View style={[styles.tableCol, styles.en2]}>
                  <Text>{formatfecha(item.fecha)}</Text>
                </View>
                <View style={[styles.tableCol, styles.en3]}>
                  <Text>Q. {item.precioCompra}</Text>
                </View>
                <View style={[styles.tableCol, styles.en4]}>
                  <Text>Q. {item.precioVenta}</Text>
                </View>
                <View style={[styles.tableCol, styles.en5]}>
                  <Text>{item.proveedor}</Text>
                </View>
                <View style={[styles.tableCol, styles.en6]}>
                  <Text>{item.observaciones}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

function RR_compraMedicamentos() {
  const [loading, setLoading] = useState(false);

  //cargar los datos de las compras de medicamentos
  useEffect(() => {}, []);

  const data = [
    {
      idmedicamento: "64e648dd3462af19ec454a5b",
      cantidad: "1005",
      fecha: "2023-08-01T00:00:00.000Z",
      precioCompra: "11",
      precioVenta: "12",
      proveedor: "Bayer",
      observaciones: "El proveedor nos vendió los medicamentos a un precio más alto de lo acordado porque está pendejo",
    },
    {
      idmedicamento: "64e648dd3462af19ec454a5c",
      cantidad: "10",
      fecha: "2023-08-02T00:00:00.000Z",
      precioCompra: "8",
      precioVenta: "9",
      proveedor: "Pfizer",
      observaciones: "Compra regular de medicamentos de Pfizer",
    },
  ];
  const isMobile = window.innerWidth <= 768;
  return (
    <div className="h-screen flex flex-col text-center align-middle justify-items-center justify-center">
      {isMobile ? ( // Mostrar botón de descarga solo en dispositivos móviles
        <div className="p-8 -mt-32">
          <h1 className="text-2xl font-bold text-danger">¡¡Parece que estás desde un dispositivo móvil!!</h1>
          <h2 className="font-bold">
            Por el momento el visor de documentos, solo está disponible en versión de escritorio
          </h2>
          <h3>Así que únicamente podrás descargar el archivo y verlo con alguna aplicación compatible.</h3>
          <br />
          <PDFDownloadLink document={<DataToPDF data={data} />} fileName="reporteCompraMedicamentos.pdf">
            {({ blob, url, loading, error }) =>
              loading ? (
                <h1>Cargando documento...</h1>
              ) : (
                <Button className="text-white" color="success">
                  Descargar PDF
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>
      ) : (
        // Mostrar visor de PDF en escritorio
        <PDFViewer width="100%" height="600">
          <DataToPDF data={data} />
        </PDFViewer>
      )}
    </div>
  );
}

export default RR_compraMedicamentos;
