import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: Param;
}

type Param = {
  id: string;
};

const page: FC<pageProps> = ({ params }) => {
  const { id } = params;

  if (id === "kids") {
    notFound();
  }

  return <h1></h1>;
};

export default page;
