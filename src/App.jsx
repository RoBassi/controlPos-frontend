import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { MyRoutes } from './routers/routes';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar'; 
import { useThemeStore, useAuthStore } from './store';
import { Device } from "./styles/breakpoints";
import SetupPage from './pages/SetupPage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { themeStyle } = useThemeStore();
  const { isAuthenticated, checkSystem } = useAuthStore();
  
  const [systemChecked, setSystemChecked] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    const initApp = async () => {
        const initialized = await checkSystem();
        setNeedsSetup(!initialized);
        setSystemChecked(true);
    };
    initApp();
  }, []);

  if (!systemChecked) return null; 

  // Setup inicial 
  if (needsSetup) {
      return (
        <ThemeProvider theme={themeStyle}>
            <GlobalStyles />
            <SetupPage />
        </ThemeProvider>
      );
  }

  return (
    <ThemeProvider theme={themeStyle}>
      <GlobalStyles /> 
      
      {isAuthenticated ? (
        // User logueado
        <Container className={sidebarOpen ? "active" : ""}>
            <section className='contentSidebar'>
              <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
            </section>
            
            <section className='contentMenu'>
                <TopBar />
            </section>
            
            <section className='contentRouters'>
              <MyRoutes />
            </section>
        </Container>
      ) : (
        // Login o resetPass
        <MyRoutes />
      )}

    </ThemeProvider>
  );
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 88px 1fr;
  grid-template-rows: 70px 1fr;
  height: 100vh;
  transition: all 0.3s;

  &.active {
    grid-template-columns: 250px 1fr;
  }

  .contentSidebar { grid-column: 1; grid-row: 1 / -1; }
  .contentMenu { grid-column: 2; grid-row: 1; }
  .contentRouters { grid-column: 2; grid-row: 2; overflow-y: auto; padding: 20px; }

`;