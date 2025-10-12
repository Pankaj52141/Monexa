import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Mail, Phone, MapPin, Edit, Trash2, Filter, Loader2, LayoutDashboard, Users, UserCheck, DollarSign, LogOut, Sparkles, Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAppStore } from '@/store/appStore';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/customers`;

export default function Customers({ onLogout }: { onLogout?: () => void }) {
  const navigate = useNavigate();
  const { logout } = useAppStore();
  
  const [customers, setCustomers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    status: "active",
  });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
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
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        setError("Invalid data received from server.");
        setCustomers([]);
      }
    } catch {
      setError("Failed to fetch customers");
      setCustomers([]);
    }
    setLoading(false);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", location: "", status: "active" });
    setEditingCustomer(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const url = editingCustomer ? `${API_URL}/${editingCustomer.id}` : API_URL;
      const method = editingCustomer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        // Authentication failed - redirect to login
        logout();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (res.ok) {
        await fetchCustomers();
        resetForm();
        setError("");
      } else {
        setError("Failed to save customer");
      }
    } catch {
      setError("Failed to save customer");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
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

      if (res.ok) {
        await fetchCustomers();
        setError("");
      } else {
        setError("Failed to delete customer");
      }
    } catch {
      setError("Failed to delete customer");
    }
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || c.phone.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : c.status === filter;
    return matchesSearch && matchesFilter;
  });

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
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-tight">
                  Monexa
                </span>
                <span className="text-xs text-purple-300 font-medium tracking-widest">PREMIUM CRM</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 ml-12">
              <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 text-purple-300 font-medium hover:text-white transition-colors duration-300">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link to="/customers" className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/20">
                <Users className="h-4 w-4" />
                <span>Customers</span>
              </Link>
              <Link to="/invoices" className="flex items-center space-x-2 px-4 py-2 text-purple-300 font-medium hover:text-white transition-colors duration-300">
                <DollarSign className="h-4 w-4" />
                <span>Invoices</span>
              </Link>
              <Link to="/employees" className="flex items-center space-x-2 px-4 py-2 text-purple-300 font-medium hover:text-white transition-colors duration-300">
                <UserCheck className="h-4 w-4" />
                <span>Employees</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button onClick={onLogout} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-300 transform hover:scale-105">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-64 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-l border-white/20 p-6">
            <div className="space-y-4 mt-16">
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-purple-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/customers" className="flex items-center space-x-3 px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl text-white font-medium">
                <Users className="h-5 w-5" />
                <span>Customers</span>
              </Link>
              <Link to="/invoices" className="flex items-center space-x-3 px-4 py-3 text-purple-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                <DollarSign className="h-5 w-5" />
                <span>Invoices</span>
              </Link>
              <Link to="/employees" className="flex items-center space-x-3 px-4 py-3 text-purple-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
                <UserCheck className="h-5 w-5" />
                <span>Employees</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-white mb-4">
              Customer <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Management</span>
            </h1>
            <p className="text-purple-200 text-lg">Manage your valuable customers with premium tools</p>
          </div>

          {/* Actions & Search */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                    <Input placeholder="Search customers..." className="pl-10 w-72 h-12 bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400 focus:ring-purple-400/20" value={search} onChange={(e) => setSearch(e.target.value)} />
                  </div>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-40 h-12 bg-white/5 border-white/20 text-white backdrop-blur-xl rounded-xl focus:border-purple-400">
                      <Filter className="h-4 w-4 text-purple-400 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-semibold h-12 px-6 rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group relative overflow-hidden" onClick={resetForm}>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <Plus className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">Add Customer</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-white/20 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {editingCustomer ? "Edit Customer" : "Add New Customer"}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input name="name" placeholder="Customer Name" value={form.name} onChange={handleInput} className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400" required />
                      <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleInput} className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400" required />
                      <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleInput} className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400" required />
                      <Input name="location" placeholder="Location" value={form.location} onChange={handleInput} className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400" required />
                      <Select name="status" value={form.status} onValueChange={(value) => setForm({...form, status: value})}>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white backdrop-blur-xl rounded-xl focus:border-purple-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                        {editingCustomer ? "Update" : "Create"} Customer
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 backdrop-blur-xl">
              <p className="text-red-300 text-center">{error}</p>
            </div>
          )}

          {/* Customers Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center space-x-3">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                <span className="text-purple-200 text-lg">Loading customers...</span>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 border-2 border-purple-400/30">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                            {customer.name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{customer.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${customer.status === "active" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                            {customer.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-purple-400 hover:text-white hover:bg-white/10" onClick={() => { setEditingCustomer(customer); setForm({ ...customer }); }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-white/20 text-white">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Edit Customer</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <Input name="name" placeholder="Customer Name" value={form.name} onChange={handleInput} className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400" required />
                              <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleInput} className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400" required />
                              <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleInput} className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400" required />
                              <Input name="location" placeholder="Location" value={form.location} onChange={handleInput} className="bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400" required />
                              <Select name="status" value={form.status} onValueChange={(value) => setForm({...form, status: value})}>
                                <SelectTrigger className="bg-white/5 border-white/20 text-white backdrop-blur-xl rounded-xl focus:border-purple-400">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl">
                                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                                Update Customer
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-white hover:bg-red-500/20" onClick={() => handleDelete(customer.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-purple-200">
                        <Mail className="h-4 w-4 text-purple-400" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-purple-200">
                        <Phone className="h-4 w-4 text-purple-400" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-purple-200">
                        <MapPin className="h-4 w-4 text-purple-400" />
                        <span className="text-sm">{customer.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Premium Footer */}
      <div className="relative z-20 mt-16">
        <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border-t border-white/20 px-8 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4">
            <p className="text-xs text-purple-300">
              © 2025 <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Monexa Premium</span>. All rights reserved.
            </p>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span className="text-xs text-purple-400 font-medium">CRM EXCELLENCE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}