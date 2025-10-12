import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Search,
  Users,
  Eye,
  Edit,
  Filter,
  UserCheck,
  TrendingUp,
  Clock,
  Menu,
  X,
  LogOut,
  Home,
  FileText,
  Package,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Award,
  Building
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from '@/store/appStore';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/employees`;

type Employee = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  role: string;
  status: string;
  joinDate: string;
  salary: string;
};

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20 backdrop-blur-xl">
          Active
        </Badge>
      );
    case "inactive":
      return (
        <Badge className="bg-red-500/10 text-red-400 border-red-500/20 backdrop-blur-xl">
          Inactive
        </Badge>
      );
    case "on-leave":
      return (
        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 backdrop-blur-xl">
          On Leave
        </Badge>
      );
    default:
      return <Badge className="backdrop-blur-xl border-white/20">{status}</Badge>;
  }
}

function getRoleBadge(role: string) {
  switch (role) {
    case "manager":
      return (
        <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 backdrop-blur-xl">
          <Award className="w-3 h-3 mr-1" />
          Manager
        </Badge>
      );
    case "employee":
      return (
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-xl">
          <UserCheck className="w-3 h-3 mr-1" />
          Employee
        </Badge>
      );
    case "admin":
      return (
        <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 backdrop-blur-xl">
          <Sparkles className="w-3 h-3 mr-1" />
          Admin
        </Badge>
      );
    default:
      return <Badge className="backdrop-blur-xl border-white/20">{role}</Badge>;
  }
}

export default function Employees({ onLogout }: { onLogout?: () => void }) {
  const navigate = useNavigate();
  const { logout } = useAppStore();
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    role: "employee",
    status: "active",
    joinDate: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
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
      setEmployees(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to fetch employees");
      setEmployees([]);
    }
    setLoading(false);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(emp => emp.status === 'active').length,
    managers: employees.filter(emp => emp.role === 'manager').length,
    departments: new Set(employees.map(emp => emp.department)).size
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <UserCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Employees</h1>
                  <p className="text-sm text-white/60">Manage your team members</p>
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
              <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 text-white">
                <UserCheck className="w-4 h-4" />
                <span className="text-sm font-medium">Employees</span>
              </div>
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
              <Link to="/invoices" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <FileText className="w-5 h-5" />
                <span>Invoices</span>
              </Link>
              <Link to="/customers" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
                <Users className="w-5 h-5" />
                <span>Customers</span>
              </Link>
              <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/10 text-white">
                <UserCheck className="w-5 h-5" />
                <span>Employees</span>
              </div>
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
                  placeholder="Search employees..."
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
            <Button className="h-12 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all duration-300 transform hover:scale-105">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Total Employees</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.totalEmployees}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-green-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+3 new hires</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Active</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.activeEmployees}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-green-400">
                  <UserCheck className="w-4 h-4 mr-1" />
                  <span className="text-sm">All hands on deck</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Managers</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.managers}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-purple-400">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="text-sm">Leadership team</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm font-medium">Departments</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.departments}</h3>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-orange-400">
                  <Building className="w-4 h-4 mr-1" />
                  <span className="text-sm">Diverse teams</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Employees Grid */}
          <Card className="glassmorphism-card border-white/10">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <UserCheck className="w-6 h-6 mr-3 text-blue-400" />
                Team Directory
              </CardTitle>
              <p className="text-white/60 mt-2">Manage your team members and their information</p>
            </CardHeader>
            <CardContent className="p-6">
              {filteredEmployees.length === 0 ? (
                <div className="text-center py-12">
                  <UserCheck className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white/60 mb-2">No employees found</h3>
                  <p className="text-white/40">Add your first team member to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEmployees.map((employee) => (
                    <Card key={employee._id || employee.id} className="glassmorphism-card border-white/10 hover:scale-105 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                                <UserCheck className="w-6 h-6 text-blue-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white">{employee.name}</h3>
                                <p className="text-sm text-white/60">{employee.position}</p>
                              </div>
                            </div>
                            {getStatusBadge(employee.status)}
                          </div>

                          {/* Info */}
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 text-white/80">
                              <Mail className="w-4 h-4 text-white/60" />
                              <span className="text-sm">{employee.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/80">
                              <Phone className="w-4 h-4 text-white/60" />
                              <span className="text-sm">{employee.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/80">
                              <Building className="w-4 h-4 text-white/60" />
                              <span className="text-sm">{employee.department}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/80">
                              <Calendar className="w-4 h-4 text-white/60" />
                              <span className="text-sm">Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-white/80">
                              <DollarSign className="w-4 h-4 text-white/60" />
                              <span className="text-sm font-semibold">{employee.salary}</span>
                            </div>
                          </div>

                          {/* Role Badge */}
                          <div className="flex items-center justify-between">
                            {getRoleBadge(employee.role)}
                            <div className="flex items-center space-x-2">
                              <Button size="sm" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                                <Edit className="w-4 h-4" />
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