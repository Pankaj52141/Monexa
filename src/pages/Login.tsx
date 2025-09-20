import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, X } from "lucide-react";
interface LoginProps {
  onLogin?: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [showCard, setShowCard] = useState<null | "login" | "signup">(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    if (showCard === "signup") {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        setError("All fields required"); setLoading(false); return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match"); setLoading(false); return;
      }
      try {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
        });
        const data = await res.json();
        if (data.error) setError(data.error);
        else {
          setShowCard(null);
          setForm({ name: "", email: "", password: "", confirmPassword: "" });
          onLogin?.();
          navigate("/");
        }
      } catch { setError("Server error"); }
      setLoading(false);
    } else {
      if (!form.email || !form.password) {
        setError("Email and password required"); setLoading(false); return;
      }
      try {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password })
        });
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("token", data.token);
          setShowCard(null);
          setForm({ name: "", email: "", password: "", confirmPassword: "" });
          onLogin?.();
          navigate("/");
        } else setError(data.error || "Login failed");
      } catch { setError("Server error"); }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex flex-col items-center justify-start p-0 relative">
      {/* Top bar with logo and buttons */}
      <div className="w-full flex items-center justify-between px-8 py-6 bg-card shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <LayoutDashboard className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-card-foreground tracking-tight">BizManager</span>
        </div>
        <div className="flex space-x-4">
          <Button className="px-6 py-2 rounded-full font-semibold text-lg bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:scale-105 transition-transform" onClick={() => setShowCard("login")}>Login</Button>
          <Button className="px-6 py-2 rounded-full font-semibold text-lg bg-gradient-to-r from-secondary to-primary text-white shadow-lg hover:scale-105 transition-transform" variant="outline" onClick={() => setShowCard("signup")}>Sign Up</Button>
        </div>
      </div>

      {/* Overlay card for login/signup */}
      {showCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>{showCard === "login" ? "Login" : "Sign Up"}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => { setShowCard(null); setError(""); setForm({ name: "", email: "", password: "", confirmPassword: "" }); }}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {showCard === "signup" && (
                <Input name="name" placeholder="Full Name" value={form.name} onChange={handleInput} />
              )}
              <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleInput} />
              <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleInput} />
              {showCard === "signup" && (
                <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleInput} />
              )}
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <Button className="w-full mt-2" onClick={handleSubmit} disabled={loading}>
                {loading ? "Please wait..." : showCard === "login" ? "Login" : "Sign Up"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Advertisement and features section */}
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mt-16 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 text-center">Unlock Premium Business Management</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 text-center max-w-2xl">
          Access powerful features to manage your business, track invoices, customers, employees, and products—all in one place. Upgrade to premium for exclusive tools and insights that help you grow and succeed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
          <div className="bg-card rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-primary mb-2">📈</span>
            <h2 className="text-xl font-semibold mb-2">Analytics Dashboard</h2>
            <p className="text-sm text-muted-foreground text-center">Visualize your business performance and make data-driven decisions.</p>
          </div>
          <div className="bg-card rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-primary mb-2">🤝</span>
            <h2 className="text-xl font-semibold mb-2">Customer Management</h2>
            <p className="text-sm text-muted-foreground text-center">Easily track, engage, and grow your customer base with smart tools.</p>
          </div>
          <div className="bg-card rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-primary mb-2">💼</span>
            <h2 className="text-xl font-semibold mb-2">Team Collaboration</h2>
            <p className="text-sm text-muted-foreground text-center">Empower your employees and streamline teamwork for better results.</p>
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center">
          <h3 className="text-2xl font-bold text-primary mb-2">Premium Access Required</h3>
          <p className="text-base text-muted-foreground">Sign up or log in to unlock all features and manage your business like a pro!</p>
        </div>
      </div>
    </div>
  );
}