import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Shield, RotateCcw, Gem, Crown, Sparkles } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-image.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const Index = () => {
  const featuredProducts = products.filter((p) => p.featured);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [email, setEmail] = useState("");

  const categoryImages: Record<string, number> = {
    Watches: 0,
    Eyewear: 1,
    Accessories: 2,
    Bags: 3,
  };

  return (
    <main>
      {/* Hero — Full screen cinematic */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src={heroImage}
            alt="LUXE premium lifestyle collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative container mx-auto px-4 md:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-[1px] bg-primary mb-8"
            />
            <p className="text-primary font-body text-sm uppercase tracking-[0.3em] mb-6">
              Collection 2026
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] text-foreground">
              Redefine
              <br />
              <span className="text-gradient italic">Luxury</span>
            </h1>
            <p className="text-muted-foreground mt-8 text-lg max-w-md leading-relaxed font-light">
              Meticulously crafted essentials for those who appreciate the art of refined living.
            </p>
            <div className="flex gap-4 mt-10 flex-wrap">
              <Link to="/products" className="btn-primary inline-flex items-center gap-3">
                Discover <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn-dark inline-flex items-center gap-3">
                Our Craft
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent"
          />
        </motion.div>
      </section>

      {/* Marquee banner */}
      <section className="border-y border-border overflow-hidden py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-8 mx-4">
              {["Free Shipping Over $100", "Handcrafted Quality", "30-Day Returns", "Secure Payments", "Worldwide Delivery"].map((text) => (
                <span key={text + idx} className="flex items-center gap-3 text-sm text-muted-foreground tracking-widest uppercase">
                  <Gem size={12} className="text-primary" />
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">Curated For You</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Featured <span className="italic text-gradient">Collection</span>
            </h2>
            <div className="gold-line w-24 mx-auto mt-6" />
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-dark inline-flex items-center gap-3">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">Browse By</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Shop <span className="italic text-gradient">Categories</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoryImages).map(([cat, productIdx], i) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to="/products"
                  className="group relative block aspect-[3/4] overflow-hidden card-shine"
                >
                  <img
                    src={products[productIdx].image}
                    alt={cat}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl font-bold text-foreground">{cat}</h3>
                    <p className="text-primary text-xs uppercase tracking-widest mt-1 flex items-center gap-2 group-hover:gap-3 transition-all">
                      Explore <ArrowRight size={12} />
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="border-y border-border">
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { icon: Truck, title: "Free Shipping", desc: "Complimentary shipping on orders over $100" },
              { icon: Shield, title: "Secure Payment", desc: "Your transactions are 100% encrypted & protected" },
              { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free 30-day return policy guaranteed" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 border border-primary/30 rounded-none flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-sm tracking-wider uppercase mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">What They Say</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Client <span className="italic text-gradient">Testimonials</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The quality of LUXE products is unmatched. Every piece feels like it was made just for me.",
                name: "Sarah M.",
                role: "Fashion Blogger",
                rating: 5,
              },
              {
                quote: "I've never received so many compliments on accessories before. The leather watch is absolutely stunning.",
                name: "James K.",
                role: "Creative Director",
                rating: 5,
              },
              {
                quote: "From packaging to product quality, every detail screams luxury. My go-to for premium gifts.",
                name: "Elena R.",
                role: "Interior Designer",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border p-8 card-shine"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" className="text-primary" />
                  ))}
                </div>
                <p className="font-display text-foreground italic leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-border p-12 md:p-20 text-center card-shine"
          >
            <Crown size={32} className="text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join the <span className="italic text-gradient">Inner Circle</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Be the first to access exclusive collections, private sales, and curated content.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 bg-secondary border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Index;
