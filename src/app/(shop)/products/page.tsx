import { Title } from "@/components";
import { FC } from "react";

interface pageProps {}
const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Title
        title="Tienda"
        subTitle="Todos los productos"
        className="mb-2"
      />
    </>
  );
};

export default page;
