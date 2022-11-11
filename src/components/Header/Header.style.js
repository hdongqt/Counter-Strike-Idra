import styled from "styled-components";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #f5f6f8;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
  z-index: 10;
  padding: 0 10px;
`;

const HeaderProfile = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:hover .menu {
    display: block;
  }

  & .menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 100;
    background-color: #f5f6f8;
    padding: 10px 8px;
    border-radius: 0 0 8px 8px;
    border: 2px solid #e3e3e3;
    text-align: center;

    & span {
      font-size: 17px;
      padding: 6px 4px;
      font-weight: 400;
      color: #0062eb;
      cursor: pointer;

      &:hover {
        color: #1206f4;
      }
    }
  }
`;
const HeaderProfileName = styled.span`
  color: #0062eb;
  cursor: default;
`;

export {
    HeaderContainer,
    HeaderProfile,
    HeaderProfileName
}