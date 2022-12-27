import React, { useContext } from "react";

const LocalStateContext = React.createContext({});

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = React.useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);

  const closeCart = () => setCartOpen(false);

  const openCart = () => setCartOpen(true);

  const value = {
    cartOpen,
    toggleCart,
    closeCart,
    openCart,
  };

  return (
    <LocalStateContext.Provider value={value}>
      {children}
    </LocalStateContext.Provider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
