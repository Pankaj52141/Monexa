import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Package,
  Edit,
  Trash2,
  AlertTriangle,
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

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/products`;

function getStockBadge(stock, lowStock) {
  if (stock === 0) {
    return (
      <Badge className="bg-destructive/10 text-destructive">
        Out of Stock
      </Badge>
    );
  }
  if (lowStock) {
    return (
      <Badge className="bg-warning/10 text-warning">Low Stock</Badge>
    );
  }
  return (
    <Badge className="bg-success/10 text-success">In Stock</Badge>
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    category: "",
    status: "active",
    lowStock: false,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("Failed to fetch products");
    }
    setLoading(false);
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      sku: "",
      price: "",
      stock: "",
      category: "",
      status: "active",
      lowStock: false,
    });
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const url = editingProduct
        ? `${API_URL}/${editingProduct.id}`
        : API_URL;
      const method = editingProduct ? "PUT" : "POST";

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
        fetchProducts();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save product");
      }
    } catch {
      setError("Server error");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch {
      setError("Failed to delete product");
    }
  };

  // Derived stats
  const totalProducts = products.length;
  const inStock = products.filter((p) => p.stock > 0 && !p.lowStock).length;
  const lowStockCount = products.filter((p) => p.lowStock && p.stock > 0).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  // Filtering & search
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ? true : p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout currentPage="Products">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
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

          {/* Add/Edit Product Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="action-btn-primary">
                <Plus className="h-4 w-4" />
                {editingProduct ? "Edit Product" : "Add Product"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Add Product"}
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
                  name="sku"
                  placeholder="SKU"
                  value={form.sku}
                  onChange={handleInput}
                  required
                />
                <Input
                  name="price"
                  placeholder="Price"
                  type="number"
                  value={form.price}
                  onChange={handleInput}
                />
                <Input
                  name="stock"
                  placeholder="Stock"
                  type="number"
                  value={form.stock}
                  onChange={handleInput}
                />
                <Input
                  name="category"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleInput}
                />
                <Select
                  value={form.status}
                  onValueChange={(val) =>
                    setForm({ ...form, status: val })
                  }
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
                  ) : editingProduct ? (
                    "Update Product"
                  ) : (
                    "Add Product"
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
              {totalProducts}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Products
            </div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-success">{inStock}</div>
            <div className="text-sm text-muted-foreground">In Stock</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-warning">
              {lowStockCount}
            </div>
            <div className="text-sm text-muted-foreground">Low Stock</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-destructive">
              {outOfStock}
            </div>
            <div className="text-sm text-muted-foreground">Out of Stock</div>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockCount > 0 && (
          <div className="business-card border-l-4 border-l-warning bg-warning/5">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-card-foreground">
                  Low Stock Alert
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {lowStockCount} product
                  {lowStockCount > 1 ? "s are" : " is"} running low on
                  stock. Consider restocking soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading/Error */}
        {loading && (
          <div className="flex justify-center items-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        {error && !loading && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {/* Products Table */}
        <div className="business-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    SKU
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id || product.id}
                    className="border-b border-card-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-card-foreground">
                            {product.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground font-mono text-sm">
                      {product.sku}
                    </td>
                    <td className="py-4 px-4 font-medium text-card-foreground">
                      ${product.price}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-medium ${
                            product.stock === 0
                              ? "text-destructive"
                              : product.lowStock
                              ? "text-warning"
                              : "text-success"
                          }`}
                        >
                          {product.stock}
                        </span>
                        {product.lowStock && (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="py-4 px-4">
                      {getStockBadge(product.stock, product.lowStock)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingProduct(product);
                            setForm(product);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
