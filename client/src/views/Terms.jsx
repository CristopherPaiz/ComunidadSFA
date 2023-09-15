import React from "react";
import comunidad from "/comunidad.svg";

const Terms = () => {
  return (
    <div className="flex flex-col items-center flex-wrap">
      <img
        src={comunidad}
        alt="Logo Comunidad San Francisco de Asís"
        className="h-3/6 w-3/6 sm:h-1/6 sm:w-1/6"
      />
      <h1 className="text-2xl font-extrabold text-center p-6">
        Comunidad San Francisco de Asís, Quetzaltenango
      </h1>
      <div className="w-9/12 sm:w-6/12 mb-8">
        <h2 className="text-xl font-bold mt-2">Términos y condiciones</h2>
        <p>
          Por favor, lea atentamente las siguientes disposiciones antes de emplear este software. Al utilizar
          esta aplicación, usted reconoce y acepta los términos y condiciones que se detallan a continuación.
        </p>
        <p className="mt-3">
          1. Propósito del Software: Este software ha sido diseñado con el propósito de facilitar la
          administración de diversas actividades en la Comunidad San Francisco de Asís, Quetzaltenango. Sus
          módulos principales abarcan las siguientes áreas: Comunidad, que permite el registro de individuos,
          comunidades y actividades; Farmacia, que se utiliza para gestionar el inventario y la distribución
          de medicamentos; y Social, para la administración de donaciones y el apadrinamiento de personas
          necesitadas.
        </p>
        <p className="mt-3">
          2. Privacidad de los Datos del Usuario: El desarrollador del software no tiene ningún acceso a la
          información ingresada por la institución, lo que significa que no puede utilizar de ninguna manera
          los datos proporcionados en el software. Es importante destacar que todos los datos almacenados en
          el software son propiedad exclusiva de la institución y el desarrollador no tiene ningún derecho
          sobre ellos.
        </p>
        <p className="mt-3">
          3. Responsabilidad Limitada: El uso de este software recae exclusivamente en la responsabilidad de
          la institución. El desarrollador del software no asume ningún tipo de responsabilidad por posibles
          pérdidas de datos, mal uso, errores o consecuencias derivadas del uso o manejo del software.
        </p>
        <p className="mt-3">
          4. Uso con Fines Comerciales: El módulo "Farmacia" ha sido diseñado para facilitar la gestión del
          inventario y la distribución de medicamentos. Sin embargo, es importante tener en cuenta que el
          desarrollador del software no está involucrado en cuestiones legales relacionadas con la venta de
          medicamentos, como la exigencia de recetas médicas avaladas por un profesional de la salud o la
          recopilación de información del comprador. La institución es la encargada de cumplir con las
          regulaciones legales vigentes en el país en lo que respecta a la venta de medicamentos.
        </p>
        <p className="mt-3">
          5. Pérdida de Datos: A pesar de los esfuerzos destinados a garantizar la confiabilidad del software,
          no se puede asegurar de manera absoluta la prevención de la pérdida de datos en caso de fallos o
          errores del sistema. En consecuencia, se recomienda realizar copias de seguridad periódicas de los
          datos almacenados.
        </p>
        <p className="mt-3">
          6. Modificaciones y Actualizaciones: El desarrollador del software se reserva el derecho de efectuar
          modificaciones y actualizaciones en el programa con el fin de mejorar su funcionamiento. Sin
          embargo, no se garantiza la compatibilidad con versiones previas ni la disponibilidad ininterrumpida
          del software.
        </p>
        <p className="mt-3">
          7. Aceptación de Términos: Mediante la utilización de este software, la institución manifiesta su
          aceptación de todos los términos y condiciones establecidos en este comunicado de responsabilidad.
        </p>
      </div>
    </div>
  );
};

export default Terms;
