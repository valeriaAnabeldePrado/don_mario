import React from "react";
import Link from "next/link";

type Argumentos = {
  url: string;
  children: React.ReactNode;
};

const Button = ({ url, children }: Argumentos) => {
  return (
    <Link href={url} passHref>
      <button>{children}</button>
    </Link>
  );
};

export default Button;
