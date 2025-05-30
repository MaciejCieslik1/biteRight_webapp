import React, { createContext, useContext, useState, useEffect } from 'react';

const PreferencesContext = createContext();

export const PreferencesProvider = ({ children }) => {
  const [prefs, setPrefs] = useState({
    language: 'en',
    darkmode: false,
    font: 'system-ui',
    notifications: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const fetchPreferences = async () => {
      try {
        const res = await fetch('http://localhost:8080/userPreferences/findUserPreferences', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (!res.ok) throw new Error('Failed to fetch preferences');
        const data = await res.json();
        setPrefs(data);
      } catch (err) {
        console.error('Failed to load preferences:', err);
      }
    };

    fetchPreferences();
  }, []);

  useEffect(() => {
    const root = document.body;
    root.style.fontFamily = prefs.font || 'system-ui';
    if (prefs.darkmode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }, [prefs.font, prefs.darkmode]);

  return (
    <PreferencesContext.Provider value={{ prefs, setPrefs }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);
