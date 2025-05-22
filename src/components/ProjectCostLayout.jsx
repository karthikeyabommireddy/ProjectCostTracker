import React from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { clearUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import './ProjectCostLayout.css';
import ItemsManager from "./ItemsManager";
import OtherCostsManager from "./OtherCostsManager";
import ProjectTotal from "./ProjectTotal";

export default function ProjectCostLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <Wrapper className="gradient-background" >
      {/* Navbar */}
      <Navbar>
        <Title>📊 Dashboard</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Navbar>

      {/* Main Grid */}
      <MainGrid>
        <GridItem colSpan={2} rowSpan={3}>
          <ItemsManager />
        </GridItem>
        <GridItem colSpan={2} rowSpan={3}>
          <OtherCostsManager />
        </GridItem>
        <GridItem colSpan={4} rowSpan={2}>
          <ProjectTotal />
        </GridItem>
      </MainGrid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 20px;
  margin: 0;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1d4ed8;
  color: #fff;
  padding: 2px 24px;

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background: #ef4444;
  color: #fff;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #dc2626;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, auto);
  gap: 40px;
  flex: 1;
  padding: 15px 30px 15px 30px;
`;

const GridItem = styled.div`
  grid-column: span ${(props) => props.colSpan};
  grid-row: span ${(props) => props.rowSpan};
  background: lightgray;
  padding: 20px;
  border-radius: 12px;
  overflow: hidden;
`;

