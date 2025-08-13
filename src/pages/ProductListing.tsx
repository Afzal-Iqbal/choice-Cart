import { useState, useMemo } from "react";
import { useRoute } from "wouter";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "../components/Product/ProductCard";
import { allProducts, categories } from "../data/products";

export default function ProductListing() {
  const [match, params] = useRoute("/products/:category?");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by category from URL
    if (params?.category) {
      filtered = filtered.filter(product => product.category === params.category);
    }

    // Filter by selected categories (checkbox filters)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-50":
          filtered = filtered.filter(product => product.price < 50);
          break;
        case "50-100":
          filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
          break;
        case "100-500":
          filtered = filtered.filter(product => product.price > 100 && product.price <= 500);
          break;
        case "over-500":
          filtered = filtered.filter(product => product.price > 500);
          break;
      }
    }

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Assuming newer products have higher IDs
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // Featured products first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [params?.category, selectedCategories, searchQuery, priceRange, minRating, sortBy]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange("all");
    setMinRating(0);
    setSearchQuery("");
  };

  const currentCategory = params?.category ? 
    categories.find(cat => cat.id === params.category) : null;

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
                <span className="text-gray-500">
                  {currentCategory ? currentCategory.name : "Products"}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-secondary">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Search</Label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Category Filter */}
                {!params?.category && (
                  <div className="mb-6">
                    <h4 className="font-medium text-secondary mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={(checked) => 
                              handleCategoryChange(category.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={category.id} className="text-sm cursor-pointer">
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-secondary mb-3">Price Range</h4>
                  <RadioGroup value={priceRange} onValueChange={setPriceRange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="text-sm cursor-pointer">All Prices</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="under-50" id="under-50" />
                      <Label htmlFor="under-50" className="text-sm cursor-pointer">Under $50</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="50-100" id="50-100" />
                      <Label htmlFor="50-100" className="text-sm cursor-pointer">$50 - $100</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="100-500" id="100-500" />
                      <Label htmlFor="100-500" className="text-sm cursor-pointer">$100 - $500</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="over-500" id="over-500" />
                      <Label htmlFor="over-500" className="text-sm cursor-pointer">Over $500</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium text-secondary mb-3">Minimum Rating</h4>
                  <RadioGroup 
                    value={minRating.toString()} 
                    onValueChange={(value) => setMinRating(parseInt(value))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="rating-0" />
                      <Label htmlFor="rating-0" className="text-sm cursor-pointer">All Ratings</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="rating-4" />
                      <Label htmlFor="rating-4" className="text-sm cursor-pointer">4+ Stars</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="rating-3" />
                      <Label htmlFor="rating-3" className="text-sm cursor-pointer">3+ Stars</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sorting and View Options */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} products
                  </p>
                  <div className="flex items-center space-x-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Sort by: Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Customer Rating</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex border border-gray-300 rounded-lg">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
