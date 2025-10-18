import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Search,
  Package,
  Eye,
  Edit,
  Filter,
  TrendingUp,
  DollarSign,
  Menu,
  X,
  LogOut,
  Home,
  FileText,
  Users,
  UserCheck,
  Sparkles,
  ShoppingCart,
  Star,
  Archive,
  Tag,
  BarChart3
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from '@/store/appStore';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/products`;

type Product = {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: string | number;
  category: string;
  stock: number;
  active: boolean;
};

function getStatusBadge(active: boolean) {
  return active ? (
    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 backdrop-blur-xl">
      Active
    </Badge>
  ) : (
    <Badge className="bg-red-500/10 text-red-400 border-red-500/20 backdrop-blur-xl">
      Inactive
    </Badge>
  );
}

function getCategoryBadge(category: string) {
  const categoryColors: Record<string, string> = {
    'Software': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Services': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Cloud Services': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    'Education': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    'Hardware': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };
  
  const colorClass = categoryColors[category] || 'bg-white/10 text-white/80 border-white/20';
  
  return (
    <Badge className={`${colorClass} backdrop-blur-xl`}>
      <Tag className="w-3 h-3 mr-1" />
      {category}
    </Badge>
  );
}

function getStockStatus(stock: number) {
  if (stock === 0) {
    return <Badge className="bg-red-500/10 text-red-400 border-red-500/20 backdrop-blur-xl">Out of Stock</Badge>;
  } else if (stock < 10) {
    return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 backdrop-blur-xl">Low Stock</Badge>;
  } else {
    return <Badge className="bg-green-500/10 text-green-400 border-green-500/20 backdrop-blur-xl">In Stock</Badge>;
  }
}

export default function Products({ onLogout }: { onLogout?: () => void }) {
  const navigate = useNavigate();
  const { logout } = useAppStore();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.status === 401) {
        // Authentication failed - redirect to login
        logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to fetch products");
      setProducts([]);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(product => product.active).length,
    totalValue: products.reduce((sum, product) => {
      const priceStr = typeof product.price === 'string' ? product.price : String(product.price);
      return sum + parseFloat(priceStr.replace(/[$,]/g, ''));
    }, 0),
    categories: new Set(products.map(product => product.category)).size
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-3000"></div>
      </div>

      {/* Premium Navigation */}
      <nav className="relative z-50 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl border-b border-white/20"></div>
        <div className="relative flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Products</h1>
                  <p className="text-sm text-white/60">Manage your product catalog</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <Link to="/invoices" className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Invoices</span>
              </Link>
              <Link to="/customers" className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Customers</span>
              </Link>
              <Link to="/employees" className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <UserCheck className="w-4 h-4" />
                <span className="text-sm font-medium">Employees</span>
              </Link>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 text-white">
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">Products</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={onLogout}
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-r border-white/20 p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl bg-white/10 text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-2">
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/invoices" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <FileText className="w-5 h-5" />
                <span>Invoices</span>
              </Link>
              <Link to="/customers" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Users className="w-5 h-5" />
                <span>Customers</span>
              </Link>
              <Link to="/employees" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <UserCheck className="w-5 h-5" />
                <span>Employees</span>
              </Link>
              <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/10 text-white">
                <Package className="w-5 h-5" />
                <span>Products</span>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 w-full sm:w-80 h-12 bg-white/5 backdrop-blur-xl border-white/20 text-white placeholder:text-white/40 focus:border-purple-400/50 focus:ring-purple-400/20"
                />
              </div>
              <Button className="h-12 px-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <Button className="h-12 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold transition-all duration-300 transform hover:scale-105">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Total Products</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.totalProducts}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+5% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Active Products</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.activeProducts}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-green-400">
                  <Sparkles className="w-4 h-4 mr-1" />
                  <span className="text-sm">Ready for sale</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Total Value</p>
                    <h3 className="text-2xl font-bold text-white mt-1">${stats.totalValue.toLocaleString()}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-purple-400">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span className="text-sm">Portfolio value</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Categories</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.categories}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-blue-400">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  <span className="text-sm">Product variety</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <Card className="glassmorphism-card border-white/10">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <Package className="w-6 h-6 mr-3 text-orange-400" />
                Product Catalog
              </CardTitle>
              <p className="text-white/60 mt-2">Manage your products and inventory</p>
            </CardHeader>
            <CardContent className="p-6">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white/60 mb-2">No products found</h3>
                  <p className="text-white/40">Add your first product to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product._id || product.id} className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                                <Package className="w-6 h-6 text-orange-400" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-white">{product.name}</h3>
                                <p className="text-sm text-white/60 line-clamp-2">{product.description}</p>
                              </div>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-5 h-5 text-green-400" />
                              <span className="text-2xl font-bold text-white">{product.price}</span>
                            </div>
                            {getStatusBadge(product.active)}
                          </div>

                          {/* Category & Stock */}
                          <div className="space-y-2">
                            {getCategoryBadge(product.category)}
                            <div className="flex items-center justify-between">
                              <span className="text-white/60 text-sm">Stock:</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-white font-semibold">{product.stock}</span>
                                {getStockStatus(product.stock)}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-sm text-white/80">4.8 rating</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all duration-300">
                                <ShoppingCart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}