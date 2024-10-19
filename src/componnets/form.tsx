"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
//import { postData } from "./hooks/useFetch";

export type Inputs = {
  name: string;
  lastname: string;
  email: string;
  selectedNumber: number;
  selectedFranja: string;
  date: string;
  time: string;
  hora: string;
};

const people = [1, 2, 3, 4, 5, 6];
const franja = ["almuerzo", "cena"];

const dinnerH = ["21:00", "23:00"];
const luncH = ["12:00", "14:00"];

const FormReservation = () => {
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [visibleHora, setVisibleHora] = useState(false);
  const [confirmOk, setConfirmOk] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    selectedNumber: 0,
    selectedFranja: "",
    date: "",
    time: "",
    hora: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    //const respuesta = await postData("endopoint", data);
  };

  const handleTablePeople = (value: number) => {
    setValue("selectedNumber", value);
  };
  const handleFraja = (value: string) => {
    setValue("selectedFranja", value);
  };

  const handleHora = (value: string) => {
    setValue("hora", value);
  };

  const selectedNumber = watch("selectedNumber");
  const selectTime = watch("date");
  const selectFranjaH = watch("selectedFranja");
  const selectHoraReserva = watch("hora");
  const name = watch("name");
  const lastname = watch("lastname");
  const email = watch("email");

  useEffect(() => {
    if (selectedNumber) {
      //fetch;
      setVisibleDate(true);
    }
    if (selectTime != undefined) {
      setVisibleTime(true);
    }
    if (selectFranjaH) {
      setVisibleHora(true);
    }
    if (selectHoraReserva) {
      setConfirmOk(true);
    }
    setFormData({
      name: name || "",
      lastname: lastname || "",
      email: "",
      selectedNumber: selectedNumber || 0,
      selectedFranja: selectFranjaH || "",
      date: selectTime,
      time: "",
      hora: selectHoraReserva || "",
    });
  }, [
    selectedNumber,
    selectTime,
    selectFranjaH,
    selectHoraReserva,
    name,
    lastname,
    email,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nombre</label>
      <input {...register("name")} />
      <label>Apellido</label>
      <input {...register("lastname", { required: true })} />
      {errors.lastname && <span>This field is required</span>}
      {people.map((user) => (
        <button
          type="button"
          key={user}
          onClick={() => handleTablePeople(user)}
        >
          {user}
        </button>
      ))}
      {visibleDate && (
        <input type="date" {...register("date", { required: true })} />
      )}
      {visibleTime &&
        franja.map((f) => (
          <button type="button" key={f} onClick={() => handleFraja(f)}>
            {f}
          </button>
        ))}
      {visibleHora &&
        (selectFranjaH === "cena" ? (
          <div>
            <h2>Seleccione la hora disponible para la cena</h2>
            {dinnerH.map((hora) => (
              <button type="button" key={hora} onClick={() => handleHora(hora)}>
                {hora}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <h2>Seleccione la hora disponible para el almuerzo</h2>
            {luncH.map((hora) => (
              <button type="button" key={hora} onClick={() => handleHora(hora)}>
                {hora}
              </button>
            ))}
          </div>
        ))}

      {confirmOk && (
        <>
          <div>
            <h2>Confirma la reserva?</h2>
            <p>{formData.name}</p>
            <p>{formData.email}</p>
            <p>{formData.lastname}</p>
            <p>{formData.date}</p>
            <p>{formData.selectedNumber}</p>
            <p>{formData.time}</p>
          </div>
          <button type="submit">enviar</button>
        </>
      )}
      <br />
      {/* <input type="submit" /> */}
    </form>
  );
};
export default FormReservation;
