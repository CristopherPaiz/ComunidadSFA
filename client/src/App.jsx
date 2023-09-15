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
import RR_disponibilidadProductos from "./forms/Comunidad/Reportes/Reports/RR_disponibilidadProductos";
import RB_Beneficiarios from "./forms/Comunidad/Reportes/Reports/RB_Beneficiarios";
import RB_gastos from "./forms/Comunidad/Reportes/Reports/RB_gastos";
import RB_saldosafavor from "./forms/Comunidad/Reportes/Reports/RB_saldosafavor";
import RC1_personaPorRetiro from "./forms/Comunidad/Reportes/Reports/RC1_personaPorRetiro";
import RC2_personasPorCurso from "./forms/Comunidad/Reportes/Reports/RC2_personasPorCurso";
import RC3_personasPorComunidad from "./forms/Comunidad/Reportes/Reports/RC3_personasPorComunidad";
import RC4_personaActividades from "./forms/Comunidad/Reportes/Reports/RC4_personaActividades";
import RC5_actividades from "./forms/Comunidad/Reportes/Reports/RC5_actividades";
import Reportes from "./views/Reportes";

const App = () => {
  const reportRoutes = [
    {
      path: "/reports",
      component: <R_VerReportes />,
    },
    {
      path: "/reports/comunidad/personaretiro",
      component: <RC1_personaPorRetiro />,
    },
    {
      path: "/reports/comunidad/personacurso",
      component: <RC2_personasPorCurso />,
    },
    {
      path: "/reports/comunidad/personacomunidad",
      component: <RC3_personasPorComunidad />,
    },
    {
      path: "/reports/comunidad/personaactividad",
      component: <RC4_personaActividades />,
    },
    {
      path: "/reports/comunidad/actividades",
      component: <RC5_actividades />,
    },
    {
      path: "/reports/farmacia/medicamentos",
      component: <RR_disponibilidadProductos />,
    },
    {
      path: "/reports/farmacia/compras",
      component: <RR_compraMedicamentos />,
    },
    {
      path: "/reports/farmacia/ventas",
      component: <RR_ventaMedicamentos />,
    },
    {
      path: "/reports/social/beneficiarios",
      component: <RB_Beneficiarios />,
    },
    {
      path: "/reports/social/gastos",
      component: <RB_gastos />,
    },
    {
      path: "/reports/social/saldosafavor",
      component: <RB_saldosafavor />,
    },
  ];

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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<Terms />} />

        {/*REPORTES  */}
        {reportRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<Reportes>{route.component}</Reportes>} />
        ))}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ContextProvider>
  );
};

export default App;
