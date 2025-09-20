// backend/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ⚡ Secret key (use .env in production)
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// -----------------
// Database Connect
// -----------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// -----------------
// Schemas & Models
// -----------------
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: String,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  lowStock: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  status: { type: String, default: "active" },
  invoices: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  position: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const invoiceSchema = new mongoose.Schema({
  type: { type: String, enum: ["customer", "employee", "other"], required: true },
  recipient: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "overdue", "draft"], default: "pending" },
  date: { type: String, required: true },
  dueDate: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Models
const User = mongoose.model("User", userSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Employee = mongoose.model("Employee", employeeSchema);
const Product = mongoose.model("Product", productSchema);
const Invoice = mongoose.model("Invoice", invoiceSchema);

// -----------------
// Middleware
// -----------------
const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(auth.split(" ")[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// -----------------
// Auth Routes
// -----------------
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields required" });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({
      message: "User registered",
      user: { email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, user: { email: user.email, name: user.name } });
});

app.get("/api/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ user: { email: user.email, name: user.name } });
});

// -----------------
// Customer Routes
// -----------------
app.get("/api/customers", authMiddleware, async (req, res) => {
  const customers = await Customer.find({ userId: req.user.userId }).sort({ createdAt: -1 });
  res.json(customers);
});

app.post("/api/customers", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      userId: req.user.userId
    });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: "Error creating customer" });
  }
});

app.put("/api/customers/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: "Error updating customer" });
  }
});

app.delete("/api/customers/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting customer" });
  }
});

// -----------------
// Invoice Routes
// -----------------
const INVOICE_API = "/api/invoices";

app.get(INVOICE_API, authMiddleware, async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

app.post(INVOICE_API, authMiddleware, async (req, res) => {
  try {
    const invoice = await Invoice.create({
      ...req.body,
      userId: req.user.userId
    });
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: "Error adding invoice" });
  }
});

app.put(`${INVOICE_API}/:id`, authMiddleware, async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: "Error updating invoice" });
  }
});

app.delete(`${INVOICE_API}/:id`, authMiddleware, async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json({ message: "Invoice deleted" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting invoice" });
  }
});

// -----------------
// Dashboard Route
// -----------------
app.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    
    // Total revenue: sum of paid invoice amounts for this user
    const revenueAgg = await Invoice.aggregate([
      { $match: { status: "paid", userId: userId } },
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.sum || 0;

    // Monthly revenue trend for this user
    const revenueDataAgg = await Invoice.aggregate([
      { $match: { status: "paid", userId: userId } },
      {
        $group: {
          _id: { $month: { $toDate: "$date" } },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const formattedRevenueData = revenueDataAgg.map(r => ({
      month: monthNames[r._id - 1],
      revenue: r.revenue,
    }));

    // Breakdown of paid, pending, draft
    const statusBreakdownAgg = await Invoice.aggregate([
      { $match: { status: { $in: ["paid", "pending", "draft"] } } },
      { $group: { _id: "$status", sum: { $sum: "$amount" } } },
    ]);
    const breakdown = { paid: 0, pending: 0, draft: 0 };
    statusBreakdownAgg.forEach(r => {
      breakdown[r._id] = r.sum;
    });

    res.json({
      stats: {
        totalRevenue,
        ...breakdown,
      },
      revenueData: formattedRevenueData,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});



// -----------------
// Activities (Mock)
// -----------------
app.get("/api/activities", authMiddleware, async (req, res) => {
  const activities = [
    { _id: "1", type: "customer", action: "added", details: "New customer registered", time: new Date().toISOString() },
    { _id: "2", type: "product", action: "updated", details: "Product stock updated", time: new Date().toISOString() },
    { _id: "3", type: "invoice", action: "created", details: "Invoice #123 created", time: new Date().toISOString() },
  ];
  res.json(activities);
});

// -----------------
// Product Routes
// -----------------
const PRODUCT_API = "/api/products";

app.get(PRODUCT_API, authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post(PRODUCT_API, authMiddleware, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      userId: req.user.userId
    });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Error adding product" });
  }
});

app.put(`${PRODUCT_API}/:id`, authMiddleware, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Error updating product" });
  }
});

app.delete(`${PRODUCT_API}/:id`, authMiddleware, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting product" });
  }
});

// -----------------
// Employee Routes
// -----------------
const EMPLOYEE_API = "/api/employees";

app.get(EMPLOYEE_API, authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

app.post(EMPLOYEE_API, authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.create({
      ...req.body,
      userId: req.user.userId
    });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: "Error adding employee" });
  }
});

app.put(`${EMPLOYEE_API}/:id`, authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: "Error updating employee" });
  }
});

app.delete(`${EMPLOYEE_API}/:id`, authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(400).json({ error: "Error deleting employee" });
  }
});

// -----------------
// Start Server
// -----------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});