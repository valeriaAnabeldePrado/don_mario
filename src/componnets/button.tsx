import React from "react";
import Link from "next/link";
import "../app/style.css";

type Argumentos = {
  url: string;
  children: React.ReactNode;
};

const Button = ({ url, children }: Argumentos) => {
  return (
    <Link href={url} passHref>
      <button className="button-main">{children}</button>
    </Link>
  );
};

export default Button;
