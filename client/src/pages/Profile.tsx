import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, ShoppingBag, Heart, MapPin, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/useToast";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Mock order data (in real app, this would come from API)
const mockOrders = [
  {
    id: "ORD-12345",
    date: "March 15, 2024",
    status: "delivered" as const,
    items: "Premium Wireless Headphones + 2 more items",
    total: "$860.76",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
  },
  {
    id: "ORD-12344",
    date: "March 10, 2024",
    status: "shipped" as const,
    items: "Smart Fitness Watch",
    total: "$299.00",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
  },
  {
    id: "ORD-12343",
    date: "March 5, 2024",
    status: "processing" as const,
    items: "Latest Smartphone + Wireless Earbuds",
    total: "$1,048.00",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
  },
];

export default function Profile() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Redirect if not logged in
  if (!user) {
    navigate("/auth");
    return null;
  }

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
    },
  });

  const handleUpdateProfile = async (data: ProfileFormData) => {
    setIsUpdating(true);
    try {
      // TODO: Update user profile in Firebase/Firestore
      console.log("Updating profile:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Update Failed",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleViewOrder = (orderId: string) => {
    // TODO: Navigate to order details page
    console.log("View order:", orderId);
    toast({
      title: "Coming Soon",
      description: "Order details page will be available soon.",
    });
  };

  const handleReorder = (orderId: string) => {
    // TODO: Add order items to cart
    console.log("Reorder:", orderId);
    toast({
      title: "Coming Soon",
      description: "Reorder functionality will be available soon.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const menuItems = [
    {
      id: "profile",
      label: "Profile Information",
      icon: User,
    },
    {
      id: "orders",
      label: "Order History",
      icon: ShoppingBag,
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
    },
  ];

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="text-2xl text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          activeTab === item.id
                            ? "bg-primary bg-opacity-10 text-primary"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              /* Profile Information */
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                          className={form.formState.errors.firstName ? "border-red-500" : ""}
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          {...form.register("lastName")}
                          className={form.formState.errors.lastName ? "border-red-500" : ""}
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        className={form.formState.errors.email ? "border-red-500" : ""}
                        disabled
                      />
                      <p className="text-gray-500 text-sm mt-1">
                        Email address cannot be changed
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        {...form.register("phone")}
                      />
                    </div>

                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? "Updating..." : "Update Profile"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === "orders" && (
              /* Order History */
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">Order {order.id}</h3>
                            <p className="text-gray-600 text-sm">Placed on {order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16">
                            <img
                              src={order.image}
                              alt="Product from order"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{order.items}</p>
                            <p className="text-gray-600 text-sm">Total: {order.total}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewOrder(order.id)}
                            >
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleReorder(order.id)}
                            >
                              Buy Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="mt-6">
                    View All Orders →
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "wishlist" && (
              <Card>
                <CardHeader>
                  <CardTitle>Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Save items you love for later by clicking the heart icon
                    </p>
                    <Button onClick={() => navigate("/products")}>
                      Start Shopping
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "addresses" && (
              <Card>
                <CardHeader>
                  <CardTitle>Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      No addresses saved
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Add addresses to make checkout faster and easier
                    </p>
                    <Button>Add New Address</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
