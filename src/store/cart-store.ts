import { CartProduct, SummaryInfo } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialState {
  cart: CartProduct[];
}
interface Actions {
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeFromCart: (product: CartProduct) => void;
  getSummaryInformation: () => SummaryInfo;
}

type State = InitialState & Actions;

export const useCartStore = create<State>()(
  // MIDDLEWARE QUE AUTOMATICAMENTE ALMACENA DATA EN LOCALSTORAGE
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product) => {
        const { cart } = get();

        // const productInCart = cart.find(item => item.id == product.id )
        // SIMILAR AL METODO FIND CON LA DIFERENCIA DE QUE TERMINA UNA VEZ QUE ENCUENTRA LA CONDICION DE BUSQUEDA Y REGRESA UN VALOR BOOLEANO
        const productInCart = cart.some(
          (item) => item.id == product.id && item.size === product.size
        );

        if (!productInCart) {
          set((prevState) => ({
            cart: [...cart, product],
          }));
        } else {
          const newCart = cart.map((item) => {
            if (item.id == product.id && item.size === product.size) {
              // item.quantity = item.quantity + product.quantity;
              item.quantity += product.quantity;
            }

            return item;
          });
          set({
            cart: newCart,
          });
        }
      },
      getTotalItems: () => {
        const { cart } = get();

        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

        return totalItems;
      },
      updateProductQuantity: (product, quantity) => {
        const { cart } = get();

        const newCart = cart.map((item) => {
          if (item.id == product.id && item.size == product.size) {
            item.quantity = quantity;
          }

          return item;
        });

        set({
          cart: newCart,
        });
      },

      removeFromCart: (product) => {
        const { cart } = get();

        const newCart = cart.filter(
          (item) => item.id !== product.id || product.size !== item.size
        );

        set({
          cart: newCart,
        });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const itemsInCart = get().getTotalItems();

        const subTotal = cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;

        return {
          subTotal,
          total,
          tax,
          itemsInCart,
        };
      },
    }),

    {
      name: "shopping-cart",
      // skipHydration: true,
    }
  )
);
