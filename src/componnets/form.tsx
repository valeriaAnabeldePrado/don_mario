"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import "./form.css";
import { getHorasDisponible } from "./hooks/useFetch";

//import { postData } from "./hooks/useFetch";

export type Inputs = {
  name: string;
  lastname: string;
  email: string;
  selectComenzales: number;
  selectService: string;
  date: string;
  time: string;
  hora: string;
};

export type Horario = {
  disponible: boolean;
  fecha: string;
  horarios: string[]; // Array of available times as strings (if any)
  tipo: "no-disponible-cerrado" | "disponible"; // Enum for types of availability
};

const people = [1, 2, 3, 4, 5, 6];
const franja = ["almuerzo", "cena"];

const FormReservation = () => {
  const [stepTwoVisible, setStepTwoVisible] = useState(false);
  const [stepThreeVisible, setStepThreeVisible] = useState(false);

  const [visibleTime, setVisibleTime] = useState(false);
  const [horasDisponobles, setHorasDisponobles] = useState<Horario[]>([]);
  const [confirmOk, setConfirmOk] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    selectedComezales: 0,
    selectService: "",
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

  const isSunday = (date: {
    year: number;
    month: number;
    day: number | undefined;
  }) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.getDay() === 0;
  };

  const selectComenzales = watch("selectComenzales");
  const selectDate = watch("date");
  const selectServiceFranja = watch("selectService");
  const selectHoraReserva = watch("hora");
  const name = watch("name");
  const lastname = watch("lastname");
  const email = watch("email");

  useEffect(() => {
    if (selectComenzales) {
      setStepTwoVisible(true);
    }
    if (selectDate) {
      setVisibleTime(true);
    }
    if (selectServiceFranja) {
      setStepThreeVisible(true);
      //fetch horas dispo
      const fetchHorariosDispo = async () => {
        try {
          const respuesta = await getHorasDisponible(
            "http://localhost:1234/calendario/dias/",
            selectDate,
            selectServiceFranja,
            selectComenzales
          );
          setHorasDisponobles(respuesta);
          console.log(respuesta);
        } catch (error) {
          console.error("Error fetching horarios disponibles:", error);
        }
      };
      fetchHorariosDispo();
    }
    if (selectHoraReserva) {
      setConfirmOk(true);
    }
    setFormData({
      name: name || "",
      lastname: lastname || "",
      email: "",
      selectedComezales: selectComenzales || 0,
      selectService: selectServiceFranja || "",
      date: selectDate,
      time: "",
      hora: selectHoraReserva || "",
    });
  }, [
    selectComenzales,
    selectDate,
    selectServiceFranja,
    selectHoraReserva,
    name,
    lastname,
    email,
  ]);

  return (
    <>
      <form
        className="flex flex-col form-main"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section
          className={`flex flex-col ${
            stepTwoVisible ? `container-opacity` : ""
          }`}
        >
          <label>Nombre</label>
          <input {...register("name", { required: true })} />
          <label>Apellido</label>
          <input {...register("lastname", { required: true })} />
          {errors.lastname && <span>This field is required</span>}
          <label className="padding-t">Cantidad de comensales</label>
          <div className="flex justify-between w-full">
            {people.map((user) => (
              <button
                className="btn-form comensales-btn"
                key={user}
                type="button"
                onClick={() => setValue("selectComenzales", user)}
              >
                {user}
              </button>
            ))}
          </div>
        </section>

        {stepTwoVisible && (
          <section
            className={`flex flex-col ${
              stepThreeVisible ? `container-opacity` : ""
            }`}
          >
            <label className="padding-b">
              Selecciona la fecha luego la preferencia del servicio
            </label>
            <div className="flex justify-around gap-10 ">
              <Calendar
                className="custom-calendar"
                aria-label="Seleccionar fecha"
                isDateUnavailable={isSunday}
                defaultValue={today(getLocalTimeZone())}
                minValue={today(getLocalTimeZone())}
                onChange={(value) => setValue("date", value?.toString() || "")}
              />

              <div className="buttont-cont margen">
                {franja.map((f) => (
                  <button
                    type="button"
                    disabled={visibleTime ? false : true}
                    className="btn-form franja"
                    key={f}
                    onClick={() => setValue("selectService", f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {stepThreeVisible && (
          <div>
            <label>Seleccione la hora disponible</label>
            <div className="buttont-cont margen">
              {horasDisponobles.map((hora, index) => (
                <div key={index}>
                  <p>{hora.tipo}</p>
                  <p>{hora.disponible}</p>
                  <p>
                    {hora.horarios.map((item) => (
                      <p key={index}>{item.hora}</p>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* <button
                  className="btn-form"
                  type="button"
                  key={hora}
                  onClick={() => setValue("hora", hora)}
                >
                  {}
                </button> */}
        {confirmOk && (
          <>
            <div>
              <h2>Confirma la reserva?</h2>
              <p>{formData.name}</p>
              <p>{formData.email}</p>
              <p>{formData.lastname}</p>
              <p>{formData.date}</p>
              <p>{formData.selectedComezales}</p>
              <p>{formData.time}</p>
            </div>
            <button type="submit">enviar</button>
          </>
        )}
        <br />
      </form>
    </>
  );
};
export default FormReservation;
