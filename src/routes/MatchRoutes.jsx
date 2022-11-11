import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import SideBar from "../components/SideBar/SideBar";
import { Match, MatchCreate, MatchDetail } from "./../containers/Match";
import NotFound from "../components/NotFound/NotFound";

const MatchContainer = styled.div`
  padding-left: 200px;
`;
const MatchRoutes = () => {
  return (
    <div>
      <SideBar />
      <MatchContainer>
        <Routes>
          <Route path="" element={<Match />}></Route>
          <Route path="create" element={<MatchCreate />}></Route>
          <Route path=":id" element={<MatchDetail />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MatchContainer>
    </div>
  );
};

export default MatchRoutes;
