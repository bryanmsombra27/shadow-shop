"use client";
import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { formatCurrency } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

interface PlaceOrderProps {}
const PlaceOrder: FC<PlaceOrderProps> = ({}) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const address = useAddressStore((state) => state.address);
  const clearCart = useCartStore((state) => state.clearCart);
  const { itemsInCart, subTotal, tax, total } = useCartStore(
    useShallow((state) => state.getSummaryInformation())
  );
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const res = await placeOrder(productsToOrder, address);

    if (res.error) {
      setIsPlacingOrder(false);
      setErrorMsg(res.error);
      return;
    }
    setErrorMsg("");
    clearCart();

    console.log(res, "RESPONSE ");

    setIsPlacingOrder(false);
    router.replace(`/orders/${res.order}`);
  };

  if (!loaded) return <p>Cargando...</p>;

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-7">
        <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>

        <div className="mb-10">
          <p>
            {address.firstName} {address.lastName}{" "}
          </p>
          <p>{address.address}</p>
          <p>{address.address2}</p>
          <p>{address.postalCode}</p>
          <p>{address.phone}</p>
        </div>

        <div className="w-full h-0.5 bg-gray-200 mb-10" />

        <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

        <div className="grid grid-cols-2">
          <span>No. Productos</span>
          <span className="text-right">
            {itemsInCart == 1 ? "1 artículo" : `${itemsInCart} artículos`}
          </span>
          <span>Subtotal</span>
          <span className="text-right"> {formatCurrency(subTotal)} </span>
          <span>Impuestos (15%)</span>
          <span className="text-right"> {formatCurrency(tax)}</span>
          <span className="mt-5 text-2xl ">Total: </span>
          <span className="text-right mt-5 text-2xl">
            {formatCurrency(total)}{" "}
          </span>
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

          {errorMsg.length > 0 && (
            <p className="bg-red-500 text-white px-4 py-2  my-3 rounded-lg  font-bold text-lg ">
              {errorMsg}
            </p>
          )}

          <button
            // href="/orders/123"
            onClick={onPlaceOrder}
            disabled={isPlacingOrder}
            className={clsx("flex btn-primary justify-center", {
              "opacity-50 pointer-events-none cursor-not-allowed":
                isPlacingOrder,
            })}
          >
            Colocar orden
          </button>
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
