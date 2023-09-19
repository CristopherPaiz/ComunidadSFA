import React, { useState, useEffect, useContext } from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import API_URL from "../../../../config.js";
import { contexto } from "../../../../context/ContextProvider.jsx";
import Select from "react-select";
import Loading from "../../../../components/Loading.jsx";

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
  en0: { width: "180px", height: "auto", maxHeight: "60px" },
  en1: { width: "100px", height: "auto", maxHeight: "60px" },
  en2: { width: "200px", height: "auto", maxHeight: "60px" },
  en3: { width: "100px", height: "auto", maxHeight: "60px" },
  en4: { width: "150px", height: "auto", maxHeight: "60px" },
});

function DataToPDF({ data, value }) {
  return (
    <Document>
      <Page size="LETTER" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontSize: 20, marginBottom: 10, textAlign: "center" }}>
            Reporte de personas de: {value?.label}
          </Text>
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={[styles.tableCol, styles.en0]}>
                <Text>Nombre</Text>
              </View>
              <View style={[styles.tableCol, styles.en1]}>
                <Text>Teléfono</Text>
              </View>
              <View style={[styles.tableCol, styles.en2]}>
                <Text>Comunidad</Text>
              </View>
              <View style={[styles.tableCol, styles.en3]}>
                <Text>Tipo</Text>
              </View>
              <View style={[styles.tableCol, styles.en4]}>
                <Text>Cuotas</Text>
              </View>
            </View>

            {/* Datos de la tabla */}
            {data.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={[styles.tableCol, styles.en0]}>
                  <Text>{item.nombre}</Text>
                </View>
                <View style={[styles.tableCol, styles.en1]}>
                  <Text>{item.telefono}</Text>
                </View>
                <View style={[styles.tableCol, styles.en2]}>
                  <Text>{item.idcomunidad.nombreComunidad}</Text>
                </View>
                <View style={[styles.tableCol, styles.en3]}>
                  <Text>{item.tipo}</Text>
                </View>
                <View style={[styles.tableCol, styles.en4]}>
                  <Text>
                    {item?.retiros[0].cuota[0] > 0 ? item?.retiros[0]?.cuota.map((numero) => `Q${numero} `) : "---"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const RC1_personaPorRetiro = () => {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(false);
  const [resultados, setResultados] = useState([]);

  //cargar lista de beneficiarios
  const [resultadosBeneficiarios, setResultadosBeneficiarios] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const { theme } = useContext(contexto);

  const obtenerBeneficiarios = async () => {
    setLoading2(true);

    try {
      const response = await fetch(`${API_URL}/retiro/getallnamelabel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        console.log("Error al obtener los datos");
        throw new Error("Error al filtrar los datos", {});
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
      toast.error("Debe seleccionar un retiro", {});
      return;
    }
    setLoading(true);
    setLoading3(true);
    try {
      const response = await fetch(`${API_URL}/persona/getrbyretiroComunidad`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idretiro: seleccionado._id }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error al filtrar las personas por retiro", {});
      }
      const data = await response.json();
      setResultados(data);
      setLoading(false);
      setLoading3(false);
    } catch (error) {
      toast.error("Error al filtrar las personas por retiro");
      setLoading(false);
      setLoading3(false);
      console.log(error);
    }
  };

  const isMobile = window.innerWidth <= 768;
  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-4 m-4 w-10/12 sm:w-6/12 mx-auto">
        <h1 className="font-bold text-2xl mx auto text-center">Reporte de Personas por Retiro</h1>
        {loading2 ? (
          <h2 className="mx-auto font-extrabold text-xl text-teal-500">Cargando retiros...</h2>
        ) : (
          <Select
            classNamePrefix="Seleccione un retiro"
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
            noOptionsMessage={() => "¡¡No se encontró el retiro!!"}
            placeholder="Seleccione un retiro"
            onChange={(e) => setSeleccionado(e)}
            onFocus={() => {
              setSeleccionado(null);
              setLoading(true);
            }}
          />
        )}
        <Button className="text-white" color="success" onClick={handleBuscarPorComunidad}>
          Generar reporte
        </Button>
      </div>
      {loading ? (
        loading3 ? (
          <Loading />
        ) : null
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
                fileName="reportePersonaPorRetiro.pdf"
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

export default RC1_personaPorRetiro;
