import { Link } from "wouter";
import { Truck, RotateCcw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "../components/Product/ProductCard";
import { featuredProducts, categories } from "../data/products";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Amazing Products
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Shop the latest trends with unbeatable prices and fast shipping. 
                Your perfect purchase is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Shop Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Shopping experience on mobile device"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our handpicked selection of trending items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" className="text-secondary border-secondary hover:bg-secondary hover:text-white">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/products/${category.id}`}>
                <Card className="cursor-pointer group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="category-overlay absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <i className={`${category.icon} text-4xl mb-2`}></i>
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-sm">{category.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free shipping on orders over $50. Fast and reliable delivery to your doorstep.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                30-day return policy. Not satisfied? Return any item hassle-free within 30 days.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support. We're here to help whenever you need us.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
