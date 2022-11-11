import { Link } from "react-router-dom";
import styled from "styled-components";

const MatchAction = styled.div`
  padding: 30px 20px;
  & > h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const MatchActionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

const BackToMatchButton = styled(Link)`
  display: flex;
  gap: 2px;
  text-decoration: none;
  color: #000;
`;

const MatchActionContainer = styled.div`
  margin-top: 20px;
  padding-left: 30px;
`;

const MatchActionRow = styled.div`
  display: flex;
  gap: 100px;
  margin-bottom: 20px;
`;

const MatchActionGroup = styled.div`
  display: flex;
  align-items: flex-start;
`;

const MatchLabel = styled.span`
  font-size: 16px;
  padding-right: 10px;
  width: 150px;
  word-break: break-all;
`;

const MatchInfo = styled.span`
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

const MatchTeam = styled.div`
  display: flex;
  width: 600px;
`;

const MatchTeamColumn = styled.div`
  width: 50%;
  border: 2px solid #242020a8;
  &:last-child {
    border-left: none;
  }
`;

const MatchTeamHeader = styled.span`
  font-size: 18px;
  font-weight: 600;
  border-bottom: 2px solid #242020a8;
  display: block;
  padding: 4px 6px;
`;

const MatchTeamList = styled.div`
  display: flex;
  flex-direction: column;
  & span {
    padding: 6px 6px;
  }
`;

const MatchTeamWin = styled.span`
  font-size: 16px;
  display: inline-block;
  & .team-win {
    font-weight: 600;
  }
`;

const Button = styled.button`
  font-size: 16px;
  outline: none;
  padding: 9px 12px;
  min-width: 80px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  border: 1px solid #ccc;
  color: ${(props) => (props.color ? props.color : "#000")};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  & + button {
    margin-left: 10px;
  }
`;

const TeamSelectName = styled.span`
  font-size: 16px;
  margin-right: 8px;
  border-radius: 6px;
  border: 2px solid #ccc;
  padding: 8px 12px;
  cursor: default;
  min-width: 150px;
  text-align: center;
  display: inline-block;
  background-color: ${(props) => (props.isSelect ? "#186fef" : "#fff")};
  color: ${(props) => (props.isSelect ? "#fff" : "#000")};
  transition: 0.1s linear;
  pointer-events: ${(props) => (props.isSelect ? "none" : "auto")};
  &:hover {
    border-color: ${(props) => (!props.isSelect ? " #000" : "#ccc")};
  }
`;

export {
  MatchAction,
  MatchLabel,
  MatchInfo,
  MatchActionContainer,
  MatchActionGroup,
  BackToMatchButton,
  MatchActionRow,
  MatchTeam,
  MatchActionTitle,
  MatchTeamHeader,
  MatchTeamColumn,
  MatchTeamList,
  MatchTeamWin,
  Button,
  TeamSelectName,
};
