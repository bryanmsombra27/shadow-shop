"use client";
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { FC, useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

interface LoginFormProps {}
const LoginForm: FC<LoginFormProps> = ({}) => {
  const [state, dispatch] = useActionState(authenticate, null);
  // const router = useRouter();
  //
  useEffect(() => {
    // if (state?.success) redirect("/");
    // if (state?.success) router.replace("/");
    if (state?.success) window.location.replace("/");
  }, [state]);

  return (
    <>
      <form
        action={dispatch}
        className="flex flex-col"
      >
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name="email"
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name="password"
        />
        {state?.error && (
          <div className="flex h-8 items-end space-x-1 bg mb-5">
            <IoInformationOutline className="h-5  w-5  text-red-500" />
            <p className=" text-red-500">Credenciales no son correctas</p>
          </div>
        )}

        <LoginButton />

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/account"
          className="btn-secondary text-center"
        >
          Crear una nueva cuenta
        </Link>
      </form>
    </>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      // className="btn-primary"
      className={clsx("btn-primary", {
        "opacity-5 cursor-not-allowed pointer-events-none": pending,
      })}
      disabled={pending}
      type="submit"
    >
      Ingresar
    </button>
  );
};

export default LoginForm;
