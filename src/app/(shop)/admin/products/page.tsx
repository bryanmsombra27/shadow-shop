export const revalidate = 0;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { formatCurrency } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  searchParams: Params;
}

interface Params {
  page?: string;
}
const page: FC<Props> = async ({ searchParams }) => {
  const search = await searchParams;
  const page = search.page ? +search.page : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  return (
    <>
      <Title title="Products" />
      <div className="flex justify-end mb-5">
        <Link
          href="/admin/products/new"
          className="btn-primary"
        >
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 bproduct-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                className="bg-white bproduct-b transition duration-300 ease-in-out hover:bg-gray-100"
                key={product.id}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      alt={`product ${product.title}`}
                      width={80}
                      height={80}
                      className="w-20 h-20  object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/products/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {formatCurrency(product.price)}
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>
                <td className="text-sm text-gray-900  px-6 font-bold">
                  {product.inStock}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
};

export default page;
