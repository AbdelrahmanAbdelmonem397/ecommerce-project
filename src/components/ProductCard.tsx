import { Link } from "react-router-dom";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group product-card-hover bg-card border border-border overflow-hidden card-shine"
    >
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        {product.originalPrice && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 tracking-wider uppercase">
            Sale
          </span>
        )}
        {/* Wishlist heart */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
          }}
          className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center transition-all duration-300 ${
            wishlisted
              ? "bg-primary text-primary-foreground"
              : "bg-background/70 backdrop-blur-sm text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary"
          }`}
        >
          <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
        </motion.button>
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Link>

      <div className="p-4 md:p-5">
        <p className="text-[10px] text-primary uppercase tracking-[0.25em] mb-2">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display font-semibold text-sm text-foreground hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={10}
              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              className={i < Math.floor(product.rating) ? "text-primary" : "text-border"}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
