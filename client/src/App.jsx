import React from "react";

import Login from "./views/Login";
import { Route, Routes } from "react-router-dom";
import Homepage from "./views/Homepage";
import NotFoundPage from "./views/NotFoundPage";
import Navibar from "./components/Navibar";
import Comunidad from "./views/Comunidad";

const App = () => {
  return (
    <div>
      <Navibar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/farmacia" element={<Login />} />
        <Route path="/Social" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
