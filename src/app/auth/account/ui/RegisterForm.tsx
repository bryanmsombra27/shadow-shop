"use client";

import clsx from "clsx";
import Link from "next/link";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, register as registerAction } from "@/actions";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

interface RegisterFormProps {}
const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMsg("");
    const { email, name, password } = data;
    const res = await registerAction(name, email, password);

    if (res.error) {
      setErrorMsg(res.error);
      return;
    }

    await login(email.toLowerCase(), password);

    window.location.replace("/");
  };

  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email">Nombre Completo</label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
            "border-red-500": errors.name,
          })}
          type="text"
          {...register("name", { required: true })}
        />
        <label htmlFor="email">Email</label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
            "border-red-500": errors.email,
          })}
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
            "border-red-500": errors.password,
          })}
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />

        <button className="btn-primary">Nueva Cuenta</button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        {errorMsg.length > 0 && (
          <span className="text-red-500">{errorMsg}</span>
        )}

        <Link
          href="/auth/login"
          className="btn-secondary text-center"
        >
          Crear una nueva cuenta
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
