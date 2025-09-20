import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Mail,
  Phone,
  Edit,
  Trash2,
  User,
  Filter,
} from "lucide-react";

import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/employees`;

const getRoleBadge = (role: string) => {
  switch (role) {
    case "admin":
      return (
        <Badge className="bg-primary/10 text-primary font-medium">Admin</Badge>
      );
    case "manager":
      return (
        <Badge className="bg-success/10 text-success font-medium">Manager</Badge>
      );
    case "employee":
      return (
        <Badge className="bg-muted text-muted-foreground font-medium">
          Employee
        </Badge>
      );
    default:
      return <Badge>{role}</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  return status === "active" ? (
    <Badge className="bg-success/10 text-success font-medium">Active</Badge>
  ) : (
    <Badge className="bg-muted text-muted-foreground font-medium">
      Inactive
    </Badge>
  );
};

export default function Employees() {
  const [employees, setEmployees] = useState<any[]>([]);
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
      const data = await res.json();
      setEmployees(data);
    } catch {
      setError("Failed to fetch employees");
    }
    setLoading(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({
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
        fetchEmployees();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add employee");
      }
    } catch {
      setError("Server error");
    }
    setLoading(false);
  };

  // Summary calculations
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === "active").length;
  const inactiveEmployees = employees.filter(e => e.status === "inactive").length;
  const managers = employees.filter(e => e.role === "manager").length;

  return (
    <AppLayout currentPage="Employees">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-10 w-72"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button className="action-btn-primary">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-card-foreground">{totalEmployees}</div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-success">{activeEmployees}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-primary">{managers}</div>
            <div className="text-sm text-muted-foreground">Managers</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-warning">{inactiveEmployees}</div>
            <div className="text-sm text-muted-foreground">Inactive</div>
          </div>
        </div>

        {/* Add Employee Form */}
        <form
          onSubmit={handleAddEmployee}
          className="mb-8 p-4 bg-card rounded shadow flex flex-col gap-4 max-w-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInput}
              required
            />
            <Input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInput}
              required
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleInput}
              required
            />
            <Input
              name="position"
              placeholder="Position"
              value={form.position}
              onChange={handleInput}
              required
            />
            <Input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleInput}
              required
            />
            <Input
              name="salary"
              placeholder="Salary"
              value={form.salary}
              onChange={handleInput}
              required
            />
            <Input
              name="joinDate"
              placeholder="Join Date"
              value={form.joinDate}
              onChange={handleInput}
              required
            />
            <select
              name="role"
              value={form.role}
              onChange={handleInput}
              className="border rounded px-2 py-1"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <select
              name="status"
              value={form.status}
              onChange={handleInput}
              className="border rounded px-2 py-1"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Employee"}
          </Button>
          {error && <div className="text-destructive text-sm">{error}</div>}
        </form>

        {/* Employees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div
              key={employee._id || employee.id}
              className="business-card hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 bg-primary/10">
                    <AvatarFallback className="text-primary font-semibold">
                      {employee.name
                        ? employee.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      {employee.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {employee.position}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{employee.department}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center justify-between mb-4">
                {getRoleBadge(employee.role)}
                {getStatusBadge(employee.status)}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-card-border">
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-muted-foreground">Joined</div>
                    <div className="font-medium text-card-foreground">
                      {employee.joinDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground">Salary</div>
                    <div className="font-medium text-success">
                      {employee.salary}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
