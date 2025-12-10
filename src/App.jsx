import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { MyRoutes } from './routers/routes';
import { LoginForm } from './components/auth/LoginForm';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar'; 
import { useThemeStore, useAuthStore } from './store';
import { Device } from "./styles/breakpoints";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { themeStyle } = useThemeStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={themeStyle}>
        <GlobalStyles />
        <ContainerLogin>
            <LoginForm />
        </ContainerLogin>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={themeStyle}>
      <GlobalStyles /> 
      
      <Container className={sidebarOpen ? "active" : ""}>
        
        <section className='contentSidebar'>
          <Sidebar 
            state={sidebarOpen} 
            setState={() => setSidebarOpen(!sidebarOpen)}
          />
        </section>
        
        <section className='contentMenu'>
             <TopBar sidebarState={sidebarOpen} setSidebarState={setSidebarOpen} />
        </section>
        
        <section className='contentRouters'>
          <MyRoutes />
        </section>

        {sidebarOpen && (
            <MobileOverlay onClick={() => setSidebarOpen(false)} />
        )}

      </Container>
    </ThemeProvider>
  );
}


const ContainerLogin = styled.div`
  display: flex; justify-content: center; align-items: center; height: 100vh;
  background-color: ${({ theme }) => theme.bgtotal};
`;

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 1fr;
  height: 100vh;
  position: relative; 
  
  .contentSidebar {
    display: none; 
  }

  &.active .contentSidebar {
    display: block;
    position: fixed; 
    left: 0;
    top: 0;
    z-index: 2000; 
    height: 100vh;
  }

  .contentMenu {
    grid-column: 1;
    grid-row: 1;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .contentRouters {
    grid-column: 1;
    grid-row: 2;
    overflow-y: auto;
    width: 100%;
    padding: 20px;
  }
  
  @media ${Device.tablet} {
    grid-template-columns: 88px 1fr;
    
    &.active {
      grid-template-columns: 260px 1fr;
    }
    
    .contentSidebar {
      display: initial;
      position: static; 
      grid-row: 1 / -1;
    }
    
    &.active .contentSidebar {
      position: static;
    }

    .contentMenu {
      grid-column: 2;
    }

    .contentRouters {
      grid-column: 2;
    }
  }
`;

const MobileOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1500;
    
    @media ${Device.tablet} {
        display: none;
    }
`;