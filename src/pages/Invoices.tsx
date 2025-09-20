import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  FileText,
  Eye,
  Edit,
  Download,
  Filter,
} from "lucide-react";
import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/invoices`;

type Invoice = {
  _id?: string;
  id?: string;
  type: "customer" | "employee" | "other";
  recipient: string;
  amount: string;
  status: string;
  date: string;
  dueDate: string;
};

function getStatusBadge(status: string) {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-success/10 text-success hover:bg-success/20">
          Paid
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
          Pending
        </Badge>
      );
    case "overdue":
      return (
        <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
          Overdue
        </Badge>
      );
    case "draft":
      return <Badge className="bg-muted text-muted-foreground">Draft</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

export default function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
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
      const data = await res.json();
      setInvoices(data);
    } catch {
      setError("Failed to fetch invoices");
    }
    setLoading(false);
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddInvoice = async (e: React.FormEvent) => {
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
          type: "customer",
          recipient: "",
          amount: "",
          status: "pending",
          date: "",
          dueDate: "",
        });
        fetchInvoices();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add invoice");
      }
    } catch {
      setError("Server error");
    }
    setLoading(false);
  };

  // Download invoice as text file
  const handleDownload = (invoice: Invoice) => {
    const content = `Invoice ID: ${invoice._id || invoice.id}\nType: ${
      invoice.type
    }\nRecipient: ${invoice.recipient}\nAmount: ${invoice.amount}\nStatus: ${
      invoice.status
    }\nDate: ${invoice.date}\nDue Date: ${invoice.dueDate}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice_${invoice._id || invoice.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Modal close
  const closeModal = () => {
    setSelectedInvoice(null);
    setEditMode(false);
  };

  return (
    <AppLayout currentPage="Invoices">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
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
            New Invoice
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-card-foreground">
              {invoices.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Invoices</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-success">
              $
              {invoices
                .filter((i) => i.status === "paid")
                .reduce((sum, i) => sum + Number(i.amount || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Paid</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-warning">
              $
              {invoices
                .filter((i) => i.status === "pending")
                .reduce((sum, i) => sum + Number(i.amount || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="business-card text-center">
            <div className="text-2xl font-bold text-destructive">
              $
              {invoices
                .filter((i) => i.status === "overdue")
                .reduce((sum, i) => sum + Number(i.amount || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Overdue</div>
          </div>
        </div>

        {/* Add Invoice Form */}
        <form
          onSubmit={handleAddInvoice}
          className="mb-8 p-4 bg-card rounded shadow flex flex-col gap-4 max-w-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <select
              name="type"
              value={form.type}
              onChange={handleInput}
              className="border rounded px-2 py-1 col-span-2"
              required
            >
              <option value="customer">Customer Invoice</option>
              <option value="employee">Employee Invoice</option>
              <option value="other">Other Invoice</option>
            </select>
            <Input
              name="recipient"
              placeholder={
                form.type === "customer"
                  ? "Customer Name"
                  : form.type === "employee"
                  ? "Employee Name"
                  : "Recipient"
              }
              value={form.recipient}
              onChange={handleInput}
              required
            />
            <Input
              name="amount"
              placeholder="Amount"
              type="number"
              value={form.amount}
              onChange={handleInput}
              required
            />
            <Input
              name="date"
              type="date"
              value={form.date}
              onChange={handleInput}
              required
            />
            <Input
              name="dueDate"
              type="date"
              value={form.dueDate}
              onChange={handleInput}
              required
            />
            <select
              name="status"
              value={form.status}
              onChange={handleInput}
              className="border rounded px-2 py-1 col-span-2"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Invoice"}
          </Button>
          {error && <div className="text-destructive text-sm">{error}</div>}
        </form>

        {/* Invoices Table */}
        <div className="business-card">
          <div className="overflow-x-auto">
            {invoices.length === 0 ? (
              <p className="text-center py-6 text-muted-foreground">
                No invoices found
              </p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-card-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Invoice ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Recipient
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                      Due Date
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice._id || invoice.id}
                      className="border-b border-card-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-medium text-card-foreground">
                            {invoice._id || invoice.id}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-card-foreground">
                        {invoice.type}
                      </td>
                      <td className="py-4 px-4 text-card-foreground">
                        {invoice.recipient}
                      </td>
                      <td className="py-4 px-4 font-medium text-card-foreground">
                        {invoice.amount}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {invoice.date}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        {invoice.dueDate}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setEditMode(false);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedInvoice(invoice);
                              setEditMode(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(invoice)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Invoice Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-xl"
                onClick={closeModal}
              >
                &times;
              </button>
              {editMode ? (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    setError("");
                    try {
                      const token = localStorage.getItem("token");
                      const res = await fetch(
                        `${API_URL}/${selectedInvoice._id || selectedInvoice.id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(selectedInvoice),
                        }
                      );
                      if (res.ok) {
                        closeModal();
                        fetchInvoices();
                      } else {
                        const data = await res.json();
                        setError(data.error || "Failed to update invoice");
                      }
                    } catch {
                      setError("Server error");
                    }
                    setLoading(false);
                  }}
                  className="flex flex-col gap-3"
                >
                  <h2 className="text-lg font-bold mb-2">Edit Invoice</h2>
                  <Input
                    name="recipient"
                    value={selectedInvoice.recipient}
                    onChange={(e) =>
                      setSelectedInvoice({
                        ...selectedInvoice,
                        recipient: e.target.value,
                      })
                    }
                    required
                  />
                  <Input
                    name="amount"
                    type="number"
                    value={selectedInvoice.amount}
                    onChange={(e) =>
                      setSelectedInvoice({
                        ...selectedInvoice,
                        amount: e.target.value,
                      })
                    }
                    required
                  />
                  <select
                    name="status"
                    value={selectedInvoice.status}
                    onChange={(e) =>
                      setSelectedInvoice({
                        ...selectedInvoice,
                        status: e.target.value,
                      })
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="draft">Draft</option>
                  </select>
                  <Input
                    name="date"
                    type="date"
                    value={selectedInvoice.date}
                    onChange={(e) =>
                      setSelectedInvoice({
                        ...selectedInvoice,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                  <Input
                    name="dueDate"
                    type="date"
                    value={selectedInvoice.dueDate}
                    onChange={(e) =>
                      setSelectedInvoice({
                        ...selectedInvoice,
                        dueDate: e.target.value,
                      })
                    }
                    required
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                  {error && (
                    <div className="text-destructive text-sm">{error}</div>
                  )}
                </form>
              ) : (
                <div>
                  <h2 className="text-lg font-bold mb-2">Invoice Details</h2>
                  <div className="mb-2">
                    <b>Type:</b> {selectedInvoice.type}
                  </div>
                  <div className="mb-2">
                    <b>Recipient:</b> {selectedInvoice.recipient}
                  </div>
                  <div className="mb-2">
                    <b>Amount:</b> {selectedInvoice.amount}
                  </div>
                  <div className="mb-2">
                    <b>Status:</b> {selectedInvoice.status}
                  </div>
                  <div className="mb-2">
                    <b>Date:</b> {selectedInvoice.date}
                  </div>
                  <div className="mb-2">
                    <b>Due Date:</b> {selectedInvoice.dueDate}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
