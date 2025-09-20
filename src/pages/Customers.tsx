import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Filter,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/customers`;

export default function Customers({ onLogout }: { onLogout?: () => void }) {
  const [customers, setCustomers] = useState([]);
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
        setError("Unauthorized. Please log in again.");
        setCustomers([]);
        setLoading(false);
        return;
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
      const url = editingCustomer
        ? `${API_URL}/${editingCustomer.id}`
        : API_URL;
      const method = editingCustomer ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        resetForm();
        fetchCustomers();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save customer");
      }
    } catch {
      setError("Server error");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCustomers();
    } catch {
      setError("Failed to delete customer");
    }
  };

  // Derived stats
  const totalCustomers = customers.length;
  const active = customers.filter((c) => c.status === "active").length;
  const inactive = totalCustomers - active;
  const totalRevenue = customers.reduce(
    (sum, c) => sum + (c.totalSpent || 0),
    0
  );

  // Filtering & search
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ? true : c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout currentPage="Customers" onLogout={onLogout}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-10 w-72"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add/Edit Customer Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="action-btn-primary">
                <Plus className="h-4 w-4" />
                {editingCustomer ? "Edit Customer" : "Add Customer"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCustomer ? "Edit Customer" : "Add Customer"}
                </DialogTitle>
              </DialogHeader>
              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                />
                <Input
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleInput}
                />
                <Select
                  value={form.status}
                  onValueChange={(val) => setForm({ ...form, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : editingCustomer ? (
                    "Update Customer"
                  ) : (
                    "Add Customer"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-card-foreground">
              {totalCustomers}
            </div>
            <div className="text-sm text-muted-foreground">Total Customers</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-success">{active}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-warning">{inactive}</div>
            <div className="text-sm text-muted-foreground">Inactive</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-primary">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Revenue</div>
          </div>
        </div>

        {/* Loading/Error */}
        {loading && (
          <div className="flex justify-center items-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        {error && !loading && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div
              key={customer._id || customer.id}
              className="business-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12 bg-primary/10">
                    <AvatarFallback className="text-primary font-semibold">
                      {customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      {customer.name}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        customer.status === "active"
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingCustomer(customer);
                      setForm(customer);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(customer.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{customer.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-card-border">
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="font-medium text-card-foreground">
                      {customer.totalInvoices || 0}
                    </div>
                    <div className="text-muted-foreground">Invoices</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-success">
                      ${customer.totalSpent?.toLocaleString() || 0}
                    </div>
                    <div className="text-muted-foreground">Total Spent</div>
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
