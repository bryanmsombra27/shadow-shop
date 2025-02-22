"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
        active: true,
      },
      data: {
        transactionId,
      },
    });
    if (!updatedOrder) {
      return {
        error: "No se encontro la orden",
      };
    }

    return {
      success: "Orden actualizada con exito!",
    };
  } catch (error) {
    return {
      error: "no fue posible actualizar la transaccion",
    };
  }
};
