// src/components/layout/AppLayout.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Link } from "react-router-dom";
import { useAppStore } from "@/store/appStore";
import {
  LayoutDashboard,
  FileText,
  Users,
  UserCheck,
  Package,
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
  Search,
  Sparkles,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onLogout?: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Employees", href: "/employees", icon: UserCheck },
  { name: "Products", href: "/products", icon: Package },
];

export default function AppLayout({
  children,
  currentPage = "Dashboard",
  onLogout,
}: AppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { sidebarCollapsed, setSidebarCollapsed, setCurrentPage } = useAppStore();

  React.useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-blob absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-70"></div>
        <div className="floating-blob absolute top-0 right-4 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-70"></div>
        <div className="floating-blob absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-pink-600/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-70"></div>
        <div className="floating-blob absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000 opacity-70"></div>
      </div>

      {/* Premium Glassmorphism Navbar */}
      <header className="glass-nav sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center justify-between h-20 px-8">
          {/* Premium Logo */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/25 transform rotate-6 hover:rotate-12 transition-transform duration-300">
                  <Crown className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold premium-gradient">
                  Monexa
                </h1>
                <p className="text-xs text-gray-400 font-medium">Premium Edition</p>
              </div>
            </div>
            
            {/* Premium Search Bar */}
            <div className="hidden lg:flex relative">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                <Input
                  placeholder="Search anything..."
                  className="w-80 pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 backdrop-blur-md transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Premium Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item) => {
              const isActive = item.name === currentPage;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group relative flex items-center space-x-3 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105",
                    isActive
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30 shadow-lg shadow-blue-500/20 backdrop-blur-md"
                      : "text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-md border border-transparent hover:border-white/20"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive ? "text-blue-400" : "text-gray-400 group-hover:text-white"
                  )} />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Premium Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Premium Notifications */}
            <div className="relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold shadow-lg shadow-red-500/50 animate-pulse">
                  3
                </span>
              </Button>
            </div>
            
            {/* Premium Theme Toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            
            {/* Premium User Section */}
            <div className="hidden md:flex items-center space-x-4 pl-6 border-l border-white/10">
              <div className="text-right">
                <div className="text-sm font-semibold text-white flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span>Admin User</span>
                </div>
                <div className="text-xs text-gray-400 font-medium">Premium Account</div>
              </div>
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/30 transform group-hover:scale-110 transition-all duration-300">
                  <span className="text-lg font-bold text-white">A</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/50 to-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
              <Button
                onClick={onLogout}
                className="group bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 hover:text-white border border-red-500/30 hover:border-red-400/50 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium">Logout</span>
              </Button>
            </div>

            {/* Premium Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110"
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden glass-card border-t border-white/10">
            <div className="px-6 py-6 space-y-4">
              {/* Premium Mobile Search */}
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                <Input
                  placeholder="Search..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-400/50 backdrop-blur-md"
                />
              </div>
              
              {/* Premium Navigation Links */}
              {navigation.map((item) => {
                const isActive = item.name === currentPage;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-4 px-6 py-4 text-sm font-medium rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30 shadow-lg shadow-blue-500/20 backdrop-blur-md"
                        : "text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-md border border-transparent hover:border-white/20"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    <item.icon className={cn(
                      "h-6 w-6 transition-colors duration-300",
                      isActive ? "text-blue-400" : "text-gray-400"
                    )} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Premium Mobile User Section */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center space-x-4 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/30">
                    <span className="text-lg font-bold text-white">A</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                      <span>Admin User</span>
                    </div>
                    <div className="text-xs text-gray-400 font-medium">Premium Account</div>
                  </div>
                </div>
                
                <Button
                  onClick={onLogout}
                  className="w-full bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 hover:text-white border border-red-500/30 hover:border-red-400/50 backdrop-blur-md transition-all duration-300 hover:scale-105"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="font-medium">Logout</span>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Premium Main Content */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
