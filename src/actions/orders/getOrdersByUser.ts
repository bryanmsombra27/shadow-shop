"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
  try {
    const session = await auth();

    if (!session?.user.id) throw new Error("inicia sesion para continuar");

    const orders = await prisma.order.findMany({
      where: {
        active: true,
        userId: session?.user.id,
      },
      include: {
        orderAddress: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    return {
      success: "ordenes encontradas",
      orders,
    };
  } catch (error) {
    return {
      error: "no hay ordenes disponibles",
    };
  }
};
