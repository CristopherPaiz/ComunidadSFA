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

import EditarPersona from "./forms/VariosForms/EditarPersona";
import EditarRetiro from "./forms/VariosForms/EditarRetiro";
import EditarCurso from "./forms/VariosForms/EditarCurso";

import EditarMedicamento from "./forms/VariosForms/EditarMedicamento";

import ContextProvider from "./context/ContextProvider.jsx";
import EditarBeneficiario from "./forms/VariosForms/EditarBeneficiario";
import EditarComunidad from "./forms/VariosForms/EditarComunidad";

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
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ContextProvider>
  );
};

export default App;
