import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import StepFirst from "./../../components/StepForm/StepFirst";
import StepLast from "./../../components/StepForm/StepLast";

const MatchCreateStyle = styled.div`
  padding: 50px 100px 0px 100px;
`;
const MatchCreateTitle = styled.h2`
  margin-bottom: 20px;
`;
const MatchCreate = () => {
  const { stepForm } = useSelector((state) => state.matchFormReducer.formCreateMatch);
  return (
    <MatchCreateStyle>
      <MatchCreateTitle>Create Match</MatchCreateTitle>
      <div>{stepForm === 1 ? <StepFirst /> : <StepLast />}</div>
    </MatchCreateStyle>
  );
};

export default MatchCreate;
