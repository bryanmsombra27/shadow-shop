"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const deleted = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      success: "Direccion de usuario borrada con exito!",
    };
  } catch (error) {
    console.log(error, "DELETE USER ADDRESS ACTION");
    return {
      error: "No fue posible borrar la direccion del usuario",
    };
  }
};
