import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LayoutDashboard, ArrowRight, Star, TrendingUp, Users, Shield, Zap, Globe, BarChart3, Lock, Sparkles } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

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
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl">
                <LayoutDashboard className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-tight">
                Monexa
              </span>
              <span className="text-xs text-purple-300 font-medium tracking-widest">PREMIUM</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 border border-purple-400/30" 
              onClick={() => navigate("/login")}
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
            <Button 
              className="group relative px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/signup")}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Floating Elements */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto pt-20 pb-32 px-6">
        {/* Floating Badges */}
        <div className="absolute top-16 left-16 hidden lg:block">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-full px-4 py-2 border border-purple-300/30">
            <div className="flex items-center space-x-2 text-sm text-purple-200">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Trusted by 10k+ businesses</span>
            </div>
          </div>
        </div>
        
        <div className="absolute top-24 right-16 hidden lg:block">
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-full px-4 py-2 border border-blue-300/30">
            <div className="flex items-center space-x-2 text-sm text-blue-200">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Enterprise Security</span>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center space-y-8 max-w-5xl">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black leading-tight">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Transform Your
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Business Dreams
              </span>
              <span className="block text-4xl md:text-5xl bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent font-medium">
                Into Reality
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-200 leading-relaxed max-w-4xl mx-auto font-light">
              Experience the future of business management with our 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"> AI-powered platform </span>
              that turns complexity into simplicity, data into insights, and dreams into achievements.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              size="lg"
              className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-500 border border-purple-400/50"
              onClick={() => navigate("/signup")}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center space-x-3">
                <Sparkles className="w-6 h-6" />
                <span>Start Your Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="group px-12 py-6 bg-white/5 hover:bg-white/10 text-white text-lg font-semibold rounded-2xl backdrop-blur-lg border border-white/30 hover:border-white/50 shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              <span className="flex items-center space-x-3">
                <span>Watch Demo</span>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </span>
            </Button>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 w-full max-w-4xl">
          {[
            { icon: TrendingUp, value: "300%", label: "Revenue Growth", color: "from-green-400 to-emerald-400" },
            { icon: Users, value: "50K+", label: "Active Users", color: "from-blue-400 to-cyan-400" },
            { icon: BarChart3, value: "99.9%", label: "Uptime", color: "from-purple-400 to-pink-400" },
            { icon: Globe, value: "150+", label: "Countries", color: "from-orange-400 to-red-400" }
          ].map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 text-center">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-sm text-purple-200">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Superpowers
            </span>
            <span className="text-white"> for Your Business</span>
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Unlock enterprise-grade features that scale with your ambition
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: "AI-Powered Analytics",
              description: "Advanced machine learning algorithms analyze your data to predict trends and optimize performance automatically.",
              gradient: "from-purple-500 to-pink-500",
              bgGradient: "from-purple-500/10 to-pink-500/10"
            },
            {
              icon: Users,
              title: "Smart CRM",
              description: "Intelligent customer relationship management with automated workflows and predictive insights.",
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-500/10 to-cyan-500/10"
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Built with cutting-edge technology for instant responses and real-time collaboration.",
              gradient: "from-yellow-500 to-orange-500",
              bgGradient: "from-yellow-500/10 to-orange-500/10"
            },
            {
              icon: Shield,
              title: "Fort Knox Security",
              description: "Military-grade encryption and enterprise security protocols protect your valuable data.",
              gradient: "from-green-500 to-emerald-500",
              bgGradient: "from-green-500/10 to-emerald-500/10"
            },
            {
              icon: Globe,
              title: "Global Scale",
              description: "Multi-currency, multi-language support with global compliance and localization.",
              gradient: "from-indigo-500 to-purple-500",
              bgGradient: "from-indigo-500/10 to-purple-500/10"
            },
            {
              icon: Lock,
              title: "Premium Support",
              description: "24/7 priority support with dedicated account managers and instant assistance.",
              gradient: "from-red-500 to-pink-500",
              bgGradient: "from-red-500/10 to-pink-500/10"
            }
          ].map((feature, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              <div className={`relative h-full bg-gradient-to-br ${feature.bgGradient} backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105`}>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-2xl`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-purple-200 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white">
                  Ready to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dominate</span> Your Market?
                </h2>
                <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                  Join the elite circle of businesses that chose excellence. Transform your operations, 
                  amplify your growth, and leave your competition wondering what happened.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  size="lg"
                  className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-500 border border-purple-400/50"
                  onClick={() => navigate("/signup")}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center space-x-3">
                    <Sparkles className="w-6 h-6" />
                    <span>Start Your Empire</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-purple-300 mb-2">No credit card required</p>
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-purple-200 ml-2">Trusted by 50,000+ businesses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra Modern Footer */}
      <footer className="relative z-10 w-full mt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <LayoutDashboard className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Monexa
              </span>
            </div>
            
            <p className="text-purple-300 max-w-2xl mx-auto">
              Empowering businesses worldwide with next-generation management solutions. 
              Built with passion, powered by innovation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-purple-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            
            <div className="pt-8 border-t border-white/10">
              <p className="text-purple-400 text-sm">
                © 2025 Monexa. All rights reserved. Crafted with 
                <span className="text-red-400 mx-1">♥</span> 
                for ambitious entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}