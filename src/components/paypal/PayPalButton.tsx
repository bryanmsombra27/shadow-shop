"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { FC } from "react";
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface PayPalButtonProps {
  orderId: string;
  amount: number;
}
const PayPalButton: FC<PayPalButtonProps> = ({ orderId, amount }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending)
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
      </div>
    );

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "MXN",
            value: roundedAmount.toString(),
          },
        },
      ],
      intent: "CAPTURE",
    });

    const res = await setTransactionId(orderId, transactionId);

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details) return;

    await paypalCheckPayment(details?.id!);
  };

  return (
    <>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </>
  );
};

export default PayPalButton;
