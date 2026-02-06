
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  userName: string | null;
  isPro: boolean;
  actionsLeft: number;
  incrementUsage: () => boolean;
  upgradeToPro: () => void;
  resetUsage: () => void;
  login: (email: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const FREE_LIMIT = 3;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('pdf_is_logged_in') === 'true');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('pdf_user_email'));
  const [userName, setUserName] = useState(() => localStorage.getItem('pdf_user_name'));
  const [isPro, setIsPro] = useState(() => localStorage.getItem('pdf_is_pro') === 'true');
  const [usageCount, setUsageCount] = useState(() => {
    const saved = localStorage.getItem('pdf_usage_count');
    const date = localStorage.getItem('pdf_usage_date');
    const today = new Date().toDateString();
    
    if (date !== today) {
      return 0;
    }
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('pdf_is_logged_in', isLoggedIn.toString());
    localStorage.setItem('pdf_is_pro', isPro.toString());
    if (userEmail) localStorage.setItem('pdf_user_email', userEmail);
    else localStorage.removeItem('pdf_user_email');
    if (userName) localStorage.setItem('pdf_user_name', userName);
    else localStorage.removeItem('pdf_user_name');
  }, [isLoggedIn, isPro, userEmail, userName]);

  useEffect(() => {
    localStorage.setItem('pdf_usage_count', usageCount.toString());
    localStorage.setItem('pdf_usage_date', new Date().toDateString());
  }, [usageCount]);

  const incrementUsage = (): boolean => {
    if (isPro) return true;
    if (usageCount >= FREE_LIMIT) return false;
    setUsageCount(prev => prev + 1);
    return true;
  };

  const upgradeToPro = () => {
    setIsPro(true);
  };

  const login = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    // For demo, if no name stored, use email part
    if (!userName) setUserName(email.split('@')[0]);
  };

  const signup = (email: string, name: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserName(name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserName(null);
    setIsPro(false);
    setUsageCount(0);
    localStorage.clear();
  };

  const resetUsage = () => {
    setUsageCount(0);
  };

  const actionsLeft = isPro ? Infinity : Math.max(0, FREE_LIMIT - usageCount);

  return (
    <UserContext.Provider value={{ 
      isLoggedIn, 
      userEmail, 
      userName,
      isPro, 
      actionsLeft, 
      incrementUsage, 
      upgradeToPro, 
      resetUsage,
      login,
      signup,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
