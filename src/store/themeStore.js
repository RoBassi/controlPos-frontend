import { create } from 'zustand';
import { persist } from 'zustand/middleware'; 
import { Light, Dark } from '../styles/theme';

export const useThemeStore = create(
  persist(
    (set, get) => ({
      // Estado inicial:
      theme: 'dark',
      themeStyle: Dark,

      // Cambio
      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'light' ? 'dark' : 'light';
        const newStyle = newTheme === 'light' ? Light : Dark;

        set({ 
          theme: newTheme, 
          themeStyle: newStyle 
        });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);