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

  const defaultProducts = [
    {
      id: 'p1',
      title: 'Youthiapa Black Hoodie',
      price: 1299,
      description: 'Premium cotton hoodie for winters',
      image: 'https://example.com/hoodie.jpg'
    },
    {
      id: 'p2',
      title: 'Youthiapa White T-Shirt',
      price: 799,
      description: 'Comfortable cotton t-shirt',
      image: 'https://example.com/tshirt.jpg'
    },
    {
      id: 'p3',
      title: 'Youthiapa Cap',
      price: 499,
      description: 'Stylish cap with Youthiapa logo',
      image: 'https://example.com/cap.jpg'
    }
  ];

  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : defaultProducts;
  });

  // ✅ First time app load hone par localStorage me default products save karo (agar nahi hain)
  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (!stored) {
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  }, []);

  // sync localStorage jab bhi products, users, currentUser change ho
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

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

  const addProduct = (product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, ...updatedData } : p
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{
      users,
      currentUser,
      products,
      setCurrentUser,
      register: registerUser,
      updateProfilePhoto,
      updateProfile,
      logout,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
