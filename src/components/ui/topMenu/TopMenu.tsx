"use client";

import { titleFont } from "@/config/fonts";
import { useUiStore } from "@/store";
import Link from "next/link";
import { FC } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

interface TopMenuProps {}
const TopMenu: FC<TopMenuProps> = ({}) => {
  const openSideMenu = useUiStore((state) => state.openSideMenu);

  return (
    <nav className="flex px-5 justify-between items-center w-full ">
      <div className="">
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Shadow
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          href="/category/men"
          className="m-2 p- rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>
        <Link
          href="/category/women"
          className="m-2 p- rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>
        <Link
          href="/category/kids"
          className="m-2 p- rounded-md transition-all hover:bg-gray-100"
        >
          niños
        </Link>
      </div>

      <div className="flex items-center">
        <Link
          href="/search"
          className="mx-2"
        >
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link
          href="/cart"
          className="mx-2"
        >
          <div className="relative">
            <span className="  absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2">
              {" "}
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={openSideMenu}
        >
          Menú
        </button>
      </div>
    </nav>
  );
};

export default TopMenu;
