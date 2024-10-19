import Button from "mario/componnets/button";

export default function Home() {
  return (
    <div>
      <h1>Bienvedido al restaurante de Don Mario</h1>
      <section>
        <Button url="/dashboard/reservation">Reservar</Button>
        <Button url="/dashboard/check_reserv">Consulta tu reserva</Button>
      </section>
    </div>
  );
}
