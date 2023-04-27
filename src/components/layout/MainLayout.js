import React from "react";
import MainNavigation from "./navigation/MainNavigation";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Content = styled.div`
  margin: 10px 15px;
  padding: 5px;
`;

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainNavigation />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default MainLayout;
