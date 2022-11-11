import { Link } from "react-router-dom";
import styled from "styled-components";

const UserAction = styled.div`
  padding: 30px 20px;
  & > h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const UserActionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const BackToUserButton = styled(Link)`
  display: flex;
  gap: 2px;
  align-items: center;
  text-decoration: none;
  color: #000;
`;

const UserActionContainer = styled.div`
  margin-top: 20px;
  padding-left: 30px;
`;

const UserActionRow = styled.div`
  display: flex;
  gap: 100px;
  margin-bottom: 20px;
`;

const UserActionGroup = styled.div`
  display: flex;
  align-items: flex-start;
`;

const UserLabel = styled.span`
  font-size: 16px;
  padding-right: 10px;
  width: 150px;
  word-break: break-all;
`;

const UserInfo = styled.span`
  font-weight: 600;
  width: 200px;
  word-break: break-all;
  & .state {
    padding: 4px 6px;
    border-radius: 4px;
    background-color: ${(props) => props?.bgColor};
    color: #fff;
  }
`;

const TableContainer = styled.div`
  margin-top: 20px;
  width: 800px;
`;

export {
  UserAction,
  UserLabel,
  UserInfo,
  UserActionContainer,
  UserActionGroup,
  BackToUserButton,
  UserActionRow,
  UserActionTitle,
  TableContainer,
};
