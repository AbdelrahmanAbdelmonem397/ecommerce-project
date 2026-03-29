import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-20 section-padding">
        <div className="container mx-auto text-center py-20">
          <ShoppingBag size={64} strokeWidth={1} className="mx-auto text-muted-foreground mb-6" />
          <h1 className="font-display text-3xl font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn-primary inline-block">Start Shopping</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 section-padding">
      <div className="container mx-auto max-w-4xl">
        <Link to="/products" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider mb-10">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
        <h1 className="font-display text-4xl font-bold text-foreground mb-10">Shopping <span className="italic text-gradient">Cart</span></h1>

        {/* Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
          <span className="col-span-6">Product</span>
          <span className="col-span-2 text-center">Quantity</span>
          <span className="col-span-2 text-center">Price</span>
          <span className="col-span-2 text-right">Total</span>
        </div>

        <div className="divide-y divide-border">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center"
            >
              <div className="md:col-span-6 flex gap-4">
                <Link to={`/product/${item.product.id}`}>
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover bg-card" />
                </Link>
                <div className="flex flex-col justify-center">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-display font-semibold text-foreground hover:text-primary transition-colors">{item.product.name}</h3>
                  </Link>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{item.product.category}</p>
                </div>
              </div>

              <div className="md:col-span-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <Minus size={12} />
                </button>
                <span className="font-medium w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  <Plus size={12} />
                </button>
              </div>

              <div className="md:col-span-2 text-center">
                <span className="font-display font-bold">${item.product.price.toFixed(2)}</span>
              </div>

              <div className="md:col-span-2 flex items-center justify-end gap-4">
                <span className="font-display font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-10 border-t border-border pt-10">
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-8">
              <span className="text-muted-foreground uppercase tracking-wider text-xs">Subtotal</span>
              <span className="font-display text-3xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Shipping & taxes calculated at checkout</p>
            <Link to="/checkout" className="btn-primary mt-4">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
