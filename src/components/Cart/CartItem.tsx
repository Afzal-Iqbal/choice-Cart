import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "../../types";
import { useCart } from "../../contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const hasDiscount = item.product.originalPrice && item.product.originalPrice > item.product.price;

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="ml-4 flex-1">
        <h3 className="font-semibold text-secondary">{item.product.name}</h3>
        {(item.selectedColor || item.selectedSize) && (
          <p className="text-gray-600 text-sm">
            {item.selectedColor && `Color: ${item.selectedColor}`}
            {item.selectedColor && item.selectedSize && " • "}
            {item.selectedSize && `Size: ${item.selectedSize}`}
          </p>
        )}
        <div className="flex items-center mt-2">
          <span className="text-lg font-bold text-primary">
            ${item.product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${item.product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDecrease}
            className="h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-3 py-1 border-l border-r border-gray-300 min-w-[3rem] text-center">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleIncrease}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
