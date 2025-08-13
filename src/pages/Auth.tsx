import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../hooks/useToast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function Auth() {
  const [, navigate] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, register: registerUser, user } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data.email, data.password, data.firstName, data.lastName);
      toast({
        title: "Account Created!",
        description: "Your account has been created successfully.",
      });
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An error occurred while creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    loginForm.reset();
    registerForm.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <ShoppingCart className="text-primary text-4xl mb-4 mx-auto" />
          <h2 className="text-3xl font-bold text-secondary">Welcome to Choice Cart</h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? "Sign in to your account" : "Create your new account"}
          </p>
        </div>

        {/* Auth Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <Button
            type="button"
            variant={isLogin ? "default" : "ghost"}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin 
                ? "bg-white text-primary shadow-sm" 
                : "text-gray-600 hover:text-primary"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant={!isLogin ? "default" : "ghost"}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin 
                ? "bg-white text-primary shadow-sm" 
                : "text-gray-600 hover:text-primary"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            {isLogin ? (
              /* Login Form */
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                <div>
                  <Label htmlFor="login-email">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    {...loginForm.register("email")}
                    className={loginForm.formState.errors.email ? "border-red-500" : ""}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...loginForm.register("password")}
                      className={loginForm.formState.errors.password ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember-me" 
                      {...loginForm.register("rememberMe")}
                    />
                    <Label htmlFor="remember-me" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-sm text-primary hover:text-blue-600 p-0"
                  >
                    Forgot password?
                  </Button>
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="register-firstName">First Name</Label>
                    <Input
                      id="register-firstName"
                      placeholder="First name"
                      {...registerForm.register("firstName")}
                      className={registerForm.formState.errors.firstName ? "border-red-500" : ""}
                    />
                    {registerForm.formState.errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {registerForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="register-lastName">Last Name</Label>
                    <Input
                      id="register-lastName"
                      placeholder="Last name"
                      {...registerForm.register("lastName")}
                      className={registerForm.formState.errors.lastName ? "border-red-500" : ""}
                    />
                    {registerForm.formState.errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {registerForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="register-email">Email Address</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    {...registerForm.register("email")}
                    className={registerForm.formState.errors.email ? "border-red-500" : ""}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...registerForm.register("password")}
                    className={registerForm.formState.errors.password ? "border-red-500" : ""}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="register-confirmPassword">Confirm Password</Label>
                  <Input
                    id="register-confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...registerForm.register("confirmPassword")}
                    className={registerForm.formState.errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {registerForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="agree-terms" 
                    {...registerForm.register("agreeToTerms")}
                    className={registerForm.formState.errors.agreeToTerms ? "border-red-500" : ""}
                  />
                  <Label htmlFor="agree-terms" className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{" "}
                    <a href="#terms" className="text-primary hover:text-blue-600">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#privacy" className="text-primary hover:text-blue-600">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                {registerForm.formState.errors.agreeToTerms && (
                  <p className="text-red-500 text-sm">
                    {registerForm.formState.errors.agreeToTerms.message}
                  </p>
                )}
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => {
                // TODO: Implement Google sign-in
                toast({
                  title: "Coming Soon",
                  description: "Google sign-in will be available soon.",
                });
              }}
            >
              <i className="fab fa-google text-red-500 mr-2"></i>
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              onClick={() => {
                // TODO: Implement Facebook sign-in
                toast({
                  title: "Coming Soon",
                  description: "Facebook sign-in will be available soon.",
                });
              }}
            >
              <i className="fab fa-facebook text-blue-600 mr-2"></i>
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
