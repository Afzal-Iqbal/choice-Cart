import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../../contexts/CartContext";

interface CartSummaryProps {
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
}

export default function CartSummary({ showCheckoutButton = true, onCheckout }: CartSummaryProps) {
  const { subtotal, total, itemCount } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;

  const handleApplyPromo = () => {
    // TODO: Implement promo code functionality
    console.log("Apply promo code:", promoCode);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
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
                ${(subtotal + shipping + tax).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleApplyPromo}>
              Apply
            </Button>
          </div>
        </div>

        {showCheckoutButton && (
          <>
            <Button className="w-full" size="lg" onClick={onCheckout}>
              Proceed to Checkout
            </Button>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
