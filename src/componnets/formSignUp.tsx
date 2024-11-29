"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./form.css";
import { postData } from "./hooks/useFetch";

export type InputsAuth = {
  userName: string;
  email: string;
};

const FormSignUp = () => {
  const [responseOk, setResponseOk] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InputsAuth>();

  const onSubmit: SubmitHandler<InputsAuth> = async (formData) => {
    const fetchPostDataForm = async () => {
      try {
        const respuesta = await postData(
          "https://app-reservas-express-mondodb-production.up.railway.app/auth/register",
          formData
        );
        console.log(respuesta);
      } catch (error) {
        console.error("Error fetching ", error);
      }
    };
    fetchPostDataForm();
    setResponseOk(true);
    reset();
  };

  const userName = watch("userName");
  const email = watch("email");

  useEffect(() => {
    setFormData({
      userName: userName || "",
      email: email,
    });
  }, [userName, email]);
  return (
    <>
      <form
        className="flex flex-col form-main"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Nombre</label>
        <input {...register("userName", { required: true })} />
        {errors.userName && <span>Debes ingresar un nombre</span>}
        <label>Correo</label>
        <input {...register("email", { required: true })} />
        {errors.email && <span>Debes ingresar un correo</span>}

        <button
          type="submit"
          className="text-center self-center btn-form franja margenbt"
        >
          enviar
        </button>
      </form>
      {responseOk && (
        <h2 className="text-center">
          Muchas gracias por registrarse, {formData.userName} revise su mail
          para confirmar!
        </h2>
      )}
    </>
  );
};

export default FormSignUp;
