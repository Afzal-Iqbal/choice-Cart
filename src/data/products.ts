import { Product, Category } from "../types";

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest tech gadgets",
    imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    icon: "fas fa-laptop"
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "Style & trends",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    icon: "fas fa-tshirt"
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Comfort & style",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    icon: "fas fa-home"
  },
  {
    id: "sports",
    name: "Sports",
    description: "Fitness & outdoor",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    icon: "fas fa-dumbbell"
  }
];

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality sound with noise cancellation",
    price: 199,
    originalPrice: 249,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
    ],
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    featured: true
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Track your health and fitness goals",
    price: 299,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    featured: true
  },
  {
    id: "3",
    name: "Latest Smartphone",
    description: "Advanced camera and lightning-fast performance",
    price: 899,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    featured: true
  },
  {
    id: "4",
    name: "Ultrabook Laptop",
    description: "Powerful performance in a lightweight design",
    price: 1299,
    originalPrice: 1499,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    featured: true
  }
];

export const allProducts: Product[] = [
  ...featuredProducts,
  {
    id: "5",
    name: "Wireless Earbuds",
    description: "True wireless freedom with premium sound",
    price: 149,
    originalPrice: 199,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    featured: false
  },
  {
    id: "6",
    name: "Gaming Keyboard",
    description: "Mechanical keyboard for gaming enthusiasts",
    price: 129,
    category: "electronics",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.4,
    reviewCount: 67,
    inStock: true,
    featured: false
  },
  {
    id: "7",
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    price: 29,
    category: "fashion",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.2,
    reviewCount: 145,
    inStock: true,
    featured: false
  },
  {
    id: "8",
    name: "Running Shoes",
    description: "Lightweight running shoes for peak performance",
    price: 159,
    category: "sports",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    rating: 4.6,
    reviewCount: 298,
    inStock: true,
    featured: false
  }
];
