import React from "react";

const SectionHeader = ({ mainHeader, subHeader }) => {
  return (
    <>
      <h3 className="font-bold text-gray-500 uppercase leading-4">
        {subHeader}
      </h3>
      <h2 className="text-4xl text-primary italic font-bold">{mainHeader}</h2>
    </>
  );
};

export default SectionHeader;
