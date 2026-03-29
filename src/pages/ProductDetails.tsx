import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Star, ShoppingBag, ArrowLeft, Check, Truck, RotateCcw, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const wishlisted = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <main className="pt-20 section-padding text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="btn-primary mt-4 inline-block">Back to Shop</Link>
      </main>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="pt-20">
      <section className="section-padding">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-10 uppercase tracking-wider">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square overflow-hidden bg-card card-shine"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{product.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">{product.name}</h1>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className={i < Math.floor(product.rating) ? "text-primary" : "text-border"}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <span className="font-display text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                    <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <div className="gold-line my-8" />

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <ul className="mt-6 space-y-3">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-3 text-sm text-foreground">
                    <Check size={14} className="text-primary flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Quantity + Add to Cart */}
              <div className="flex gap-4 mt-10">
                <div className="flex border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center font-medium border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) addToCart(product);
                  }}
                  className="btn-primary flex-1 inline-flex items-center justify-center gap-3"
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                  className={`w-12 h-12 border flex items-center justify-center transition-all duration-300 ${
                    wishlisted
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
                </motion.button>
              </div>

              {/* Trust */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-border">
                {[
                  { icon: Truck, label: "Free Shipping" },
                  { icon: RotateCcw, label: "30-Day Returns" },
                  { icon: Shield, label: "2-Year Warranty" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <Icon size={16} className="text-primary mx-auto mb-1" />
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24 md:mt-32">
              <div className="text-center mb-12">
                <p className="text-primary text-xs uppercase tracking-[0.4em] mb-3">Discover More</p>
                <h2 className="font-display text-3xl font-bold text-foreground">
                  You May Also <span className="italic text-gradient">Like</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
