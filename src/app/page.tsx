import Button from "mario/componnets/button";
import "./style.css";
import { Abril_Fatface, Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "200",
});
const freckleFace = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
});
export default function Home() {
  ///dashboard/reservation
  return (
    <div className="backg_home relative">
      <div className="overlay"></div>
      <section className="h-full w-full flex flex-col justify-center align-middle  gap-40 absolute">
        <h1 className={`home_h2 ${freckleFace.className}`}>
          Restaurante de Don Mario
        </h1>
        <section
          className={`flex justify-center align-middle w-full gap-10 ${poppins.className}`}
        >
          <Button url="/dashboard/login">Reservar</Button>
          <Button url="/dashboard/check_reserv">Consulta tu reserva</Button>
        </section>
      </section>
    </div>
  );
}
