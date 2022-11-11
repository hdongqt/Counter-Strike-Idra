import { Link } from "react-router-dom";
import styled from "styled-components";
const Match = styled.div`
  padding: 30px 20px;
  & > h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const MatchContainer = styled.div`
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
`;

const MatchAction = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`;
const MatchSearch = styled.input`
  outline: none;
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 8px 8px;
  min-width: 300px;
  margin-right: 6px;
  border-radius: 4px;
`;
const MatchButtonCreate = styled(Link)`
  font-size: 16px;
  outline: none;
  padding: 8px 12px;
  min-width: 80px;
  background-color: #0065f7de;
  border: 1px solid #ccc;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s linear;
  text-decoration: none;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`;

export { Match, MatchContainer, MatchAction, MatchSearch, MatchButtonCreate };
