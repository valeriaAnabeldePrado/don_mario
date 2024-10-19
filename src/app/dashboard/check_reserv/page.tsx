"use client";
import { getData } from "mario/componnets/hooks/useFetch";
//import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type FormValues = {
  lastName: string;
  email: string;
};

const ChekReservation = () => {
  // const [responseOk, setResponseOk] = useState(false);
  // const [dataReserv, setDataReserv] = useState({});
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await getData("endPointGet", data);
      console.log("Datos recibidos:", response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      //setResponseOk(true);
      //setDataReserv("datos del fetch");
    }
  };

  return (
    <main>
      <h1>Consulta tu reserva</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Ingresa tu correo</label>
        <input type="email" {...register("email")} />
        <label>Ingresa tu apellido</label>
        <input type="lastName" {...register("lastName")} />
        <button type="submit">Consultar</button>
      </form>
      {/* {responseOk && (
        <ModalData {...datareserv}/>
      ) } */}
    </main>
  );
};

export default ChekReservation;
