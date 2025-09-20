import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  iconBg?: string; // NEW: allow custom background for icon
  children?: React.ReactNode; // NEW: extra content inside card
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  iconBg = "bg-primary/10", // default
  children,
}: StatsCardProps) {
  return (
    <motion.div
      className={cn("stats-card", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground">{value}</p>
          {trend && (
            <p className="text-sm flex items-center space-x-1">
              <span
                className={cn(
                  "font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}
              </span>
              <span className="text-muted-foreground">from last month</span>
            </p>
          )}
          {children}
        </div>
        <div className="flex-shrink-0">
          <div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              iconBg
            )}
            aria-label={`${title} icon`}
          >
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
