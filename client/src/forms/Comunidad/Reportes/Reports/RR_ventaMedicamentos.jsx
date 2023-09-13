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
  en0: { width: "150px", height: "auto", maxHeight: "60px" },
  en1: { width: "150px", height: "auto", maxHeight: "60px" },
  en2: { width: "150px", height: "auto", maxHeight: "60px" },
  en3: { width: "150px", height: "auto", maxHeight: "60px" },
  en9: { width: "150px", height: "auto", maxHeight: "60px", border: 0, fontWeight: "1000" },
});

function DataToPDF({ data }) {
  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  // Calcular la suma total de precioCompra y precioVenta
  const sumaTotalPrecioVenta = data.reduce((total, item) => total + item.precioVenta, 0);
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 20, marginBottom: 10, textAlign: "center" }}>
            Reporte venta de Medicamentos
          </Text>
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, styles.en0]}>
                <Text>Producto</Text>
              </View>
              <View style={[styles.tableCol, styles.en1]}>
                <Text>Cantidad</Text>
              </View>
              <View style={[styles.tableCol, styles.en2]}>
                <Text>Fecha</Text>
              </View>
              <View style={[styles.tableCol, styles.en3]}>
                <Text>Precio Venta</Text>
              </View>
            </View>

            {/* Datos de la tabla */}
            {data.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCol, styles.en0]}>
                  <Text>{item.idmedicamento.label}</Text>
                </View>
                <View style={[styles.tableCol, styles.en1]}>
                  <Text>{item.cantidad}</Text>
                </View>
                <View style={[styles.tableCol, styles.en2]}>
                  <Text>{formatfecha(item.fecha)}</Text>
                </View>
                <View style={[styles.tableCol, styles.en3]}>
                  <Text>Q. {item.precioVenta}</Text>
                </View>
              </View>
            ))}
            <View
              style={(styles.tableRow, { backgroundColor: "#dedcdc", display: "flex", flexDirection: "row" })}
            >
              <View style={[styles.tableCol, styles.en9]}>
                <Text>Total de ventas</Text>
              </View>
              <View style={[styles.en1]}>
                <Text></Text>
              </View>
              <View style={[styles.en2]}>
                <Text></Text>
              </View>
              <View style={[styles.tableCol, styles.en3]}>
                <Text>Q. {sumaTotalPrecioVenta}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

function RR_ventaMedicamentos() {
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  // filtrar por comunidad
  const handleBuscarPorVentas = async () => {
    if (fechaInicio === "" || fechaFinal === "") return toast.error("Ambas fechas son requeridas");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/EgresoMedicamento/getbyrange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fechaInicio: fechaInicio,
          fechaFinal: fechaFinal,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error al filtrar las compras", {});
      }
      const data = await response.json();
      setResultados(data.egresoMedicamentos);
      setLoading(false);
    } catch (error) {
      toast.error("Error al filtrar las compras");
      setLoading(false);
      console.log(error);
    }
  };

  const isMobile = window.innerWidth <= 768;
  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-4 m-4 w-10/12 sm:w-6/12 mx-auto">
        <h1 className="font-bold text-2xl mx auto text-center">Reporte de Ventas de Medicamentos</h1>
        <div className="flex flex-row gap-4">
          <Input
            type="date"
            label="Fecha inicial"
            placeholder="Ingrese una fecha inicial"
            isRequired
            onChange={(e) =>
              setFechaInicio(
                new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                  .toISOString()
                  .split("T")[0]
              )
            }
          />
          <Input
            type="date"
            label="Fecha Final"
            placeholder="Ingrese una fecha final"
            isRequired
            onChange={(e) =>
              setFechaFinal(
                new Date(e.target.valueAsNumber - (e.target.valueAsNumber % 86400000) + 86400000)
                  .toISOString()
                  .split("T")[0]
              )
            }
          />
        </div>
        <Button className="text-white" color="success" onClick={handleBuscarPorVentas}>
          Generar reporte
        </Button>
      </div>
      {loading ? (
        <h1 className="font-bold text-center w-9/12 mx-auto">Seleccione un rango de fechas para generar</h1>
      ) : (
        <div className="flex flex-col text-center align-middle justify-items-center justify-center">
          {isMobile ? (
            <div className="p-8">
              <h1 className="text-2xl font-bold text-danger">
                ¡¡Parece que estás desde un dispositivo móvil!!
              </h1>
              <h2 className="font-bold">
                Por el momento el visor de documentos, solo está disponible en versión de escritorio
              </h2>
              <h3>
                Así que únicamente podrás descargar el archivo y verlo con alguna aplicación compatible.
              </h3>
              <br />
              <PDFDownloadLink
                document={<DataToPDF data={resultados} />}
                fileName="reporteVentaMedicamentos.pdf"
              >
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
}

export default RR_ventaMedicamentos;
