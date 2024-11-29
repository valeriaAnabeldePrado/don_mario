import FormSignUp from "@/componnets/formSignUp";
import { Abril_Fatface, Poppins } from "next/font/google";
import "../reservation/reserv.css";
const freckleFace = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: "200",
});
const AuthPage = () => {
  return (
    <div className="container-reserv relative">
      <div className="overlay-reserv"></div>
      <section
        className={`h-full w-full  main-form absolute ${poppins.className}`}
      >
        <h1 className={`h1-reserv ${freckleFace.className}`}>Registrate</h1>
        <div className="card-reserv">
          <FormSignUp />
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
