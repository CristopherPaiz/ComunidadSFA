import React from "react";
import Navibar from "../components/Navibar";
import Navbutton from "../components/Navbutton";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const Homepage = () => {
  const list = [
    {
      title: "Biblia",
      description: "Las Sagradas Escrituras para guía espiritual.",
      price: "Q100.00",
      img: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    },
    {
      title: "Collar de Cruz",
      description: "Un símbolo de fe y devoción.",
      price: "Q150.00",
      img: "https://ilariape.vtexassets.com/arquivos/ids/157717-800-auto?v=637696701218400000&width=800&height=auto&aspect=true",
    },
    {
      title: "Diario de Oración",
      description: "Registra tus pensamientos, oraciones y reflexiones.",
      price: "Q50.00",
      img: "https://pictures.abebooks.com/isbn/9781978215603-us.jpg",
    },
    {
      title: "CD de Música de Adoración",
      description: "Canciones inspiradoras para alabar y adorar.",
      price: "Q60.00",
      img: "https://i.ytimg.com/vi/BAIIYWPkzqs/maxresdefault.jpg",
    },
    {
      title: "Libro Devocional",
      description: "Lecturas diarias e ideas para el crecimiento espiritual.",
      price: "Q80.00",
      img: "https://m.media-amazon.com/images/I/41g7q-kUTAL.jpg",
    },
    {
      title: "Entradas para Evento Cristiano",
      description: "Admisión a un evento o conferencia cristiana especial.",
      price: "Q120.00",
      img: "https://e4g7x2b3.rocketcdn.me/wp-content/uploads/2022/10/evangelismo-en-formosa-819x1024.jpg",
    },
    {
      title: "Impresión de Arte con Cruz",
      description: "Hermosa obra de arte con la cruz como tema.",
      price: "Q90.00",
      img: "https://c8.alamy.com/compes/2pgj574/matthias-grunewald-cristo-en-la-cruz-dibujando-en-carbon-con-pluma-y-tinta-y-pincel-blanco-hacia-1520-2pgj574.jpg",
    },
    {
      title: "Camiseta Cristiana",
      description:
        "Inspiración que puedes llevar puesta con un mensaje cristiano.",
      price: "Q70.00",
      img: "https://ae01.alicdn.com/kf/H483c0d157e884b6cb236506f4433c141T.jpg_640x640Q90.jpg_.webp",
    },
    {
      title: "Calcomanía de Pared con Mensaje de Fe",
      description: "Decora tu espacio con un mensaje basado en la fe.",
      price: "Q40.00",
      img: "https://m.media-amazon.com/images/I/611+8S4+r0L.jpg",
    },
    {
      title: "Donación para Viaje de Misión",
      description: "Apoya el viaje de un misionero para difundir el evangelio.",
      price: "Donar",
      img: "https://images.squarespace-cdn.com/content/596f9e6edb29d6603ed3a7e3/1561136539292-PH1DAE0OVOQ7Y0EJ96ED/VA-mission-web2.jpg?content-type=image%2Fjpeg",
    },
  ];

  return (
    <>
      <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 px-5 py-5 sm:px-30 sm:py-10 sm:mx-30 p-3 sm:p-4 md:p-6 lg:p-8 xl:px-60 xl:py-10">
        {list.map((item, index) => (
          <Card shadow="sm" key={index} isPressable>
            <CardBody className="overflow-visible p-0">
              <Image
                isZoomed
                isBlurred
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[240px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
export default Homepage;
