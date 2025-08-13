import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ShippingForm from "../components/Forms/ShippingForm";
import PaymentForm from "../components/Forms/PaymentForm";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { ShippingInfo, PaymentInfo } from "../types";

export default function Checkout() {
  const [, navigate] = useLocation();
  const [shippingData, setShippingData] = useState<ShippingInfo | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  // Redirect to auth if not logged in
  if (!user) {
    navigate("/auth?redirect=/checkout");
    return null;
  }

  // Redirect to cart if empty
  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const orderTotal = subtotal + shipping + tax;

  const handleShippingSubmit = (data: ShippingInfo) => {
    setShippingData(data);
  };

  const handlePaymentSubmit = (data: PaymentInfo) => {
    setPaymentData(data);
  };

  const handleCompleteOrder = async () => {
    if (!shippingData || !paymentData) return;

    setIsProcessing(true);
    
    try {
      // TODO: Process payment and create order
      console.log("Processing order...", {
        user: user.id,
        items,
        shipping: shippingData,
        payment: paymentData,
        total: orderTotal,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      navigate("/orders/success");
    } catch (error) {
      console.error("Order processing failed:", error);
      // TODO: Show error message
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <ShippingForm
              onSubmit={handleShippingSubmit}
              defaultValues={{
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }}
            />

            {/* Payment Information */}
            <PaymentForm onSubmit={handlePaymentSubmit} />

            <Button
              type="button"
              size="lg"
              className="w-full"
              onClick={handleCompleteOrder}
              disabled={!shippingData || !paymentData || isProcessing}
            >
              {isProcessing ? "Processing..." : `Complete Order - $${orderTotal.toFixed(2)}`}
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 flex-shrink-0">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{item.product.name}</h4>
                        <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-primary">
                        ${orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
