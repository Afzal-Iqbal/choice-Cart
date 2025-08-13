import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Star, Heart, Truck, RotateCcw, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ProductImageGallery from "../components/Product/ProductImageGallery";
import { allProducts } from "../data/products";
import { useCart } from "../contexts/CartContext";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:id");
  const [, navigate] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("black");
  const { addToCart } = useCart();

  if (!params?.id) {
    navigate("/products");
    return null;
  }

  const product = allProducts.find(p => p.id === params.id);

  if (!product) {
    navigate("/products");
    return null;
  }

  const images = product.images || [product.imageUrl];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const colors = [
    { value: "black", label: "Black", class: "bg-black" },
    { value: "white", label: "White", class: "bg-white border-2 border-gray-300" },
    { value: "blue", label: "Blue", class: "bg-blue-600" },
  ];

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, { color: selectedColor });
  };

  const handleAddToWishlist = () => {
    // TODO: Implement wishlist functionality
    console.log("Add to wishlist:", product.id);
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-700 hover:text-primary">Home</a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href={`/products/${product.category}`} className="text-gray-700 hover:text-primary">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Images */}
              <ProductImageGallery images={images} productName={product.name} />

              {/* Product Details */}
              <div>
                <div className="mb-4">
                  <h1 className="text-3xl font-bold text-secondary mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-gray-600 ml-2">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <>
                        <span className="text-xl text-gray-500 line-through">
                          ${product.originalPrice!.toFixed(2)}
                        </span>
                        <Badge className="bg-accent text-white">
                          {discountPercentage}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}. Experience premium quality with advanced features
                    designed for exceptional performance. Perfect for daily use with
                    long-lasting durability and modern design aesthetics.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Premium quality materials and construction</li>
                    <li>Advanced technology for superior performance</li>
                    <li>Ergonomic design for comfort and usability</li>
                    <li>Compatible with various devices and systems</li>
                    <li>Comprehensive warranty and support</li>
                  </ul>
                </div>

                {/* Color Options */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Color</h3>
                  <RadioGroup 
                    value={selectedColor} 
                    onValueChange={setSelectedColor}
                    className="flex space-x-3"
                  >
                    {colors.map((color) => (
                      <div key={color.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={color.value}
                          id={color.value}
                          className="sr-only"
                        />
                        <Label
                          htmlFor={color.value}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                            selectedColor === color.value 
                              ? "border-primary ring-2 ring-primary ring-offset-2" 
                              : "border-gray-300"
                          } ${color.class}`}
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Quantity and Actions */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Shipping Info */}
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Truck className="text-primary h-4 w-4" />
                        <span>Free shipping on orders over $50</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RotateCcw className="text-primary h-4 w-4" />
                        <span>30-day return policy</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
