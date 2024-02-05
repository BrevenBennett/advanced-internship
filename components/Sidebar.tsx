import React from "react";
import { TiHomeOutline } from "react-icons/ti";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { BsPen } from "react-icons/bs";
import { IoIosSearch, IoIosHelpCircleOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";

export default function Sidebar() {
  return (
    <div>
      <TiHomeOutline />
      <CiBookmark />
      <BsPen />
      <IoIosSearch />
      <CiSettings />
      <IoIosHelpCircleOutline />
      <LuLogOut />
    </div>
  );
}
