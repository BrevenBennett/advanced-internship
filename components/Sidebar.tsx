import React, { useState } from "react";
import { TiHomeOutline } from "react-icons/ti";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { BsPen } from "react-icons/bs";
import { IoIosSearch, IoIosHelpCircleOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { signOutUser } from "@/redux/userSlice";
import { openLoginModal } from "@/redux/modalSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  console.log(user)

  const [loginText, setLoginText] = useState("Logout");

  if (user.email) {
    setLoginText("Login")
  }

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
    setLoginText("Login");
  }

  function handleLogin() {
    dispatch(openLoginModal())
  }

  return (
    <div className="sidebar">
      <figure className="sidebar__img--mask">
        <img className="sidebar__img" src="/assets/logo.png" alt="logo" />
      </figure>
      <div className="sidebar__wrapper">
        <div className="sidebar__top">
          <SidebarLink
            Icon={TiHomeOutline}
            text={"For You"}
            link={"/for-you"}
          />
          <SidebarLink
            Icon={CiBookmark}
            text={"My Library"}
            link={"/library"}
          />
          <SidebarLink
            Icon={BsPen}
            text={"Highlights"}
            className={"sidebar__link--not-allowed"}
          />
          <SidebarLink
            Icon={IoIosSearch}
            text={"Search"}
            className={"sidebar__link--not-allowed"}
          />
        </div>
        <div className="sidebar__bottom">
          <SidebarLink Icon={CiSettings} text={"Settings"} link="/settings" />
          <SidebarLink
            Icon={IoIosHelpCircleOutline}
            text={"Help & Support"}
            className={"sidebar__link--not-allowed"}
          />
          <SidebarLink
            Icon={LuLogOut}
            text={loginText}
            onClick={user.email !== null ? handleSignOut : handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

function SidebarLink({
  text,
  Icon,
  className,
  link,
  onClick,
}: {
  text: string;
  Icon: any;
  className?: string;
  link?: string;
  onClick?: () => void;
}) {
  return (
    <>
      <a
        href={link}
        className={`sidebar__link--wrapper ${className}`}
        onClick={onClick}
      >
        <Icon className="sidebar__link--icon" />
        <span className="sidebar__link--text">{text}</span>
      </a>
    </>
  );
}
