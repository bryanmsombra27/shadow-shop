"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getAllUsers = async () => {
  try {
    const session = await auth();

    if (session?.user.role != "admin") {
      return {
        error: "Inicia sesion como admin para continuar",
      };
    }

    const users = await prisma.user.findMany({
      where: {
        active: true,
      },
      orderBy: {
        name: "desc",
      },
      select: {
        email: true,
        id: true,
        name: true,
        address: {
          select: {
            address: true,
          },
        },
        role: true,
        image: true,
      },
    });

    return {
      success: "usuarios recuperados con exito!",
      users,
    };
  } catch (error) {
    return {
      error: "No se pudo recuperar los usuarios",
    };
  }
};
