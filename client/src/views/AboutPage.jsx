import React from "react";
import comunidad from "/comunidad.svg";

const AboutPage = () => {
  return (
    <>
      <div className="flex flex-col items-center flex-wrap">
        <img src={comunidad} alt="Logo Comunidad San Francisco de Asís" className="h-3/6 w-3/6 sm:h-1/6 sm:w-1/6" />
        <h1 className="text-2xl font-extrabold text-center p-6">Comunidad San Francisco de Asís, Quetzaltenango</h1>
        <div className="w-8/12 sm:w-6/12 mb-8">
          <h2 className="text-xl font-bold mt-8">Misión</h2>
          <h3>
            Compartir el mensaje del Evangelio a través de la evangelización y la enseñanza de la fe católica, brindando
            un espacio para la oración, el crecimiento espiritual y el servicio a los más necesitados.
          </h3>
          <h2 className="text-xl font-bold mt-8">Visión</h2>
          <h3>
            Ser una comunidad católica fraterna y solidaria que inspire a vivir el amor y la misericordia de Dios en el
            mundo, fortaleciendo la fe y creando un espacio de encuentro espiritual.
          </h3>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
