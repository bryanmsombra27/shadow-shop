import Link from "next/link";
import { FC } from "react";

interface FooterProps {}
const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className="font-bold">Shadow</span>
        <span> | Shop</span>
        <span> &copy;{new Date().getFullYear()} </span>
      </Link>

      <Link
        href="/"
        className="mx-3"
      >
        Privacidad & Legal
      </Link>
      <Link
        href="/"
        className="mx-3"
      >
        Ubicaciones
      </Link>
    </div>
  );
};

export default Footer;
