import React, { createContext, useContext, useState, useEffect } from 'react';

// Giả lập Roles: 'guest', 'customer', 'staff', 'admin', 'consultant'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('visage_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [needsHumanAssistance, setNeedsHumanAssistance] = useState(() => {
    try {
      const saved = localStorage.getItem('visage_needs_assistance');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('visage_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('visage_user');
      }
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('visage_needs_assistance', JSON.stringify(needsHumanAssistance));
    } catch (e) {}
  }, [needsHumanAssistance]);

  // Real-time cross-tab sync for assistance alerts
  useEffect(() => {
    const syncAuthStorage = () => {
      try {
        const savedAssist = localStorage.getItem('visage_needs_assistance');
        if (savedAssist !== null) {
          const parsed = JSON.parse(savedAssist);
          setNeedsHumanAssistance(prev => prev !== parsed ? parsed : prev);
        }
      } catch (e) {}
    };

    window.addEventListener('storage', syncAuthStorage);
    const timerId = setInterval(syncAuthStorage, 1000);
    return () => {
      window.removeEventListener('storage', syncAuthStorage);
      clearInterval(timerId);
    };
  }, []);

  const login = (role, name, id) => {
    setUser({ role, name, id });
  };

  const logout = () => {
    setUser(null);
  };

  const triggerHandoff = () => {
    setNeedsHumanAssistance(true);
  };
  
  const resolveHandoff = () => {
    setNeedsHumanAssistance(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, needsHumanAssistance, triggerHandoff, resolveHandoff }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
