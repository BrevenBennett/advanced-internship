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
import LoginModal from "./modals/LoginModal";
import PasswordModal from "./modals/PasswordModal";
import SignupModal from "./modals/SignupModal";
import { useRouter } from "next/router";

export default function Sidebar({ onClick, className, children }: { onClick?: () => void, className: string, children: any }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  console.log(!!user.email);
  console.log(user);

  const playerIdPage = router.pathname === "/player/[id]";

  async function handleSignOut() {
    try {
      await signOut(auth);
      dispatch(signOutUser());
    } catch (error) {
      alert("Sign out issue");
    }
  }

  function handleLogIn() {
    dispatch(openLoginModal());
  }

  return (
    <div className={`sidebar ${className}`}>
      {children}
      <figure className="sidebar__img--mask">
        <img className="sidebar__img" src="/assets/logo.png" alt="logo" />
      </figure>
      <div
        className={
          playerIdPage
            ? "sidebar__wrapper sidebar__wrapper--player"
            : "sidebar__wrapper"
        }
      >
        <div className="sidebar__top">
          <SidebarLink
            Icon={TiHomeOutline}
            text={"For You"}
            link={"/for-you"}
            onClick={onClick}
          />
          <SidebarLink
            Icon={CiBookmark}
            text={"My Library"}
            className={"sidebar__link--not-allowed"}
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
          <SidebarLink
            Icon={CiSettings}
            text={"Settings"}
            link="/settings"
            onClick={onClick}
          />
          <SidebarLink
            Icon={IoIosHelpCircleOutline}
            text={"Help & Support"}
            className={"sidebar__link--not-allowed"}
          />
          <SidebarLink
            Icon={LuLogOut}
            text={user.email ? "Logout" : "Login"}
            onClick={user.email ? handleSignOut : handleLogIn}
          />
        </div>
      </div>
      <LoginModal />
      <PasswordModal />
      <SignupModal />
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
