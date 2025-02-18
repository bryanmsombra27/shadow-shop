"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    console.log(name, "NOMBRE");
    console.log(email, "EMAIL");
    console.log(password, "PASSWORD");

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        password: hashPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        // image: true,
        // role: true,
      },
    });

    if (!user) throw new Error("usuario no fue creado ");

    return {
      success: "Usuario creado con exito !",
      user,
    };
  } catch (error) {
    console.log(error, "REGISTER ERROR");
    return {
      error: "No se pudo crear la cuenta de usuario",
    };
  }
};
