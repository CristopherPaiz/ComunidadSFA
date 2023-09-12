import React, { useState } from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../../../config.js";

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
    backgroundColor: "#dedcdc",
    fontWeight: "black",
  },
  text: { margin: 0 },
  en0: { width: "140px", height: "auto", maxHeight: "60px" },
  en1: { width: "70px", height: "auto", maxHeight: "60px" },
  en2: { width: "100px", height: "auto", maxHeight: "60px" },
  en3: { width: "60px", height: "auto", maxHeight: "60px" },
  en4: { width: "60px", height: "auto", maxHeight: "60px" },
  en5: { width: "130px", height: "auto", maxHeight: "60px" },
});

function DataToPDF({ data }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 20, marginBottom: 10, textAlign: "center" }}>
            Reporte Disponibilidad de Medicamentos
          </Text>
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, styles.en0]}>
                <Text>Producto</Text>
              </View>
              <View style={[styles.tableCol, styles.en1]}>
                <Text>Disponible</Text>
              </View>
              <View style={[styles.tableCol, styles.en2]}>
                <Text>Tipo</Text>
              </View>
              <View style={[styles.tableCol, styles.en3]}>
                <Text>Precio</Text>
              </View>
              <View style={[styles.tableCol, styles.en4]}>
                <Text>Antibiótico</Text>
              </View>
              <View style={[styles.tableCol, styles.en5]}>
                <Text>Descripción</Text>
              </View>
            </View>

            {/* Datos de la tabla */}
            {data.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCol, styles.en0]}>
                  <Text>{item.label}</Text>
                </View>
                <View style={[styles.tableCol, styles.en1]}>
                  <Text>{item.cantidadTotal}</Text>
                </View>
                <View style={[styles.tableCol, styles.en2]}>
                  <Text>{item.tipo}</Text>
                </View>
                <View style={[styles.tableCol, styles.en3]}>
                  <Text>Q. {item.precio}</Text>
                </View>
                <View style={[styles.tableCol, styles.en4]}>
                  <Text>{item.antibiotico ? "Sí" : ""}</Text>
                </View>
                <View style={[styles.tableCol, styles.en5]}>
                  <Text>{item.descripcion}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const RR_disponibilidadProductos = () => {
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);

  // filtrar por comunidad
  const handleBuscarMedicamentos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/medicamento/getalldisponibility`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error al filtrar los productos", {});
      }
      const data = await response.json();
      setResultados(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast.error("Error al filtrar los productos");
      setLoading(false);
      console.log(error);
    }
  };

  const isMobile = window.innerWidth <= 768;
  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-4 m-4 w-10/12 sm:w-6/12 mx-auto">
        <h1 className="font-bold text-2xl mx auto text-center">Inventario de Medicamentos</h1>
        <Button className="text-white" color="success" onClick={handleBuscarMedicamentos}>
          Generar reporte de inventario
        </Button>
      </div>
      {loading ? (
        <h1 className="font-bold text-center w-9/12 mx-auto">
          Presione "Generar" para ver la disponibilidad de los productos, de menor a mayor cantidad
        </h1>
      ) : (
        <div className="flex flex-col text-center align-middle justify-items-center justify-center">
          {isMobile ? (
            <div className="p-8">
              <h1 className="text-2xl font-bold text-danger">¡¡Parece que estás desde un dispositivo móvil!!</h1>
              <h2 className="font-bold">
                Por el momento el visor de documentos, solo está disponible en versión de escritorio
              </h2>
              <h3>Así que únicamente podrás descargar el archivo y verlo con alguna aplicación compatible.</h3>
              <br />
              <PDFDownloadLink document={<DataToPDF data={resultados} />} fileName="reporteMedicamentos.pdf">
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
            <PDFViewer width="90%" height="600" className="mx-auto">
              <DataToPDF data={resultados} />
            </PDFViewer>
          )}
        </div>
      )}
    </>
  );
};

export default RR_disponibilidadProductos;
