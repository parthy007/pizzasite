import Image from "next/image";
import React from "react";
import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeader";

const HomeMenu = () => {
  return (
    <section className="mt-16">
      <div className="absolute left-0 -z-10">
        <Image src="/sallad1.png" width={109} height={189} alt="salad1" />
      </div>
      <div className="absolute right-0 -z-10">
        <Image src="/sallad2.png" width={107} height={195} alt="salad1" />
      </div>
      <div className="text-center mb-4">
        <SectionHeader subHeader={"check out"} mainHeader={"Menu"} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
};

export default HomeMenu;
