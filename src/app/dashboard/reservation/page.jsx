import React from "react";

import { Abril_Fatface, Poppins } from "next/font/google";
import "./reserv.css";
import FormReservation from "@/componnets/form";

const freckleFace = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: "200",
});
const Welcome = () => {
  return (
    <div className="container-reserv relative">
      <div className="overlay-reserv"></div>
      <section
        className={`h-full w-full  main-form absolute ${poppins.className}`}
      >
        <h1 className={`h1-reserv ${freckleFace.className}`}>
          Bienvenido! el nombre
        </h1>
        <div className="card-reserv">
          <FormReservation />
        </div>
      </section>
    </div>
  );
};

export default Welcome;
