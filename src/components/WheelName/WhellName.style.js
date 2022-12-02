import styled from "styled-components";

const WheelStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #ffffffe8;
`;

const ButtonWheel = styled.button`
  font-size: 16px;
  outline: none;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#186fef")};
  color: ${(props) => (props.color ? props.color : "#fff")};
  padding: 10px 12px;
  min-width: 80px;
  border-radius: 4px;
  font-weight: 600;
  transition: 0.2s linear;
  &:hover {
    opacity: 0.8;
  }
`;

const AreaList = styled.textarea`
  outline: none;
  border: 1px solid #ccc;
  padding: 10px 10px;
  font-size: 16px;
  max-width: 100%;
  min-width: 100%;
  min-height: 200px;
  border-radius: 8px;
  border: 2px solid #333;
`;

const TitleWheel = styled.h2`
  font-size: 36px;
  text-align: center;
  margin: 50px 0px;
`;

export { ButtonWheel, AreaList, TitleWheel, WheelStyle };
