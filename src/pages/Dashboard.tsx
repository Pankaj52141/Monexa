import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { DollarSign, TrendingUp, Users, UserCheck, Crown, ShieldCheck, LayoutDashboard, LogOut, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAppStore } from '@/store/appStore';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/dashboard`;

export default function Dashboard({ onLogout }: { onLogout?: () => void }) {
  const navigate = useNavigate();
  const { logout } = useAppStore();
  
  const [stats, setStats] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
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
      setStats(data.stats);
      setRevenueData(data.revenueData);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
      // Set empty data when API fails instead of mock data
      setStats({
        totalRevenue: 0,
        totalCustomers: 0,
        totalEmployees: 0,
        activeInvoices: 0
      });
      setRevenueData([]);
    }
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
                <span className="text-xs text-purple-300 font-medium tracking-widest">PREMIUM DASHBOARD</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 ml-12">
              <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/20">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link to="/customers" className="flex items-center space-x-2 px-4 py-2 text-purple-300 font-medium hover:text-white transition-colors duration-300">
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
            <Button
              onClick={onLogout}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
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
              <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-white/10 backdrop-blur-xl rounded-xl text-white font-medium">
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/customers" className="flex items-center space-x-3 px-4 py-3 text-purple-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300">
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
              Premium <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-purple-200 text-lg">Real-time insights into your business performance</p>
          </div>

          {/* Total Revenue Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-200">Total Revenue</h3>
                      <p className="text-sm text-purple-300">All time earnings</p>
                    </div>
                  </div>
                  <div className="text-4xl font-black text-white mb-2">
                    ${stats?.totalRevenue || 0}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl flex items-center justify-center">
                    <TrendingUp className="h-12 w-12 text-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Statistics */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Employee Overview</h3>
                  <p className="text-purple-200">Team performance metrics</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10">
                  <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">{stats?.totalEmployees || 0}</div>
                  <div className="text-sm text-purple-300">Total Employees</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10">
                  <UserCheck className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-green-400">{stats?.activeEmployees || 0}</div>
                  <div className="text-sm text-purple-300">Active</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10">
                  <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-yellow-400">{stats?.managers || 0}</div>
                  <div className="text-sm text-purple-300">Managers</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10">
                  <ShieldCheck className="h-8 w-8 text-red-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-red-400">{stats?.admins || 0}</div>
                  <div className="text-sm text-purple-300">Admins</div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
                    <p className="text-purple-200">Monthly revenue trends</p>
                  </div>
                </div>
                <Sparkles className="h-6 w-6 text-purple-400" />
              </div>
              <div className="h-64 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 flex items-center justify-center p-6">
                {revenueData && revenueData.length > 0 ? (
                  <RevenueChart data={revenueData} />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-purple-400" />
                    </div>
                    <p className="text-purple-200 font-medium">Revenue chart will be displayed here</p>
                    <p className="text-sm text-purple-300 mt-1">Connected to your MongoDB data</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Invoices Summary */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-600/20 via-yellow-600/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Invoices Summary</h3>
                  <p className="text-purple-200">Payment status overview</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl backdrop-blur-xl border border-green-500/20">
                  <div className="text-3xl font-black text-green-400 mb-2">${stats?.paid || 0}</div>
                  <div className="text-sm text-green-300 font-medium">Paid Invoices</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl backdrop-blur-xl border border-yellow-500/20">
                  <div className="text-3xl font-black text-yellow-400 mb-2">${stats?.pending || 0}</div>
                  <div className="text-sm text-yellow-300 font-medium">Pending Payments</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl backdrop-blur-xl border border-blue-500/20">
                  <div className="text-3xl font-black text-blue-400 mb-2">${stats?.draft || 0}</div>
                  <div className="text-sm text-blue-300 font-medium">Draft Invoices</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <RecentActivity />
            </div>
          </div>
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
              <span className="text-xs text-purple-400 font-medium">BUSINESS INTELLIGENCE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
