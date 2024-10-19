import FormReservation from "mario/componnets/form";
import React from "react";

const Welcome = () => {
  return (
    <div>
      <h1>Bienvedido al restaurante de Don Mario</h1>
      <section>Hace tu reserva</section>
      <FormReservation />
    </div>
  );
};

export default Welcome;
