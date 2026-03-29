import { useWishlist } from "@/context/WishlistContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <main className="pt-20">
      <section className="border-b border-border py-16 md:py-24 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">Your Favorites</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              Wish<span className="italic text-gradient">list</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Heart size={48} strokeWidth={1} className="text-muted-foreground mx-auto mb-4" />
              <p className="font-display text-xl text-foreground mb-2">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground mb-8">
                Browse our collection and save your favorite items.
              </p>
              <Link to="/products" className="btn-primary inline-block">
                Explore Products
              </Link>
            </motion.div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-8">
                {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {wishlist.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Wishlist;
