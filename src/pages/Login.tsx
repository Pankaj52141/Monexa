import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, ArrowLeft, LayoutDashboard, Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAppStore } from '@/store/appStore'

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { login } = useAppStore()
  
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Make real API call to backend login endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Real authentication successful
        const { token, user } = data
        
        // Update Zustand store with real user data and token
        login(user, token)
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        
        navigate('/dashboard')
      } else {
        // Handle authentication errors
        setError(data.error || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Network error. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-3000"></div>
      </div>

      {/* Glassmorphism Navigation */}
      <nav className="relative z-50 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl border-b border-white/20"></div>
        <div className="relative flex items-center justify-between px-8 py-6">
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity group">
            <ArrowLeft className="h-5 w-5 text-purple-300 group-hover:text-white transition-colors" />
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
                <span className="text-xs text-purple-300 font-medium tracking-widest">PREMIUM</span>
              </div>
            </div>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Login Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-20">
        <div className="w-full max-w-md">
          {/* Glassmorphism Login Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative group inline-block mb-4">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl mx-auto">
                    <LayoutDashboard className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-black text-white mb-2">
                  Welcome <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Back</span>
                </h1>
                <p className="text-purple-200">Sign in to your premium account</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-purple-200 flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span>Email Address</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleInput}
                      className="h-12 bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400 focus:ring-purple-400/20"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-purple-200 flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleInput}
                      className="h-12 bg-white/5 border-white/20 text-white placeholder:text-purple-300 backdrop-blur-xl rounded-xl focus:border-purple-400 focus:ring-purple-400/20 pr-12"
                      autoComplete="current-password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-12 hover:bg-white/10 text-purple-300 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 backdrop-blur-xl">
                    <p className="text-red-300 text-sm text-center">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden" 
                    disabled={loading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    {loading ? (
                      <div className="flex items-center space-x-2 relative z-10">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>Sign In</span>
                        <Sparkles className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>

              {/* Additional Options */}
              <div className="space-y-4 mt-6">
                <Button 
                  variant="ghost" 
                  className="w-full text-purple-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Forgot your password?
                </Button>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <span className="text-xs text-purple-300 font-medium">OR</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
                
                <p className="text-center text-purple-200">
                  Don't have an account?{" "}
                  <Link to="/" className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text hover:from-purple-300 hover:to-pink-300 font-semibold transition-all duration-300">
                    Get started free
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border-t border-white/20 px-8 py-4">
          <div className="flex items-center justify-center space-x-4">
            <p className="text-xs text-purple-300">
              © 2025 <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Monexa Premium</span>. All rights reserved.
            </p>
            <div className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span className="text-xs text-purple-400 font-medium">SECURE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}