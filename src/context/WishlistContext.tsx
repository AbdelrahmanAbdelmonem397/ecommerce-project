import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  totalWishlist: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const saveToStorage = (items: Product[]) => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  };

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      const newList = [...prev, product];
      saveToStorage(newList);
      return newList;
    });
    toast.success(`${product.name} added to wishlist`, { duration: 2000 });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist((prev) => {
      const newList = prev.filter((p) => p.id !== productId);
      saveToStorage(newList);
      return newList;
    });
    toast.info("Removed from wishlist", { duration: 1500 });
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => wishlist.some((p) => p.id === productId),
    [wishlist]
  );

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, totalWishlist: wishlist.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
