import { motion } from "framer-motion";
import { Users, Award, Heart, Globe, Gem } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <div ref={ref} className="font-display text-4xl md:text-5xl font-bold text-gradient">{count.toLocaleString()}{suffix}</div>;
};

const About = () => {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="border-b border-border py-20 md:py-32 px-4 md:px-8">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-6">Our Story</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Crafting <span className="italic text-gradient">Premium</span> Essentials Since 2020
            </h1>
            <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              At LUXE, we believe in the power of thoughtfully designed products that enhance your daily life.
              Every item is curated with precision, quality, and purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Premium Quality", desc: "We source only the finest materials and partner with skilled artisans worldwide." },
              { icon: Heart, title: "Customer First", desc: "Your satisfaction drives everything we do, from design to delivery." },
              { icon: Globe, title: "Sustainability", desc: "Committed to ethical sourcing and reducing our environmental footprint." },
              { icon: Users, title: "Community", desc: "Building a global community who value quality over quantity." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 border border-border card-shine"
              >
                <div className="w-14 h-14 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { num: 10000, suffix: "+", label: "Happy Customers" },
              { num: 50, suffix: "+", label: "Premium Products" },
              { num: 25, suffix: "+", label: "Countries Served" },
            ].map(({ num, suffix, label }) => (
              <div key={label}>
                <AnimatedCounter target={num} suffix={suffix} />
                <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl text-center">
          <Gem size={28} className="text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
            Our <span className="italic text-gradient">Mission</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We set out to create a brand that bridges the gap between luxury and everyday wear.
            Our products are designed to be timeless — never trendy, always stylish. We work with
            artisans and manufacturers who share our values of quality craftsmanship and ethical production.
          </p>
          <div className="gold-line w-24 mx-auto mt-10" />
        </div>
      </section>
    </main>
  );
};

export default About;
