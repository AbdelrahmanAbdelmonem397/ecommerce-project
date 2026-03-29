import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  details: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Leather Watch",
    price: 189.99,
    originalPrice: 249.99,
    image: product1,
    category: "Watches",
    description: "A timeless wristwatch featuring a genuine leather strap and rose-gold accents. Swiss-made movement ensures precision and durability for everyday elegance.",
    details: ["Swiss quartz movement", "Genuine leather strap", "Water resistant 50m", "Sapphire crystal glass", "2-year warranty"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Aviator Sunglasses",
    price: 129.99,
    image: product2,
    category: "Eyewear",
    description: "Premium aviator sunglasses with polarized lenses and gold-tone metal frame. UV400 protection keeps your eyes safe in style.",
    details: ["Polarized lenses", "UV400 protection", "Gold-tone metal frame", "Includes leather case", "Scratch-resistant coating"],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Heritage Leather Wallet",
    price: 79.99,
    originalPrice: 99.99,
    image: product3,
    category: "Accessories",
    description: "Handcrafted from full-grain Italian leather, this bifold wallet ages beautifully over time. Slim profile fits comfortably in any pocket.",
    details: ["Full-grain Italian leather", "6 card slots + bill compartment", "RFID blocking technology", "Slim bifold design", "Gift box included"],
    rating: 4.9,
    reviews: 203,
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Messenger Bag",
    price: 249.99,
    image: product4,
    category: "Bags",
    description: "A versatile leather messenger bag perfect for work or travel. Multiple compartments keep your essentials organized in style.",
    details: ["Premium leather construction", "Padded laptop sleeve (15\")", "Adjustable shoulder strap", "Brass hardware", "Interior zip pocket"],
    rating: 4.7,
    reviews: 67,
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    name: "Minimalist Sneakers",
    price: 159.99,
    originalPrice: 199.99,
    image: product5,
    category: "Footwear",
    description: "Clean, minimal sneakers crafted from premium leather. The perfect everyday shoe that pairs with anything from jeans to chinos.",
    details: ["Premium leather upper", "Memory foam insole", "Rubber outsole", "True to size fit", "Available in 3 colors"],
    rating: 4.5,
    reviews: 156,
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: "Wireless Headphones",
    price: 299.99,
    image: product6,
    category: "Electronics",
    description: "Studio-quality wireless headphones with active noise cancellation. 30-hour battery life and premium comfort for all-day listening.",
    details: ["Active noise cancellation", "30-hour battery life", "Bluetooth 5.2", "Premium protein leather cushions", "Foldable design"],
    rating: 4.8,
    reviews: 312,
    inStock: true,
    featured: false,
  },
  {
    id: 7,
    name: "Silver Cuff Bracelet",
    price: 119.99,
    image: product7,
    category: "Jewelry",
    description: "An elegant sterling silver cuff bracelet with intricate lattice detailing. A statement piece that elevates any outfit.",
    details: ["925 Sterling silver", "Adjustable fit", "Tarnish-resistant coating", "Handcrafted design", "Velvet pouch included"],
    rating: 4.7,
    reviews: 45,
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    name: "Ceramic Coffee Mug",
    price: 34.99,
    image: product8,
    category: "Lifestyle",
    description: "A beautifully crafted matte black ceramic mug. Double-walled design keeps your drinks hot while staying cool to the touch.",
    details: ["Double-walled ceramic", "350ml capacity", "Microwave safe", "Dishwasher safe", "Matte black finish"],
    rating: 4.4,
    reviews: 78,
    inStock: true,
    featured: false,
  },
];

export const categories = ["All", "Watches", "Eyewear", "Accessories", "Bags", "Footwear", "Electronics", "Jewelry", "Lifestyle"];
