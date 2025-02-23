export const revalidate = 60; //60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: Promise<Param>;
  searchParams: Promise<SearchParams>;
}

type Param = {
  gender: string;
};

type SearchParams = {
  page?: string;
};

const page: FC<pageProps> = async ({ params, searchParams }) => {
  const { gender } = await params;
  const { page } = await searchParams;
  const actualPage = page ? +page : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: actualPage,
    gender: gender as Gender,
  });

  if (products.length == 0) redirect(`/gender/${gender}`);

  const labels: Record<string, string> = {
    men: "caballeros",
    women: "damas",
    kid: "niños",
    unisex: "Todos",
  };

  // if (id === "kid") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Articulos para ${labels[gender]}`}
        subTitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
};

export default page;
