import React, { useState } from 'react';
import { GlobalStyles, MyRoutes } from "./index";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import styled, { ThemeProvider } from 'styled-components';
import { Device } from "./styles/breakpoints";
import { Sidebar } from './components/organismos/sidebar/Sidebar';
import { useThemeStore } from './store/ThemeStore';

export default function App() {
  //const token = localStorage.getItem('token');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {themeStyle} = useThemeStore();
  return (
    <ThemeProvider theme={themeStyle}>
        <Container className={sidebarOpen?"active":""}>
          <GlobalStyles />
          <section className='contentSidebar'><Sidebar state={sidebarOpen} setState={()=>setSidebarOpen(!sidebarOpen)}/></section>
          <section className='contentHamburgerMenu'>Menu</section>
          <section className='contentRouters'><MyRoutes /></section>
        </Container>
    </ThemeProvider>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  //background-color: black;
  .contentSidebar{
    display: none;
    background-color: #1E88E5;
  }
  .contentHamburgerMenu{
    position: absolute;
    background-color: #F57C00;
  }
  .contentRouters{
    //background-color: #131F24;
    grid-column:1;
    width: 100%;
  }
  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr;
    &.active{
      grid-template-columns: 260px 1fr;
    }
    .contentSidebar{
      display: initial;
    }
    .contentHamburgerMenu{
      display: none;
    }
    .contentRouters{
    grid-column:2;
    }
  }

`;