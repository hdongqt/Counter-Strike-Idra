import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as SideBarStyle from "./SideBar.style";
import { default as logoIMG } from "../../assets/images/logo.png";
const SideBar = () => {
  const listNav = [
    {
      name: "Match",
      path: "/matchs",
    },
    {
      name: "User",
      path: "/users",
    },
  ];

  const { pathname } = useLocation();

  return (
    <SideBarStyle.SideBarContainer>
      <SideBarStyle.SideBarLogo to="/">
        <img src={logoIMG} alt="logo" />
        <h2>Counter Strike</h2>
      </SideBarStyle.SideBarLogo>
      <SideBarStyle.SideBarMenu>
        {listNav &&
          listNav.map((item, index) => {
            return (
              <li key={index} className={pathname.startsWith(item.path) ? "active" : undefined}>
                <Link to={item.path} style={{ paddingLeft: "10px" }}>
                  {item.name}
                </Link>
              </li>
            );
          })}
      </SideBarStyle.SideBarMenu>
    </SideBarStyle.SideBarContainer>
  );
};

export default SideBar;
