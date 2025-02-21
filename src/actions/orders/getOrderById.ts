"use server";

import { auth } from "@/auth";
import { Order } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getOrderbyId = async (orderId: string) => {
  try {
    const session = await auth();

    if (!session?.user.id) throw new Error("Inicia sesion para continuar");

    const order = await prisma.order.findUnique({
      where: {
        active: true,
        id: orderId,
      },
      include: {
        orderAddress: true,
        orders: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error("orden no encontrada");

    if (session.user.role === "user") {
      if (session.user.id !== order.userId)
        throw new Error("orden no encontrada");
    }

    return order;
  } catch (error) {
    return {
      error: "No se encontro la orden",
    };
  }
};
