import React from "react";

const CardExample = ({ img, title, txt, subtxt }) => {
  return (
    <div className="my-2 flex flex-row rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  sm:py-3 sm:px-10 px-2 sm:ml-4 border-1.5">
      <div className="w-4/12 h-auto flex align-middle justify-center sm:w-2/12">
        <img
          className="flex rounded-t-lg object-contain md:h-30 md:!rounded-none md:!rounded-l-lg"
          src={img}
          alt={title}
        />
      </div>
      <div className="flex flex-col justify-start p-6">
        <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">{title}</h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{txt}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-300">{subtxt}</p>
      </div>
    </div>
  );
};

export default CardExample;
