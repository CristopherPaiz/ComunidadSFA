import React, { useState, useEffect, useContext } from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../../../config.js";
import { contexto } from "../../../../context/ContextProvider.jsx";
import Select from "react-select";

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
  image: {
    height: "40px",
    width: "40px",
    objectFit: "contain",
    margin: 1,
  },
  text: { margin: 0 },
  en0: { width: "140px", height: "auto", maxHeight: "60px" },
  en1: { width: "140px", height: "auto", maxHeight: "60px" },
  en2: { width: "500px", height: "auto", maxHeight: "60px" },
});

function DataToPDF({ data, value }) {
  const formatfecha = (fechaRecibo) => {
    const date = new Date(fechaRecibo);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };
  return (
    <Document>
      <Page size="LETTER" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 20, marginBottom: 10, textAlign: "center" }}>
            Reporte gastos de: {value?.nombre}
          </Text>
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, styles.en0]}>
                <Text>Fecha</Text>
              </View>
              <View style={[styles.tableCol, styles.en1]}>
                <Text>Monto</Text>
              </View>
              <View style={[styles.tableCol, styles.en2]}>
                <Text>Observaciones</Text>
              </View>
            </View>

            {/* Datos de la tabla */}
            {data.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCol, styles.en0]}>
                  <Text>{formatfecha(item.fecha)}</Text>
                </View>
                <View style={[styles.tableCol, styles.en1]}>
                  <Text>Q. {item.monto}</Text>
                </View>
                <View style={[styles.tableCol, styles.en2]}>
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

const RB_gastos = () => {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [resultados, setResultados] = useState([]);

  //cargar lista de beneficiarios
  const [resultadosBeneficiarios, setResultadosBeneficiarios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const { theme } = useContext(contexto);

  const obtenerBeneficiarios = async () => {
    setLoading2(true);

    try {
      const response = await fetch(`${API_URL}/BeneficiarioSocial/getallname`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error al obtener los beneficiarios");
        throw new Error("Error al filtrar los beneficiarios", {});
      }

      const data = await response.json();
      setResultadosBeneficiarios(data);
      setLoading2(false);
    } catch (error) {
      setLoading2(false);
    }
  };

  useEffect(() => {
    obtenerBeneficiarios();
  }, []);

  // filtrar por comunidad
  const handleBuscarPorComunidad = async () => {
    if (seleccionado === null) {
      toast.error("Debe seleccionar un beneficiario", {});
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/egresoSaldo/${seleccionado._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error al filtrar los gastos del beneficiario", {});
      }
      const data = await response.json();
      setResultados(data.egresos);
      setLoading(false);
    } catch (error) {
      toast.error("Error al filtrar los gastos del benefiaciario");
      setLoading(false);
      console.log(error);
    }
  };

  const isMobile = window.innerWidth <= 768;
  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-4 m-4 w-10/12 sm:w-6/12 mx-auto">
        <h1 className="font-bold text-2xl mx auto text-center">Reporte de gastos por benefiaciario</h1>
        {loading2 ? (
          <h2 className="mx-auto font-extrabold text-xl text-teal-500">Cargando beneficiarios...</h2>
        ) : (
          <Select
            classNamePrefix="Seleccione un beneficiario"
            isSearchable
            isClearable
            options={resultadosBeneficiarios}
            maxMenuHeight={170}
            value={seleccionado}
            className="text-black dark:text-white mb-8"
            styles={{
              option: (base) => ({
                ...base,
                backgroundColor: theme === "light" ? "white" : "#0e0e0e",
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 13,
              colors: {
                ...theme.colors.neutral90,
              },
            })}
            noOptionsMessage={() => "¡¡No se encontró al beneficiario!!"}
            placeholder="Seleccione un beneficiario"
            onChange={(e) => setSeleccionado(e)}
            onFocus={() => setSeleccionado(null)}
          />
        )}
        <Button className="text-white" color="success" onClick={handleBuscarPorComunidad}>
          Generar reporte
        </Button>
      </div>
      {loading ? (
        <h1 className="font-bold text-center w-9/12 mx-auto"></h1>
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
              <PDFDownloadLink
                document={<DataToPDF data={resultados} value={seleccionado} />}
                fileName="reporteBenefiarioGasto.pdf"
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
              <DataToPDF data={resultados} value={seleccionado} />
            </PDFViewer>
          )}
        </div>
      )}
    </>
  );
};

export default RB_gastos;
