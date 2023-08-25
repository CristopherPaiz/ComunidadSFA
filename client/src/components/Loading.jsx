import React from "react";
import { CircularProgress } from "@nextui-org/react";

const Loading = () => {
  return (
    <div className="grid place-items-center">
      <CircularProgress size="lg" aria-label="Cargando..." />
    </div>
  );
};

export default Loading;
