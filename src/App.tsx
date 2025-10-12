import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as HotToaster } from 'react-hot-toast';
import { ThemeProvider } from "@/providers/ThemeProvider";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import Employees from "./pages/Employees";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAppStore } from "@/store/appStore";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
    },
  },
});

const App = () => {
  const { isAuthenticated, login, logout } = useAppStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        login(user, token);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [login]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="monexa-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HotToaster 
            position="top-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white',
              duration: 4000,
            }}
          />
          <BrowserRouter>
            {isAuthenticated ? (
              <>
                <Routes>
                  <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
                  <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
                  <Route path="/invoices" element={<Invoices onLogout={handleLogout} />} />
                  <Route path="/customers" element={<Customers onLogout={handleLogout} />} />
                  <Route path="/employees" element={<Employees onLogout={handleLogout} />} />
                  <Route path="/products" element={<Products onLogout={handleLogout} />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Home />} />
              </Routes>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
