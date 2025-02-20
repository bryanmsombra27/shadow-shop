import { Address } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InitialState {
  address: Address;
}

interface Actions {
  setAddress: (address: Address) => void;
}

type State = InitialState & Actions;

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        address: "",
        city: "",
        country: "",
        firstName: "",
        lastName: "",
        phone: "",
        postalCode: "",
        adddress2: "",
      },

      setAddress: (address) => {
        set({
          address,
        });
      },
    }),
    { name: "address-storage" }
  )
);
