"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTranasactionId: string) => {
  const token = await getPayPalToken();

  if (!token) {
    return {
      error: "No se pudo obtener el token",
    };
  }

  const res = await verifyPaypalPayment(paypalTranasactionId, token);

  if (!res) {
    return {
      error: "Error en la verificacion de la orden",
    };
  }

  const { status, purchase_units } = res;
  const { invoice_id } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      error: "Aun no se ha pagado la orden",
    };
  }
  try {
    console.log(
      status,
      purchase_units,
      "UNIDADES DE RETORNO DE LA VERIFICACION"
    );

    await prisma.order.update({
      where: {
        id: invoice_id,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });
    revalidatePath(`/orders/${invoice_id}`);

    return {
      success: "orden pagada con exito!",
    };
  } catch (error) {
    return {
      error: "Error en el pago",
    };
  }
};

const getPayPalToken = async () => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const PAYPAL_API_URL = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  try {
    const req = await fetch(PAYPAL_API_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Token}`,
      },
      cache: "no-store",
      method: "POST",
      body: urlencoded,
    });
    const data = await req.json();

    return data.access_token;
  } catch (error) {
    // return {
    //   error: "no fue posible hacer la peticion",
    // };
  }
};

const verifyPaypalPayment = async (
  paypalTranasactionId: string,
  token: string
): Promise<PaypalOrderStatusResponse | null> => {
  const PAYPAL_API_URL = process.env.PAYPAL_ORDERS_URL ?? "";

  try {
    const req = await fetch(`${PAYPAL_API_URL}/${paypalTranasactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    const data = await req.json();
    return data;
  } catch (error) {
    // return {
    //   error: "Token no valido",
    // };
    return null;
  }
};
