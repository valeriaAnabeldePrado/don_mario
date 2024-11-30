"use client";
import { useEffect, useState } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log(searchParams);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");

    console.log(tokenFromUrl);

    if (tokenFromUrl) {
      const verifyToken = async () => {
        try {
          const response = await fetch(
            `https://app-reservas-express-mondodb-production.up.railway.app/auth/login/verify?token=${tokenFromUrl}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("no verificado");
          }

          const data = await response.json();
          console.log("Token ok", data);
          setIsTokenVerified(true);
        } catch (err) {
          console.error("no", err);
          setError("error");
        }
      };

      verifyToken();
    }
  }, [searchParams, router, setError]);

  if (error) {
    return (
      <div className="container-reserv relative">
        <div className="overlay-reserv"></div>
        <section
          className={`h-full w-full main-form absolute ${poppins.className}`}
        >
          <h1 className={`h1-reserv ${freckleFace.className}`}>
            Error de Verificación
          </h1>
          <p>{error}</p>
        </section>
      </div>
    );
  }

  if (!isTokenVerified && searchParams.get("token")) {
    return (
      <div className="container-reserv relative">
        <div className="overlay-reserv"></div>
        <section
          className={`h-full w-full main-form absolute ${poppins.className}`}
        >
          <h1 className={`h1-reserv ${freckleFace.className}`}>
            Verificando token
          </h1>
          <p>Por favor, espere mientras se verifica su token</p>
        </section>
      </div>
    );
  }

  return (
    <div className="container-reserv relative">
      <div className="overlay-reserv"></div>
      <section
        className={`h-full w-full  main-form absolute ${poppins.className}`}
      >
        <h1 className={`h1-reserv ${freckleFace.className}`}>Bienvenido!</h1>
        <div className="card-reserv">
          <FormReservation />
        </div>
      </section>
    </div>
  );
};

export default Welcome;
