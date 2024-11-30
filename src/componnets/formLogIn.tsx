"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./form.css";
import { postData } from "./hooks/useFetch";
import Link from "next/link";

export type InputsAuthLogin = {
  userName: string;
};

const FormLogIn = () => {
  const [response, setresponse] = useState(false);
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm<InputsAuthLogin>();

  const onSubmit: SubmitHandler<InputsAuthLogin> = async (formData) => {
    console.log(formData);

    const fetchPostDataForm = async () => {
      try {
        const respuesta = await postData(
          "https://app-reservas-express-mondodb-production.up.railway.app/auth/login",
          formData
        );
        console.log(respuesta);
      } catch (error) {
        console.error("Error fetching ", error);
      }
    };
    fetchPostDataForm();

    reset();
    setresponse(true);
  };

  return (
    <div className="flex flex-col form-main justify-between items-center">
      <form
        className="flex flex-col form-main"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Nombre de usuario </label>
        <input {...register("userName", { required: true })} />
        {errors.userName && <span>Debes ingresar un nombre</span>}

        <button
          type="submit"
          className="text-center self-center btn-form franja margenbt"
        >
          Ingresar
        </button>
      </form>
      <h2 className={response ? `text-login` : `text-login opacidad-ok`}>
        Direccion enviada! ingresa a tu mail para continuar con la reserva
      </h2>
      <h2 className="margen-top-auth">
        <Link href={"/dashboard/auth"}>No tenes usuario? registrate</Link>
      </h2>
    </div>
  );
};

export default FormLogIn;
