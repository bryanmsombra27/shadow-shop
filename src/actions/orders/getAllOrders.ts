"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  limit?: number;
}

export const getAllOrders = async () => {
  try {
    const session = await auth();

    if (session?.user.role !== "admin")
      throw new Error("solo administadores pueden acceder");

    const orders = await prisma.order.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderAddress: {
          select: { firstName: true, lastName: true },
        },
      },
      //   take: limit,
      //   skip: (page - 1) * limit,
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
