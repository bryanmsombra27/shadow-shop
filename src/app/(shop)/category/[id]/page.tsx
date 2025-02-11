import { ProductGrid, Title } from "@/components";
import { initialData, Category } from "@/seed/seed";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: Param;
}

type Param = {
  id: Category;
};
const products = initialData.products;

const page: FC<pageProps> = ({ params }) => {
  const { id } = params;
  const productsByCategory = products.filter((product) => product.gender == id);

  const labels: Record<Category, string> = {
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
        title={`Articulos para ${labels[id]}`}
        subTitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={productsByCategory} />
    </>
  );
};

export default page;
