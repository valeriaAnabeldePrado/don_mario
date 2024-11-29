"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import "./form.css";
import { getHorasDisponible, postData } from "./hooks/useFetch";

export type Inputs = {
  fecha: string;
  turno: string;
  hora: string;
  cantidadPersonas: number;
};

export type Horario = {
  disponible: boolean;
  fecha: string;
  horarios: { hora: string; disponible: boolean }[];
  tipo: "no-disponible-cerrado" | "disponible";
};

const people = [1, 2, 3, 4, 5, 6];
const franja = ["almuerzo", "cena"];

const FormReservation = () => {
  const [stepTwoVisible, setStepTwoVisible] = useState(false);
  const [stepThreeVisible, setStepThreeVisible] = useState(false);
  const [stepFour, setStepFour] = useState(false);
  const [stepFibe, setStepFibe] = useState(false);

  const [visibleTime, setVisibleTime] = useState(false);
  const [horasDisponobles, setHorasDisponobles] = useState<Horario[]>([]);

  const [formData, setFormData] = useState({
    fecha: "",
    turno: "",
    hora: "",
    cantidadPersonas: 0,
  });

  const { handleSubmit, watch, setValue } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setStepFibe(true);

    const fetchPostDataForm = async () => {
      try {
        const respuesta = await postData(
          "https://app-reservas-express-mondodb-production.up.railway.app/reservas",
          formData
        );
        console.log(respuesta);
      } catch (error) {
        console.error("Error fetching ", error);
      }
    };
    fetchPostDataForm();
  };

  const isSunday = (date: {
    year: number;
    month: number;
    day: number | undefined;
  }) => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.getDay() === 0;
  };

  const selectComenzales = watch("cantidadPersonas");
  const selectDate = watch("fecha");
  const turnoFranja = watch("turno");
  const selectHoraReserva = watch("hora");

  useEffect(() => {
    if (selectComenzales) {
      setStepTwoVisible(true);
    }
    if (selectDate) {
      setVisibleTime(true);
    }
    if (turnoFranja) {
      setStepThreeVisible(true);
      //fetch horas dispo
      const fetchHorariosDispo = async () => {
        try {
          const respuesta = await getHorasDisponible(
            "https://app-reservas-express-mondodb-production.up.railway.app/calendario/dias/",
            selectDate,
            turnoFranja,
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
      setStepFour(true);
    }
    setFormData({
      fecha: selectDate,
      turno: turnoFranja || "",
      hora: selectHoraReserva || "",
      cantidadPersonas: selectComenzales || 0,
    });
  }, [selectComenzales, selectDate, turnoFranja, selectHoraReserva]);

  const filteredHoras = horasDisponobles.filter(
    (lahora) => lahora.fecha.split("T")[0] === selectDate
  );

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
          <h2 className="h2-subtext">
            Para poder realizar la reserva debes ingresar todos los datos
            solicitados, muchas gracias por elegirnos!
          </h2>
          <label className="padding-t">Cantidad de comensales</label>
          <div className="flex justify-between w-full container-b">
            {people.map((user) => (
              <button
                className="btn-form comensales-btn "
                key={user}
                type="button"
                onClick={() => setValue("cantidadPersonas", user)}
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
            <label>Selecciona la fecha luego la preferencia del servicio</label>
            <div className="flex justify-around gap-10 ">
              <Calendar
                className="custom-calendar"
                aria-label="Seleccionar fecha"
                isDateUnavailable={isSunday}
                defaultValue={today(getLocalTimeZone())}
                minValue={today(getLocalTimeZone())}
                onChange={(value) => setValue("fecha", value?.toString() || "")}
              />

              <div className="buttont-cont margen">
                {franja.map((f) => (
                  <button
                    type="button"
                    disabled={visibleTime ? false : true}
                    className="btn-form franja"
                    key={f}
                    onClick={() => setValue("turno", f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {stepThreeVisible && (
          <div
            className={`container-horarios-reserva ${
              stepFour ? `container-opacity` : ""
            }`}
          >
            <label className="margen-b">Seleccione la hora disponible</label>
            <div className=" flex justify-between items-center container-horas">
              {horasDisponobles.map((lahora, index) => (
                <div key={index}>
                  <p
                    className={`${
                      filteredHoras.includes(lahora)
                        ? "font-bold text-orange-300"
                        : ""
                    }`}
                  >
                    {lahora.fecha.split("T")[0]}
                  </p>
                  <p>{lahora.disponible ? "Disponible" : "No disponible"}</p>
                  <div className="flex flex-col">
                    {lahora.horarios.map((item, idx) => (
                      <button
                        key={idx}
                        className="btn-form border-btn-form"
                        type="button"
                        onClick={() => setValue("hora", item.hora)}
                      >
                        {item.hora}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {stepFour && (
          <div
            className={`${
              stepFibe
                ? `container-opacity`
                : `container-horarios-reserva flex flex-col gap-10`
            }`}
          >
            <h2 className="text-center font-semibold text-lg">
              Confirmar la reserva?
            </h2>
            <section className="container-confirm">
              <p>Cantidad de comenzales: {formData.cantidadPersonas}</p>
              <p>Fecha seleccionada: {formData.fecha}</p>
              <p>Hora seleccionada: {formData.hora}</p>
            </section>
            <button
              type="submit"
              className="text-center self-center btn-form franja"
            >
              enviar
            </button>
          </div>
        )}
        {stepFibe && (
          <div className="text-center">
            <h2 className="text-center font-semibold text-lg">
              Reserva exitosa muchas gracias!
            </h2>
          </div>
        )}
        <br />
      </form>
    </>
  );
};
export default FormReservation;
