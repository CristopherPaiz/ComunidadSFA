import React from "react";

import Login from "./views/Login";
import { Route, Routes } from "react-router-dom";
import Homepage from "./views/Homepage";
import NotFoundPage from "./views/NotFoundPage";
import Navibar from "./components/Navibar";
import Comunidad from "./views/Comunidad";
import Farmacia from "./views/Farmacia";
import Social from "./views/Social";

const App = () => {
  return (
    <div>
      <Navibar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/farmacia" element={<Farmacia />} />
        <Route path="/Social" element={<Social />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
