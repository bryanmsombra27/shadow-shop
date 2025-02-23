"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (id: string, role: string) => {
  const newRole = role == "admin" ? "admin" : "user";

  try {
    const session = await auth();

    if (session?.user.role != "admin") {
      return {
        error: "Inicia sesion como admin para continuar",
      };
    }
    const user = await prisma.user.update({
      where: {
        id,
        active: true,
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");

    return {
      success: "role actualizado con exito!",
      user,
    };
  } catch (error) {
    return {
      error: "No se pudo actualizar usuarios",
    };
  }
};
