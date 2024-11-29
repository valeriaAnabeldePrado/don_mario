"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import "./form.css";
import { postData } from "./hooks/useFetch";

export type InputsAuthLogin = {
  userName: string;
};

const FormLogIn = () => {
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
          "http://localhost:1234/auth/login",
          formData
        );
        console.log(respuesta);
      } catch (error) {
        console.error("Error fetching ", error);
      }
    };
    fetchPostDataForm();

    reset();
  };

  return (
    <>
      <form
        className="flex flex-col form-main"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Nombre</label>
        <input {...register("userName", { required: true })} />
        {errors.userName && <span>Debes ingresar un nombre</span>}

        <button
          type="submit"
          className="text-center self-center btn-form franja margenbt"
        >
          Ingresar
        </button>
      </form>
    </>
  );
};

export default FormLogIn;
