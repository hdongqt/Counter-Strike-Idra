import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header/Header";
import NotFound from "../components/NotFound/NotFound";
import MatchRoutes from "./MatchRoutes";
import UserRoutes from "./UserRoutes";

const Main = styled.main`
  margin-top: 50px;
  width: 100%;
  height: 100%;
`;

const MainRoutes = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Navigate to="/matchs" replace />}></Route>
          <Route path="/matchs/*" element={<MatchRoutes />}></Route>
          <Route path="/users/*" element={<UserRoutes />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </>
  );
};

export default MainRoutes;
