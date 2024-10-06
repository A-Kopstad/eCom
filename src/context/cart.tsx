import { createContext, useContext, useState, ReactNode } from 'react';

// Typescript defines
 interface CartItem {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  image: { url: string; alt: string };
}

 interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  totalItems: number;
  totalAmount: number;
  resetCart: () => void;
}



const ShoppingCartContext = createContext<CartContextType | undefined>(undefined);
// Custom hook to use the ShoppingCartContext under
export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
};

// ShoppingCartProvider component 
export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add item to cart or increment quantity if already in cart
  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Remove item from cart or decrease quantity
  const removeItem = (itemId: string) => {
    setItems(prevItems =>
      prevItems
        .map(item => 
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Clear all items from the cart
  const resetCart = () => {
    setItems([]);
  };

  // total items in the cart
  const totalItems = items.reduce((count, item) => count + item.quantity, 0);

  // total price of items in the cart
  const totalAmount = items.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems: items,
        addItem,
        removeItem,
        totalItems,
        totalAmount,
        resetCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
