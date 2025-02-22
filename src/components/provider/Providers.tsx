"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}
const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent: "capture",
        currency: "MXN",
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  );
};

export default Providers;
