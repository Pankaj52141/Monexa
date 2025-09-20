import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Customers from "./pages/Customers";
import Employees from "./pages/Employees";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Called after successful login in Login.tsx
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isAuthenticated ? (
            <>
              <Routes>
                <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
                <Route path="/invoices" element={<Invoices onLogout={handleLogout} />} />
                <Route path="/customers" element={<Customers onLogout={handleLogout} />} />
                <Route path="/employees" element={<Employees onLogout={handleLogout} />} />
                <Route path="/products" element={<Products onLogout={handleLogout} />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              {/* Add logout button globally for demo */}
              <div style={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
              </div>
            </>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
