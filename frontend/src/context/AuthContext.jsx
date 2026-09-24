import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storageService.init();
    const stored = storageService.getCurrentUser();
    if (stored) {
      setCurrentUser(stored);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = storageService.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      throw new Error("Invalid email or password. Try demo accounts!");
    }
    const safeUser = { ...user };
    storageService.setCurrentUser(safeUser);
    setCurrentUser(safeUser);
    return safeUser;
  };

  const signup = (userData) => {
    const users = storageService.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      throw new Error("An account with this email already exists.");
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      password: userData.password,
      role: 'user',
      createdAt: new Date().toISOString()
    };
    storageService.saveUser(newUser);
    storageService.setCurrentUser(newUser);
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    storageService.setCurrentUser(null);
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      ...updatedFields
    };
    storageService.updateUser(updated);
    setCurrentUser(updated);
    return updated;
  };

  const quickDemoLogin = (role = 'user') => {
    if (role === 'admin') {
      return login('admin@cinebook.com', 'adminpassword');
    }
    return login('demo@cinebook.com', 'password123');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      login,
      signup,
      logout,
      updateProfile,
      quickDemoLogin,
      isAdmin: currentUser?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
