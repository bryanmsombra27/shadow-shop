import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { formatCurrency } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface pageProps {}
const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
          <div className="flex flex-col mt-5 ">
            <span className="text-xl ">Ajustar elementos </span>
            <Link
              href="/cart"
              className="underline mb-5 "
            >
              Editar carrito
            </Link>

            {productsInCart.map((product) => (
              <div
                key={product.slug}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>{formatCurrency(product.price)} x 3</p>
                  <p className="font-bold">Subtotal: {product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>

            <div className="mb-10">
              <p>Bryan Ochoa </p>
              <p>Av.Siempre viva 123</p>
              <p>Col. centro</p>
              <p>Alcaldia.cuahutemoc</p>
              <p>CDMX</p>
              <p>CP 39850</p>
              <p>123-456-789-1</p>
            </div>

            <div className="w-full h-0.5 bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right"> 3 artículos</span>
              <span>Subtotal</span>
              <span className="text-right"> $100 </span>
              <span>Impuestos (15%)</span>
              <span className="text-right"> $100 </span>
              <span className="mt-5 text-2xl ">Total: </span>
              <span className="text-right mt-5 text-2xl"> $100 </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                <span>
                  Al hacer click en "Colocar Orden", aceptas nuestros{" "}
                  <a
                    href="#"
                    className="underline"
                  >
                    Términos y condiciones
                  </a>{" "}
                  y{" "}
                  <a
                    href="#"
                    className="underline"
                  >
                    Política de privacidad{" "}
                  </a>
                </span>
              </p>

              <Link
                href="/orders/123"
                className="flex btn-primary justify-center"
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
