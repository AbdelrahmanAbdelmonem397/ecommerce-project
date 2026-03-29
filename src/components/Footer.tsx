import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-bold mb-4">
              LUXE<span className="text-primary">.</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Meticulously crafted premium essentials for those who appreciate refined living.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, url: "https://www.instagram.com" },
                { Icon: Twitter, url: "https://www.twitter.com" },
                { Icon: Facebook, url: "https://www.facebook.com" },
              ].map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body font-semibold text-xs mb-6 uppercase tracking-[0.2em] text-foreground">Shop</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors duration-300">All Products</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary transition-colors duration-300">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors duration-300">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-xs mb-6 uppercase tracking-[0.2em] text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors duration-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="gold-line mt-16 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 LUXE. All rights reserved.</p>
          <p>Crafted with precision & passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
