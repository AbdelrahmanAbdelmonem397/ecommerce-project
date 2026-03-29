import { useState, useMemo } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  const maxPrice = Math.max(...products.map((p) => p.price));

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    switch (sortBy) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "rating":
        return [...result].sort((a, b) => b.rating - a.rating);
      default:
        return result;
    }
  }, [selectedCategory, searchQuery, sortBy, priceRange, minRating, inStockOnly]);

  const activeFilterCount = [
    priceRange[0] > 0 || priceRange[1] < maxPrice,
    minRating > 0,
    inStockOnly,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setMinRating(0);
    setInStockOnly(false);
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="border-b border-border py-16 md:py-24 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs uppercase tracking-[0.4em] mb-4">Explore</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground">
              Our <span className="italic text-gradient">Collection</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              Discover premium products meticulously curated for the discerning individual.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          {/* Search + Sort + Filter Toggle */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-card border border-border text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 border text-sm transition-all duration-300 ${
                  showFilters || activeFilterCount > 0
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:border-primary transition-colors text-foreground appearance-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-card border border-border p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-foreground">Advanced Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Price Range */}
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-3 block">
                        Price Range
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                            <input
                              type="number"
                              min={0}
                              max={priceRange[1]}
                              value={priceRange[0]}
                              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                              className="w-full pl-7 pr-3 py-2 bg-secondary border border-border text-sm focus:outline-none focus:border-primary text-foreground"
                            />
                          </div>
                          <span className="text-muted-foreground text-xs">to</span>
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
                            <input
                              type="number"
                              min={priceRange[0]}
                              max={500}
                              value={priceRange[1]}
                              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                              className="w-full pl-7 pr-3 py-2 bg-secondary border border-border text-sm focus:outline-none focus:border-primary text-foreground"
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={500}
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                          className="w-full accent-primary cursor-pointer"
                          style={{ accentColor: "hsl(var(--primary))" }}
                        />
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-3 block">
                        Minimum Rating
                      </label>
                      <div className="space-y-2">
                        {[0, 3, 4, 4.5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setMinRating(rating)}
                            className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-all duration-200 border ${
                              minRating === rating
                                ? "border-primary text-primary bg-primary/5"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {rating === 0 ? (
                              <span>All Ratings</span>
                            ) : (
                              <>
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={12}
                                      fill={i < Math.floor(rating) ? "currentColor" : "none"}
                                      className={i < Math.floor(rating) ? "text-primary" : "text-border"}
                                    />
                                  ))}
                                </div>
                                <span>{rating}+ stars</span>
                              </>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Stock Filter */}
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider mb-3 block">
                        Availability
                      </label>
                      <button
                        onClick={() => setInStockOnly(!inStockOnly)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 border w-full ${
                          inStockOnly
                            ? "border-primary text-primary bg-primary/5"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 border flex items-center justify-center transition-all ${
                            inStockOnly ? "border-primary bg-primary" : "border-border"
                          }`}
                        >
                          {inStockOnly && <span className="text-primary-foreground text-[10px]">✓</span>}
                        </div>
                        In Stock Only
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-xs font-body uppercase tracking-[0.15em] transition-all duration-300 border ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active filters summary */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Active:</span>
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1">
                  ${priceRange[0]} – ${priceRange[1]}
                  <button onClick={() => setPriceRange([0, 500])}><X size={10} /></button>
                </span>
              )}
              {minRating > 0 && (
                <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1">
                  {minRating}+ stars
                  <button onClick={() => setMinRating(0)}><X size={10} /></button>
                </span>
              )}
              {inStockOnly && (
                <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1">
                  In Stock
                  <button onClick={() => setInStockOnly(false)}><X size={10} /></button>
                </span>
              )}
            </div>
          )}

          {/* Results count */}
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-8">
            {filtered.length} {filtered.length === 1 ? "Product" : "Products"}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="font-display text-xl">No products found.</p>
              <p className="text-sm mt-2">Try adjusting your search or filter.</p>
              <button onClick={clearFilters} className="btn-primary mt-6">
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Products;
