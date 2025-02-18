"use server";

import { signIn } from "@/auth";

export const authenticate = async (formData: FormData) => {
  try {
    await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    console.log(error, "AUTH ERROR");
    // throw new Error("Credentials SigIn");
  }
};
