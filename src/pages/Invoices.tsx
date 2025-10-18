import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Search,
  FileText,
  Eye,
  Edit,
  Download,
  Filter,
  DollarSign,
  Calendar,
  TrendingUp,
  Clock,
  Users,
  Menu,
  X,
  LogOut,
  Home,
  UserCheck,
  Package,
  Sparkles,
  MoreVertical,
  ArrowUpRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from '@/store/appStore';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/invoices`;

type Invoice = {
  _id?: string;
  id?: string;
  type: "customer" | "employee" | "other";
  recipient: string;
  amount: string | number;
  status: string;
  date: string;
  dueDate: string;
};

function getStatusBadge(status: string) {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 backdrop-blur-xl">
          Paid
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 backdrop-blur-xl">
          Pending
        </Badge>
      );
    case "overdue":
      return (
        <Badge className="bg-red-500/10 text-red-400 border-red-500/20 backdrop-blur-xl">
          Overdue
        </Badge>
      );
    case "draft":
      return (
        <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 backdrop-blur-xl">
          Draft
        </Badge>
      );
    default:
      return <Badge className="backdrop-blur-xl border-white/20">{status}</Badge>;
  }
}

export default function Invoices({ onLogout }: { onLogout?: () => void }) {
  const navigate = useNavigate();
  const { logout } = useAppStore();
  
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState<Invoice>({
    type: "customer",
    recipient: "",
    amount: "",
    status: "pending",
    date: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
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
      setInvoices(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to fetch invoices");
      setInvoices([]);
    }
    setLoading(false);
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(invoice.amount).toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalInvoices: invoices.length,
    totalAmount: invoices.reduce((sum, inv) => {
      const amountStr = typeof inv.amount === 'string' ? inv.amount : String(inv.amount);
      return sum + parseFloat(amountStr.replace(/[$,]/g, ''));
    }, 0),
    paidInvoices: invoices.filter(inv => inv.status === 'paid').length,
    pendingInvoices: invoices.filter(inv => inv.status === 'pending').length
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Invoices</h1>
                  <p className="text-sm text-white/60">Manage your billing and payments</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 text-white">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Invoices</span>
              </div>
              <Link to="/customers" className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Customers</span>
              </Link>
              <Link to="/employees" className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <UserCheck className="w-4 h-4" />
                <span className="text-sm font-medium">Employees</span>
              </Link>
              <Link to="/products" className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">Products</span>
              </Link>
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
              <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/10 text-white">
                <FileText className="w-5 h-5" />
                <span>Invoices</span>
              </div>
              <Link to="/customers" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Users className="w-5 h-5" />
                <span>Customers</span>
              </Link>
              <Link to="/employees" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <UserCheck className="w-5 h-5" />
                <span>Employees</span>
              </Link>
              <Link to="/products" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Package className="w-5 h-5" />
                <span>Products</span>
              </Link>
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
                  placeholder="Search invoices..."
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
            <Button className="h-12 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-300 transform hover:scale-105">
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Total Invoices</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.totalInvoices}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+12% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Total Amount</p>
                    <h3 className="text-2xl font-bold text-white mt-1">${stats.totalAmount.toLocaleString()}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+8% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Paid Invoices</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.paidInvoices}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+15% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Pending</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.pendingInvoices}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-yellow-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">Awaiting payment</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Invoices Table */}
          <Card className="glassmorphism-card border-white/10">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <FileText className="w-6 h-6 mr-3 text-purple-400" />
                Invoice Management
              </CardTitle>
              <p className="text-white/60 mt-2">Track and manage all your business invoices</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-6 text-white/80 font-semibold">Recipient</th>
                      <th className="text-left p-6 text-white/80 font-semibold">Amount</th>
                      <th className="text-left p-6 text-white/80 font-semibold">Status</th>
                      <th className="text-left p-6 text-white/80 font-semibold">Due Date</th>
                      <th className="text-left p-6 text-white/80 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice._id || invoice.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-300">
                        <td className="p-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                              <FileText className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">{invoice.recipient}</p>
                              <p className="text-sm text-white/60 capitalize">{invoice.type}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <span className="font-semibold text-white text-lg">{invoice.amount}</span>
                        </td>
                        <td className="p-6">
                          {getStatusBadge(invoice.status)}
                        </td>
                        <td className="p-6">
                          <div className="flex items-center space-x-2 text-white/80">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredInvoices.length === 0 && (
                <div className="p-12 text-center">
                  <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white/60 mb-2">No invoices found</h3>
                  <p className="text-white/40">Create your first invoice to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}