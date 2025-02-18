"use server";

import { signIn } from "@/auth";

export const authenticate = async (state: any, formData: FormData) => {
  // export const authenticate = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
      // email,
      // password,
    });

    return {
      success: "inicio de sesion exitoso",
    };
  } catch (error) {
    console.log(error, "AUTH ERROR");
    return {
      error: "credenciales incorrectas",
    };
    // throw new Error("Credentials SigIn");
  }
};

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    return {
      success: "inicio de sesion exitoso",
    };
  } catch (error) {
    console.log(error, "LOGIN ERROR");
  }
};
