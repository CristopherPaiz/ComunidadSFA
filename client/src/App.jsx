import React from "react";

import Login from "./views/Login";
import { Route, Routes } from "react-router-dom";
import Homepage from "./views/Homepage";
import NotFoundPage from "./views/NotFoundPage";
import Navibar from "./components/Navibar";
import Comunidad from "./views/Comunidad";
import Farmacia from "./views/Farmacia";
import Social from "./views/Social";
import Usuarios from "./views/Usuarios";
import AboutPage from "./views/AboutPage";
import Terms from "./views/Terms";

import EditarPersona from "./forms/VariosForms/EditarPersona";
import EditarRetiro from "./forms/VariosForms/EditarRetiro";
import EditarCurso from "./forms/VariosForms/EditarCurso";

import EditarMedicamento from "./forms/VariosForms/EditarMedicamento";

import R_VerReportes from "./forms/Comunidad/Reportes/R_VerReportes";

import ContextProvider from "./context/ContextProvider.jsx";
import EditarBeneficiario from "./forms/VariosForms/EditarBeneficiario";
import EditarComunidad from "./forms/VariosForms/EditarComunidad";
import RR_compraMedicamentos from "./forms/Comunidad/Reportes/Reports/RR_compraMedicamentos";
import RR_ventaMedicamentos from "./forms/Comunidad/Reportes/Reports/RR_ventaMedicamentos";

const App = () => {
  return (
    <ContextProvider>
      <Navibar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/comunidad/persona/:id" element={<EditarPersona />} />
        <Route path="/comunidad/retiro/:id" element={<EditarRetiro />} />
        <Route path="/comunidad/cursoCreci/:id" element={<EditarCurso />} />
        <Route path="/comunidad/comunidades/:id" element={<EditarComunidad />} />
        <Route path="/farmacia/medicamento/:id" element={<EditarMedicamento />} />
        <Route path="/social/beneficiario/:id" element={<EditarBeneficiario />} />
        <Route path="/farmacia" element={<Farmacia />} />
        <Route path="/Social" element={<Social />} />
        <Route path="/reports" element={<R_VerReportes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<Terms />} />
        {/* Reportería */}
        <Route path="/reports/farmacia/compras" element={<RR_compraMedicamentos />} />
        <Route path="/reports/farmacia/ventas" element={<RR_ventaMedicamentos />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ContextProvider>
  );
};

export default App;
