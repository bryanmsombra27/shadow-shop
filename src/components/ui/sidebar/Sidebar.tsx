"use client";

import { logOut } from "@/actions";
import { useUiStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

interface SidebarProps {}
const Sidebar: FC<SidebarProps> = ({}) => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUiStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  // const isAdmin = session?.user.role == "admin";

  return (
    <div>
      {isSideMenuOpen && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
          <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
        </>
      )}

      <nav
        className={clsx(
          "fixed right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />
        <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2"
          />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-gray-50 rounded  py-1 px-10 mx-2 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {session?.user && (
          <Link
            href="/profile"
            onClick={closeSideMenu}
            className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all "
          >
            <IoPersonOutline size={30} />
            <span className="ml-3 text-xl">Perfil</span>
          </Link>
        )}

        {isAuthenticated && (
          <Link
            href="/orders"
            onClick={closeSideMenu}
            className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all "
          >
            <IoTicketOutline size={30} />
            <span className="ml-3 text-xl">Ordenes</span>
          </Link>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            onClick={() => closeSideMenu()}
            className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all "
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {isAuthenticated && (
          <Link
            href="/"
            onClick={async () => {
              closeSideMenu();
              await logOut();
              window.location.replace("/");
              // router.refresh();
            }}
            className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all "
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </Link>
        )}

        <div className="w-full h-px bg-gray-200 my-10" />

        {session?.user.role == "admin" && (
          <>
            <Link
              href="/admin/products"
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all "
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              href="/admin/orders"
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all "
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              href="/admin/users"
              onClick={closeSideMenu}
              className="flex items-center mt-10 p-2  hover:bg-gray-100 rounded transition-all "
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
