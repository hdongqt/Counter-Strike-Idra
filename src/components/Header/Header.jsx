import React from "react";
import  * as HeaderStyle from "./Header.style"

const Header = () => {
  return (
    <HeaderStyle.HeaderContainer style={{ display: "flex", justifyContent: "flex-end" }}>
      <HeaderStyle.HeaderProfile>
        <HeaderStyle.HeaderProfileName>
          Hoang Huu Dong{" "}
          <span>
            <i className="las la-angle-down"></i>
          </span>
        </HeaderStyle.HeaderProfileName>
        <div className="menu">
          <span>
            <i className="las la-sign-out-alt"></i> Logout
          </span>
        </div>
      </HeaderStyle.HeaderProfile>
    </HeaderStyle.HeaderContainer>
  );
};

export default Header;
