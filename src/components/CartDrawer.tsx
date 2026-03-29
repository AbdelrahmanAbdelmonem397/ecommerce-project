import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-lg font-bold">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <ShoppingBag size={48} strokeWidth={1} />
                <p className="text-sm">Your cart is empty</p>
                <button onClick={() => setIsCartOpen(false)}>
                  <Link to="/products" className="btn-primary text-sm">
                    Continue Shopping
                  </Link>
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex gap-4 p-3 border border-border"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover bg-card"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-display font-semibold truncate">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          ${item.product.price.toFixed(2)} × {item.quantity} = <span className="text-primary font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-7 h-7 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="border-t border-border p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground uppercase tracking-wider text-xs">Subtotal</span>
                    <span className="font-display font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary block text-center w-full"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full text-center text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
