import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (submitted) {
    return (
      <main className="pt-20 section-padding">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="container mx-auto max-w-lg text-center py-20"
        >
          <div className="w-16 h-16 border border-primary flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Order Confirmed</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. We'll send a confirmation email shortly.
          </p>
          <Link to="/products" className="btn-primary inline-block">Continue Shopping</Link>
        </motion.div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="pt-20 section-padding">
        <div className="container mx-auto text-center py-20">
          <h1 className="font-display text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link to="/products" className="btn-primary inline-block">Browse Products</Link>
        </div>
      </main>
    );
  }

  const inputClass = "w-full px-4 py-3.5 bg-card border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors";

  return (
    <main className="pt-20 section-padding">
      <div className="container mx-auto max-w-4xl">
        <Link to="/cart" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider mb-10">
          <ArrowLeft size={14} /> Back to Cart
        </Link>
        <h1 className="font-display text-4xl font-bold text-foreground mb-10">
          <span className="italic text-gradient">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <h2 className="font-display font-semibold text-lg mb-4">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name" required onChange={handleChange} className={inputClass} />
              <input name="lastName" placeholder="Last Name" required onChange={handleChange} className={inputClass} />
            </div>
            <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} className={inputClass} />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} className={inputClass} />

            <div className="gold-line my-6" />

            <h2 className="font-display font-semibold text-lg mb-4">Delivery Address</h2>
            <input name="address" placeholder="Street Address" required onChange={handleChange} className={inputClass} />
            <div className="grid grid-cols-2 gap-4">
              <input name="city" placeholder="City" required onChange={handleChange} className={inputClass} />
              <input name="state" placeholder="State" required onChange={handleChange} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input name="zip" placeholder="ZIP Code" required onChange={handleChange} className={inputClass} />
              <input name="country" placeholder="Country" required onChange={handleChange} className={inputClass} />
            </div>
            <button type="submit" className="btn-primary w-full mt-8 inline-flex items-center justify-center gap-2">
              <Lock size={14} /> Place Order — ${totalPrice.toFixed(2)}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Your payment information is secure and encrypted.
            </p>
          </form>

          <div className="lg:col-span-2">
            <h2 className="font-display font-semibold text-lg mb-6">Order Summary</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover bg-card" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-display font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-display font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="gold-line my-6" />
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-primary font-medium">{totalPrice >= 100 ? "Free" : "$9.99"}</span>
              </div>
              <div className="gold-line my-4" />
              <div className="flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${(totalPrice >= 100 ? totalPrice : totalPrice + 9.99).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
