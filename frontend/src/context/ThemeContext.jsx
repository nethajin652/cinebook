import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'rose',
    name: 'Rose',
    description: 'Pink • Magenta • Rose',
    primaryLabel: 'Pink',
    secondaryLabel: 'Magenta',
    accentLabel: 'Rose',
    colors: {
      primary: '#f43f5e',
      secondary: '#db2777',
      accent: '#fb7185'
    },
    previewGradient: 'from-[#f43f5e] via-[#db2777] to-[#fb7185]'
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    description: 'Blue • Cyan • Light Blue',
    primaryLabel: 'Blue',
    secondaryLabel: 'Cyan',
    accentLabel: 'Light Blue',
    colors: {
      primary: '#2563eb',
      secondary: '#06b6d4',
      accent: '#38bdf8'
    },
    previewGradient: 'from-[#2563eb] via-[#06b6d4] to-[#38bdf8]'
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Purple • Violet • Lavender',
    primaryLabel: 'Purple',
    secondaryLabel: 'Violet',
    accentLabel: 'Lavender',
    colors: {
      primary: '#9333ea',
      secondary: '#8b5cf6',
      accent: '#d8b4fe'
    },
    previewGradient: 'from-[#9333ea] via-[#8b5cf6] to-[#d8b4fe]'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Emerald Green • Teal • Mint',
    primaryLabel: 'Emerald Green',
    secondaryLabel: 'Teal',
    accentLabel: 'Mint',
    colors: {
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#34d399'
    },
    previewGradient: 'from-[#059669] via-[#0d9488] to-[#34d399]'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Orange • Red • Gold',
    primaryLabel: 'Orange',
    secondaryLabel: 'Red',
    accentLabel: 'Yellow/Gold',
    colors: {
      primary: '#ea580c',
      secondary: '#dc2626',
      accent: '#facc15'
    },
    previewGradient: 'from-[#ea580c] via-[#dc2626] to-[#facc15]'
  },
  {
    id: 'cyber',
    name: 'Cyber',
    description: 'Electric Blue • Cyan • Neon Purple',
    primaryLabel: 'Electric Blue',
    secondaryLabel: 'Cyan',
    accentLabel: 'Neon Purple',
    colors: {
      primary: '#0066ff',
      secondary: '#00f0ff',
      accent: '#b026ff'
    },
    previewGradient: 'from-[#0066ff] via-[#00f0ff] to-[#b026ff]'
  }
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('cinebook_theme');
      return savedTheme && THEMES.some(t => t.id === savedTheme) ? savedTheme : 'rose';
    } catch {
      return 'rose';
    }
  });

  const applyTheme = (themeId) => {
    setCurrentTheme(themeId);
    try {
      localStorage.setItem('cinebook_theme', themeId);
    } catch (e) {
      console.warn('Failed to save theme in localStorage', e);
    }
    document.documentElement.setAttribute('data-theme', themeId);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const activeThemeObject = THEMES.find(t => t.id === currentTheme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ currentTheme, activeTheme: activeThemeObject, changeTheme: applyTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
