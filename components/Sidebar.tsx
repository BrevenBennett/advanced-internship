import React from "react";
import { TiHomeOutline } from "react-icons/ti";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { BsPen } from "react-icons/bs";
import { IoIosSearch, IoIosHelpCircleOutline } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <figure className="sidebar__img--mask">
        <img className="sidebar__img" src="/assets/logo.png" alt="logo" />
      </figure>
      <div className="sidebar__wrapper">
        <div className="sidebar__top">
          <SidebarLink Icon={TiHomeOutline} text={"For you"} className="" link="/for-you" />
          <SidebarLink Icon={CiBookmark} text={"My Library"} className="" link="/library" />
          <SidebarLink
            Icon={BsPen}
            text={"Highlights"}
            className={"sidebar__link--not-allowed"}
            link=""
          />
          <SidebarLink
            Icon={IoIosSearch}
            text={"Search"}
            className={"sidebar__link--not-allowed"}
            link=""
          />
        </div>
        <div className="sidebar__bottom">
          <SidebarLink Icon={CiSettings} text={"Settings"} className="" link="/settings" />
          <SidebarLink
            Icon={IoIosHelpCircleOutline}
            text={"Help & Support"}
            className={"sidebar__link--not-allowed"}
            link=""
          />
          <SidebarLink Icon={LuLogOut} text={"Logout"} className="" link="" />
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
}: {
  text: string;
  Icon: any;
  className: string;
  link: string;
}) {
  return (
    <>
      <a href={link} className={`sidebar__link--wrapper ${className}`}>
        <Icon className="sidebar__link--icon" />
        <span className="sidebar__link--text">{text}</span>
      </a>
    </>
  );
}
