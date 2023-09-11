import React from "react";
import comunidad from "/comunidad.svg";

const Terms = () => {
  return (
    <div className="flex flex-col items-center flex-wrap">
      <img src={comunidad} alt="Logo Comunidad San Francisco de Asís" className="h-3/6 w-3/6 sm:h-1/6 sm:w-1/6" />
      <h1 className="text-2xl font-extrabold text-center p-6">Comunidad San Francisco de Asís, Quetzaltenango</h1>
      <div className="w-9/12 sm:w-6/12 mb-8">
        <h2 className="text-xl font-bold mt-2">Términos y condiciones</h2>
        <p>
          Por favor, lea detenidamente los siguientes incisos antes de utilizar este software. Al utilizar este
          software, usted acepta los términos y condiciones que se establecen a continuación.
        </p>
        <p className="mt-3">
          1. Uso del Software: Este software ha sido desarrollado con el propósito de facilitar la gestión de ciertas
          actividades de la Comunidad San Francisco de Asís, Quetzaltenango. Los módulos principales incluyen:
          Comunidad: Para el registro de personas, comunidades y actividades. Farmacia: Para la gestión de inventario y
          distribución de medicamentos. Social: Para la administración de donaciones y apadrinamiento de personas
          necesitadas.
        </p>
        <p className="mt-3">
          2. Responsabilidad Limitada: El uso de este software es responsabilidad exclusiva de la institución. El
          desarrollador del software no se hace responsable de ninguna pérdida de datos, mal uso, errores o
          consecuencias derivadas del uso o manejo del software.
        </p>
        <p className="mt-3">
          3. Uso Comercial: El módulo de "Farmacia" ha sido diseñado para la gestión de inventario y distribución de
          medicamentos. Sin embargo, el desarrollador del software no se hace responsable de las decisiones de venta de
          medicamentos a terceros. La responsabilidad de la venta de medicamentos recae enteramente en la institución.
        </p>
        <p className="mt-3">
          4. Datos del Usuario: El desarrollador del software no tiene acceso, ni utilizará la información que la
          institución ingrese en el software. Todos los datos almacenados en el software son propiedad exclusiva de la
          institución, y el desarrollador no tiene ningún derecho sobre ellos.
        </p>
        <p className="mt-3">
          5. Pérdida de Datos: A pesar de los esfuerzos por garantizar la fiabilidad del software, no se puede
          garantizar la prevención absoluta de la pérdida de datos en caso de fallos o errores del software. Se
          recomienda realizar copias de seguridad periódicas de los datos almacenados.
        </p>
        <p className="mt-3">
          6. Modificaciones y Actualizaciones: El desarrollador del software se reserva el derecho de realizar
          modificaciones y actualizaciones en el software para mejorar su funcionalidad. Sin embargo, no se garantiza la
          compatibilidad con versiones anteriores ni la disponibilidad continua del software.
        </p>
        <p className="mt-3">
          7. Aceptación de Términos: Al utilizar este software, la institución acepta todos los términos y condiciones
          establecidos en este descargo de responsabilidad.
        </p>
      </div>
    </div>
  );
};

export default Terms;
