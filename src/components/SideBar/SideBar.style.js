import styled from "styled-components";
import { Link } from "react-router-dom";

const SideBarContainer = styled.div`
  width: 200px;
  height: 100vh;
  padding: 16px 8px 8px 12px;
  background-color: #f5f6f8;
  position: fixed;
  top: 50px;
  left: 0;
`;

const SideBarLogo = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  img {
    display: block;
    width: 50px;
    height: 50px;
  }
  h2 {
    font-size: 16px;
    padding-left: 10px;
  }
`;

const SideBarMenu = styled.ul`
  padding-top: 20px;
  list-style: none;

  & li:not(:last-child) {
    margin-bottom: 4px;
  }

  & li.active > a {
    background-color: #ccc;
    color: #000;
  }

  li a {
    display: block;
    text-decoration: none;
    padding: 8px 4px;
    color: #5e5858;
    border-radius: 4px;
    &:hover {
      background-color: #ccc;
      color: #000;
    }
  }
`;

export { SideBarContainer, SideBarLogo, SideBarMenu };
