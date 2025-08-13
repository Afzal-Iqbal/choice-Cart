import { Link } from "wouter";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function Cart() {
  const { items, itemCount, clearCart } = useCart();
  const { user } = useAuth();

  const handleProceedToCheckout = () => {
    // Navigate to checkout or login if not authenticated
    if (!user) {
      // TODO: Navigate to auth page with redirect back to checkout
      window.location.href = "/auth?redirect=/checkout";
    } else {
      window.location.href = "/checkout";
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 py-8 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-secondary mb-8">Shopping Cart</h1>
          
          <Card>
            <CardContent className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-shopping-cart text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
                </p>
                <Link href="/products">
                  <Button size="lg">Start Shopping</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cart Items ({itemCount})</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-0">
                  {items.map((item, index) => (
                    <div key={item.id}>
                      <CartItem item={item} />
                      {index < items.length - 1 && <div className="border-b border-gray-200" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary onCheckout={handleProceedToCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
}
