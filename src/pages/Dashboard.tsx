import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { DollarSign, TrendingUp, Users, UserCheck, Crown, ShieldCheck } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/dashboard`;

export default function Dashboard({ onLogout }: { onLogout?: () => void }) {
  const [stats, setStats] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setStats(data.stats);
      setRevenueData(data.revenueData);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  return (
    <AppLayout currentPage="Dashboard" onLogout={onLogout}>
      <div className="space-y-6">
        {/* Total Revenue */}
        <StatsCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue || 0}`}
          icon={DollarSign}
        />

        {/* Employee Statistics */}
        <div className="business-card">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Employee Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-card-foreground">{stats?.totalEmployees || 0}</div>
              <div className="text-sm text-muted-foreground">Total Employees</div>
            </div>
            <div className="text-center">
              <UserCheck className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">{stats?.activeEmployees || 0}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <Crown className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{stats?.managers || 0}</div>
              <div className="text-sm text-muted-foreground">Managers</div>
            </div>
            <div className="text-center">
              <ShieldCheck className="h-8 w-8 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-destructive">{stats?.admins || 0}</div>
              <div className="text-sm text-muted-foreground">Admins</div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="business-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Revenue Overview</h3>
              <p className="text-sm text-muted-foreground">Monthly revenue trends</p>
            </div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
            {/* Chart integration */}
            {revenueData && revenueData.length > 0 ? (
              <RevenueChart data={revenueData} />
            ) : (
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Revenue chart will be displayed here</p>
                <p className="text-xs text-muted-foreground mt-1">Connected to your MongoDB data</p>
              </div>
            )}
          </div>
        </div>

        {/* Paid / Pending / Draft */}
        <div className="business-card">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Invoices Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">${stats?.paid || 0}</div>
              <div className="text-sm text-muted-foreground">Paid Invoices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">${stats?.pending || 0}</div>
              <div className="text-sm text-muted-foreground">Pending Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">${stats?.draft || 0}</div>
              <div className="text-sm text-muted-foreground">Draft Invoices</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </AppLayout>
  );
}
