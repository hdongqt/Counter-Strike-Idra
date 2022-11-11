import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import SideBar from "../components/SideBar/SideBar";
import { User, UserDetail } from "./../containers/User";
import NotFound from "../components/NotFound/NotFound";

const UserContainer = styled.div`
  padding-left: 200px;
`;
const UserRoutes = () => {
  return (
    <div>
      <SideBar />
      <UserContainer>
        <Routes>
          <Route path="" element={<User />}></Route>
          <Route path=":id" element={<UserDetail />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContainer>
    </div>
  );
};

export default UserRoutes;
