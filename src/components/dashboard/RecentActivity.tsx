import { useEffect, useState } from "react";
import { FileText, Users, Package, DollarSign } from "lucide-react";

const ICONS: Record<string, any> = {
  invoice: FileText,
  customer: Users,
  product: Package,
  payment: DollarSign,
};

interface Activity {
  _id: string;
  type: "invoice" | "customer" | "product" | "payment";
  action: string;
  details: string;
  time: string; // ISO string from backend
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      console.error("Failed to load activities", err);
    }
    setLoading(false);
  };

  return (
    <div className="business-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest updates from your business</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          ) : (
            activities.map((activity) => {
              const Icon = ICONS[activity.type] || FileText;
              return (
                <div key={activity._id} className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === "payment"
                        ? "bg-success/10 text-success"
                        : activity.type === "customer"
                        ? "bg-primary/10 text-primary"
                        : activity.type === "product"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.time).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
