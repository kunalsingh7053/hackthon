import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Default products list
  const defaultProducts = [
  { id: 'p28', title: 'YOUTHIAPA JACKET ', price: 1999.00, type: 'cloths', size: 'M', description: 'Crafted for comfort & style, the Youthiapa Jacket blends modern minimalism with streetwear edge. Elevate your everyday look.. ', image: '/img/jacket.png' },
  { id: 'p4', title: 'Ajnabee Magic Mug', price: 475, type: 'mug', description: 'We all know that somethings wont last forever!!! Presenting the Official Ajnabee merchandise.', image: 'https://youthiapa.com/cdn/shop/products/Magic-Mag.gif?v=1573304322' },
  { id: 'p21', title: 'Mummy,s Ok Edition Tshirt', price: 599, type: 'tshirt', size: 'M', description: 'Eco-friendly tote bag', image: 'https://youthiapa.com/cdn/shop/products/OKNavyBlue.jpg?v=1609071304&width=720' },
  { id: 'p1', title: 'Titu Mama Chai Edition Tshirt', price: 649, type: 'tshirt', size: 'M', description: 'Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters', image: 'https://youthiapa.com/cdn/shop/products/Chai.jpg?v=1609070749&width=480' },
  { id: 'p2', title: 'StyleStatment', price: 3299, type: 'cloths', size: 'M', description: 'Sleek, fearless and iconic — discover the nendrop inspired by bold individuality.', image: '/public/img/h-1.webp' },
  { id: 'p3', title: 'Guru-Ji Pranam Edition - Olive T-shirt', price: 549.00, type: 'tshirt', size: 'M', description: 'A timeless essential crafted from premium cotton for a soft, breathable feel. Effortlessly pairs with jeans, shorts, or joggers — perfect for everyday wear.', image: 'https://youthiapa.com/cdn/shop/products/gurujishirtmockup.jpg?v=1638198169&width=720' },
  { id: 'p5', title: 'Janki Ji Saste Avengers Mug', price: 475, type: 'mug', description: 'Never say yes to your favourite beverage when this classic Janki Ji Saste Avengers itself can express your intention.', image: 'https://youthiapa.com/cdn/shop/products/Janki_Ji_Saste_Avengers.jpg?v=1564392639&width=720' },
  { id: 'p6', title: 'Babloo Ji Saste Avengers Mug', price: 475, type: 'mug', description: 'Never say yes to your favourite beverage when this classic Babloo Ji Saste Avengers itself can express your intention.', image: 'https://youthiapa.com/cdn/shop/products/Babloo_Ji_Saste_Avengers.jpg?v=1564392020&width=720' },
  { id: 'p7', title: 'Saste Avengers - Mug', price: 475, type: 'mug', description: 'Never say yes to your favourite beverage when this classic Saste Avengers itself can express your intention.', image: 'https://youthiapa.com/cdn/shop/products/sasteavengersmug.jpg?v=1618409076&width=720' },
  { id: 'p8', title: 'Titu Mama Saste Avengers Mug T-shirt', price: 425, type: 'tshirt', size: 'M', description: 'Never say yes to your favourite beverage when this classic Titu Mama Saste Avengers itself can express your intention.', image: 'https://youthiapa.com/cdn/shop/products/Titu_Mama_Saste_Avengers.jpg?v=1564393617' },
  { id: 'p9', title: 'The BBKV Edition Tshirt', price: 549.00, type: 'tshirt', size: 'M', description: 'Celebrating 4 years of Youthiapa with this limited edition ‘The BB Ki Vines’ tee signed digitally by Bhuvan Bam.', image: 'https://youthiapa.com/cdn/shop/products/BBKV-BlackTee.jpg?v=1616246320&width=720' },
  { id: 'p10', title: 'Sameer Fudd*** Oh Yeah Edition Mug', price: 425.00, type: 'mug', description: 'Sameer’s grandfather uses this mug for reasons not advisable! Have this classic black green mug only for drinking purposes.', image: 'https://youthiapa.com/cdn/shop/products/oh_yeah.jpg?v=1498636095' },
  { id: 'p11', title: 'The BBKV Comic Mug', price: 425.00, type: 'mug', description: 'Never say yes to your favourite beverage when this classic Sameer Saste Avengers itself can express your intention.', image: 'https://youthiapa.com/cdn/shop/products/image.png?v=1666679284' },
  { id: 'p12', title: 'Geared Cargo', price: 2499, type: 'cargo', size: 'M', description: 'Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters', image: 'https://youthiapa.com/cdn/shop/files/12_1.jpg?v=1749902358&width=720' },
  { id: 'p13', title: 'Geared Cargo', price: 2499, type: 'cargo', size: 'M', description: 'Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters', image: 'https://youthiapa.com/cdn/shop/files/6_6.jpg?v=1749405435' },
  { id: 'p14', title: 'VTC Cargo', price: 2499, type: 'cargo', size: 'M', description: 'Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters', image: 'https://youthiapa.com/cdn/shop/files/7_1.jpg?v=1749401298&width=720' },
  { id: 'p15', title: 'Dooms Day Tshirt', price: 1999, type: 'tshirt', size: 'M', description: 'Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters Premium cotton hoodie for winters', image: 'https://youthiapa.com/cdn/shop/files/10_fa91bb15-3fd1-47b6-be6f-5225e33d30f6.jpg?v=1749379522&width=720' },
  { id: 'p16', title: 'Youthiapa White TShirt', price: 799, type: 'tshirt', size: 'M', description: 'Comfortable cotton t-shirt', image: 'https://youthiapa.com/cdn/shop/products/SahiKhelGaya_9443cd2e-bd41-4482-90fd-4d3d76b7bf6b.jpg?v=1609071381&width=480' },
  { id: 'p17', title: 'Bhuvan Bam Black Tshirt', price: 499, type: 'tshirt', size: 'M', description: 'Stylish cap with Youthiapa logo', image: 'https://youthiapa.com/cdn/shop/products/4Q5A6794_copy.jpg?v=1615893208&width=480' },
  { id: 'p18', title: 'OH YEAH T-shirt', price: 299, type: 'tshirt', size: 'M', description: 'Ceramic mug with Youthiapa print', image: 'https://youthiapa.com/cdn/shop/products/OhYeah_aa2a5021-e41c-4f1e-8516-d4b8db262d63.jpg?v=1609071282&width=480' },
  { id: 'p19', title: 'RELAX IGOTIT! Tshirt', price: 199, type: 'tshirt', size: 'M', description: 'Cool sticker pack', image: 'https://youthiapa.com/cdn/shop/products/Relax_1227e05d-f654-4317-9fc1-19424fa0c4a1.jpg?v=1609071362&width=480' },
  { id: 'p20', title: 'GURUJI PARNAM Tshirt', price: 599, type: 'tshirt', size: 'M', description: 'Eco-friendly tote bag', image: 'https://youthiapa.com/cdn/shop/products/GuruJi.jpg?v=1609070768&width=480' },
  { id: 'p22', title: 'The Tola Edition Tshirt', price: 599, type: 'tshirt', size: 'M', description: 'Eco-friendly tote bag', image: 'https://youthiapa.com/cdn/shop/products/TolaYellow.jpg?v=1609071489' },
  { id: 'p23', title: 'BBteers Key Chain(Set of 3)', price: 299, type: 'keychain', description: 'Eco-friendly tote bag', image: 'https://youthiapa.com/cdn/shop/products/keychain.jpg?v=1556523300&width=720' },
  { id: 'p24', title: 'Young by Youthiapa Hoodie', price: 1299.00, type: 'hoodie', size: 'M', description: 'Stay cozy and stylish with the Youthiapa Black Hoodie, crafted from premium quality cotton-blend fabric for ultimate comfort.', image: 'https://youthiapa.com/cdn/shop/products/YMLogo.jpg?v=1609253426' },
  { id: 'p25', title: 'The Hustle-Bhasad Hoodie 21', price: 1299.00, type: 'hoodie', size: 'M', description: 'Stay cozy and stylish with the Youthiapa Black Hoodie, crafted from premium quality cotton-blend fabric for ultimate comfort.', image: 'https://youthiapa.com/cdn/shop/products/HustleRed_2af2143e-ebcb-4dfb-8c49-c4d13fbb3de2.jpg?v=1609252983&width=720' },
  { id: 'p26', title: 'DTYDHTB Hoodie', price: 1299.00, type: 'hoodie', size: 'M', description: 'Stay cozy and stylish with the Youthiapa Black Hoodie, crafted from premium quality cotton-blend fabric for ultimate comfort.', image: 'https://youthiapa.com/cdn/shop/products/DTYDHTB-FINAL.jpg?v=1641388330&width=720' },
  { id: 'p27', title: 'DTYDHTB Hoodie', price: 1299.00, type: 'hoodie', size: 'M', description: 'Stay cozy and stylish with the Youthiapa Black Hoodie, crafted from premium quality cotton-blend fabric for ultimate comfort.', image: 'https://youthiapa.com/cdn/shop/products/dhindorahoodie-1.jpg?v=1635767530&width=720' },
  { id: 'p29', title: 'The Titu Face Mask 2.0', price: 300, type: 'mask', description: 'Introducing Youthiapa Face Mask for ideal protection during these tough times. ', image: 'https://youthiapa.com/cdn/shop/products/TituMama_8c7f8806-4540-436b-93d7-2fcf7dd9879f.jpg?v=1609735456&width=720' },
  { id: 'p30', title: 'Oh Yeah Mask 2.0', price: 280, type: 'mask', description: 'Introducing Youthiapa Face Mask for ideal protection during these tough times. ', image: 'https://youthiapa.com/cdn/shop/products/OhYeah_1bad3939-d33b-47ea-9531-05824748533c.jpg?v=1609735499&width=720' },
  { id: 'p31', title: 'The Hustle Mask 2.0', price: 280, type: 'mask', description: 'Introducing Youthiapa Face Mask for ideal protection during these tough times. ', image: 'https://youthiapa.com/cdn/shop/products/hustlemask.jpg?v=1630741972&width=720' },
  { id: 'p32', title: 'The Ultimate Youthiapa Mask 2.0', price: 280, type: 'mask', description: 'Introducing Youthiapa Face Mask for ideal protection during these tough times. ', image: 'https://youthiapa.com/cdn/shop/products/UltimateYouthiapa.jpg?v=1609735462&width=720' },
  { id: 'p33', title: 'b(art)terfly Tshirt ', price: 1999, type: 'tshirt', size: 'M', description: 'Introducing Youthiapa Face Mask for ideal protection during these tough times. ', image: 'https://youthiapa.com/cdn/shop/files/C5CF2A3E-A399-425A-B0CB-59A33ACED6B3.png?v=1751310591&width=720' },
  { id: 'p34', title: 'Garden By Eden Tshirt', price: 1999, type: 'tshirt', size: 'M', description: 'Introducing Youthiapa Face Mask for ideal protection during these tough times. ', image: 'https://youthiapa.com/cdn/shop/files/4_13.jpg?v=1749546919&width=720' },
];


  // State initialization with localStorage fallback
  const [products, setProducts] = useState(() =>
    JSON.parse(localStorage.getItem('products')) || defaultProducts
  );
  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem('users')) || []
  );
  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem('currentUser')) || null
  );

  // Load default products on first app load
  useEffect(() => {
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      setProducts(defaultProducts);
    }
  }, []);

  // Sync changes to localStorage
  useEffect(() => localStorage.setItem('products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('users', JSON.stringify(users)), [users]);
  useEffect(() => {
    if (currentUser) localStorage.setItem('currentUser', JSON.stringify(currentUser));
    else localStorage.removeItem('currentUser');
  }, [currentUser]);

  // ✅ Auth & profile methods
  const registerUser = (userData) => {
    if (users.some(u => u.email === userData.email)) return false;
    const newUser = { ...userData, cart: [] };
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  const updateProfilePhoto = (newPhoto) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, photo: newPhoto };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.email === currentUser.email ? updatedUser : u));
    }
  };

  const updateProfile = ({ username, email }) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, username, email };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.email === currentUser.email ? updatedUser : u));
    }
  };

  const logout = () => setCurrentUser(null);

  // ✅ Products management
  const addProduct = (product) => setProducts(prev => [...prev, product]);
  const updateProduct = (id, data) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  const deleteProduct = (id) =>
    setProducts(prev => prev.filter(p => p.id !== id));

  // ✅ Cart management
  const addToCart = (productId, size) => {
    if (!currentUser) {
      console.warn('Please login to add to cart');
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
      console.warn('Product not found');
      return;
    }

    setCurrentUser(prevUser => {
      if (!prevUser) return prevUser; // extra safety

      // Check if item with same productId & size exists
      const existingItem = prevUser.cart?.find(
        item => item.id === productId && item.size === size
      );

      let updatedCart;
      if (existingItem) {
        // Increase quantity if already in cart
        updatedCart = prevUser.cart.map(item =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item
        const newItem = {
          ...product,
          size,
          quantity: 1
        };
        updatedCart = [...(prevUser.cart || []), newItem];
      }

      const updatedUser = { ...prevUser, cart: updatedCart };

      // Also update in users list
      setUsers(users =>
        users.map(u => u.email === prevUser.email ? updatedUser : u)
      );

      return updatedUser;
    });
  };

  const removeFromCart = (productId, size) => {
    if (!currentUser) return;

    setCurrentUser(prevUser => {
      const updatedCart = prevUser.cart.filter(
        item => !(item.id === productId && item.size === size)
      );
      const updatedUser = { ...prevUser, cart: updatedCart };

      setUsers(users =>
        users.map(u => u.email === prevUser.email ? updatedUser : u)
      );

      return updatedUser;
    });
  };

  const changeQuantity = (productId, size, amount) => {
    if (!currentUser) return;

    setCurrentUser(prevUser => {
      const updatedCart = prevUser.cart.map(item => {
        if (item.id === productId && item.size === size) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      });
      const updatedUser = { ...prevUser, cart: updatedCart };

      setUsers(users =>
        users.map(u => u.email === prevUser.email ? updatedUser : u)
      );

      return updatedUser;
    });
  };

  // ✅ Context provider
  return (
    <AppContext.Provider value={{
      products, setProducts,
      users, currentUser, setCurrentUser,
      register: registerUser, updateProfilePhoto, updateProfile, logout,
      addProduct, updateProduct, deleteProduct,
      addToCart, removeFromCart, changeQuantity
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
