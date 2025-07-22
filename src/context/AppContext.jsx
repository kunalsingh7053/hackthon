import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser)
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    else
      localStorage.removeItem('currentUser');
  }, [currentUser]);

  const updateProfilePhoto = (newPhoto) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, photo: newPhoto };
      setCurrentUser(updatedUser);
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.email === currentUser.email ? updatedUser : u
        )
      );
    }
  };

  const updateProfile = ({ username, email }) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, username, email };
      setCurrentUser(updatedUser);
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.email === currentUser.email ? updatedUser : u
        )
      );
    }
  };

  const logout = () => setCurrentUser(null);

  const registerUser = (userData) => {
    const exists = users.some(u => u.email === userData.email);
    if (exists) return false;
    setUsers([...users, userData]);
    return true;
  };

  return (
    <AppContext.Provider value={{
      users,
      currentUser,
      setCurrentUser,
      register: registerUser,
      updateProfilePhoto,
      updateProfile,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
