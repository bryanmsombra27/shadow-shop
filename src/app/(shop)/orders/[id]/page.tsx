import { getOrderbyId } from "@/actions";
import { Title } from "@/components";
import { Order } from "@/interfaces";

import { initialData } from "@/seed/seed";
import { formatCurrency } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FC } from "react";
import { IoCartOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface pageProps {
  params: Params;
}

type Params = {
  id: string;
};

const page: FC<pageProps> = async ({ params }) => {
  const { id } = await params;
  const order = (await getOrderbyId(id)) as Order;

  if (!order) redirect("/");

  console.log(order, "Order");

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          <div className="flex flex-col mt-5 ">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order.isPaid,
                  "bg-green-700": order.isPaid,
                }
              )}
            >
              <IoCartOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">
                {order.isPaid ? "Pagada" : "Pendiente de pago"}{" "}
              </span>
            </div>

            {order.orders.map((productOrder, index) => (
              <div
                key={`${productOrder.product.slug}-${index}`}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${productOrder.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={productOrder.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{productOrder.product.title}</p>
                  <p>
                    ${formatCurrency(productOrder.price)} x{" "}
                    {productOrder.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal:{" "}
                    {formatCurrency(productOrder.price * productOrder.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>

            <div className="mb-10">
              <p>
                {order.orderAddress.firstName} {order.orderAddress.lastName}
              </p>
              <p>{order.orderAddress.address}</p>
              <p>{order.orderAddress.address2}</p>
              <p>
                {order.orderAddress.city}, {order.orderAddress.countryId}
              </p>
              <p>CP {order.orderAddress.postalCode}</p>
              <p>{order.orderAddress.phone}</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {" "}
                {order.itemsInOrder === 1
                  ? "1 articulo"
                  : `${order.itemsInOrder} artículos`}{" "}
              </span>
              <span>Subtotal</span>
              <span className="text-right">
                {" "}
                {formatCurrency(order.subTotal)}{" "}
              </span>
              <span>Impuestos (15%)</span>
              <span className="text-right"> {formatCurrency(order.tax)} </span>
              <span className="mt-5 text-2xl ">Total: </span>
              <span className="text-right mt-5 text-2xl">
                {" "}
                {formatCurrency(order.total)}{" "}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": !order.isPaid,
                    "bg-green-700": order.isPaid,
                  }
                )}
              >
                <IoCartOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">
                  {order.isPaid ? "Pagada" : "Pendiente de pago"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
