import React from "react";
import { Button } from "@nextui-org/react";

const App = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hello World!</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">En orden todo, esto es con ClassName</p>
        <Button color="primary">Este botón es con NextUI components</Button>
      </a>
    </div>
  );
};

export default App;
