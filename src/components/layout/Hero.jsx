import Image from "next/image";
import React from "react";
import RightArrow from "../icons/RightArrow";
import { useSession } from "next-auth/react";

const Hero = () => {
  return (
    <section className="hero mt-16">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Everything <br /> is better <br /> with a&nbsp;
          <span className="text-primary">Pizza!</span>
        </h1>
        <p className="text-gray-500 my-6 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life.
        </p>
        <div className="flex gap-4 text-sm">
          <button className="bg-primary px-4 py-2 rounded-full uppcase text-white flex gap-2 items-center justify-center">
            Order Now
            <RightArrow />
          </button>
          <button className="flex border-none gap-2 items-center py-2 font-semibold text-gray-700">
            Learn More
            <RightArrow />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/pizza.png"}
          layout="fill"
          objectFit="contain"
          alt="pizza"
        />
      </div>
    </section>
  );
};

export default Hero;
