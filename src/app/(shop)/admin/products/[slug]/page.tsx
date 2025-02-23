import { getAllCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { FC } from "react";
import ProductForm from "./ui/ProductForm";

interface pageProps {
  params: Params;
}

interface Params {
  slug: string;
}

const page: FC<pageProps> = async ({ params }) => {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  const data = await getAllCategories();

  if (!product && slug !== "new") redirect("/admin/products");

  const title = slug == "new" ? "Nuevo Producto" : "Editar Producto";

  return (
    <>
      <Title title={title} />
      <ProductForm
        product={product as any}
        categories={data.categories!}
      />
    </>
  );
};

export default page;
