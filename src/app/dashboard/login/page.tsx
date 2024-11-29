import React from "react";
import { Abril_Fatface, Poppins } from "next/font/google";
import "../reservation/reserv.css";
import FormLogIn from "@/componnets/formLogIn";

const freckleFace = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: "200",
});
const LogInpage = () => {
  return (
    <div className="container-reserv relative">
      <div className="overlay-reserv"></div>
      <section
        className={`h-full w-full  main-form absolute ${poppins.className}`}
      >
        <h1 className={`h1-reserv ${freckleFace.className}`}>Inicia sesión</h1>
        <div className="card-reserv">
          <FormLogIn />
        </div>
      </section>
    </div>
  );
};

export default LogInpage;
