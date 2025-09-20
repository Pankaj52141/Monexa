// src/components/layout/AppLayout.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="bg-card border-b border-card-border sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-card-foreground">
              BizManager
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => {
              const isActive = item.name === currentPage;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded transition-colors duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="destructive"
              className="ml-4"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
            <div className="text-sm text-muted-foreground">
              Welcome back,{" "}
              <span className="font-medium text-foreground">Admin</span>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">A</span>
            </div>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:bg-muted"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
            {/* Remove logout from right side on desktop */}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden bg-card border-t border-card-border flex flex-col h-[calc(100vh-4rem)]">
            {/* Scrollable nav links */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = item.name === currentPage;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded transition-colors duration-200",
                      isActive
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Footer actions (always at bottom) */}
            <div className="px-6 py-4 border-t border-card-border space-y-2">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:bg-muted w-full flex items-center justify-start"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-xl"
              onClick={() => setSettingsOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold mb-4">Settings</h2>
            <div className="text-muted-foreground">
              Settings content goes here.
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
