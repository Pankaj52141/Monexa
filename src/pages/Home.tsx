import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LayoutDashboard, ArrowRight, Star, TrendingUp, Users, Shield, Zap, Globe, BarChart3, Lock, Sparkles } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-100 dark:bg-black">
      {/* Theme-Aware Neural Network Background */}
      <div className="absolute inset-0">
        
        {/* Light Mode Background */}
        <div className="dark:hidden absolute inset-0">
          {/* Light mode gradient base - darker for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-blue-100 to-purple-100"></div>
          
          {/* Light mode central core - enhanced visibility */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 bg-gradient-radial from-blue-400/50 via-purple-400/35 to-transparent rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-radial from-indigo-300/40 via-blue-200/25 to-transparent rounded-full animate-pulse animation-delay-1000"></div>
              <div className="absolute inset-8 bg-gradient-radial from-purple-200/45 via-blue-100/30 to-transparent rounded-full animate-pulse animation-delay-2000"></div>
              <div className="absolute inset-12 bg-gradient-radial from-white/60 via-transparent to-transparent rounded-full animate-pulse animation-delay-500"></div>
              
              {/* Additional energy rings */}
              <div className="absolute inset-16 bg-gradient-radial from-cyan-300/35 via-transparent to-transparent rounded-full animate-pulse animation-delay-1500"></div>
              <div className="absolute inset-20 bg-gradient-radial from-pink-300/30 via-transparent to-transparent rounded-full animate-pulse animation-delay-2500"></div>
            </div>
          </div>
          
          {/* Light mode energy waves - enhanced visibility */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform -translate-y-1/2 animate-light-wave shadow-lg shadow-blue-500/30"></div>
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent transform -translate-y-1/2 animate-light-wave animation-delay-500 shadow-lg shadow-purple-400/30"></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-600/60 to-transparent transform -translate-y-1/2 animate-light-wave animation-delay-1000 shadow-lg shadow-indigo-600/40"></div>
            <div className="absolute top-0 left-1/2 w-3 h-full bg-gradient-to-b from-transparent via-purple-500/40 to-transparent transform -translate-x-1/2 animate-light-wave animation-delay-3000"></div>
            
            {/* Additional light mode wave layers - enhanced */}
            <div className="absolute top-1/2 left-0 w-full h-6 bg-gradient-to-r from-transparent via-blue-400/25 to-purple-400/25 transform -translate-y-1/2 animate-light-wave animation-delay-1500"></div>
            <div className="absolute top-1/2 left-0 w-full h-12 bg-gradient-to-r from-blue-300/15 via-purple-300/20 to-indigo-300/15 transform -translate-y-1/2 animate-light-wave animation-delay-2000"></div>
            
            {/* Diagonal energy lines for more dramatic effect */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transform rotate-12 animate-light-wave animation-delay-2500"></div>
              <div className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500/30 to-transparent transform -rotate-12 animate-light-wave animation-delay-3500"></div>
            </div>
          </div>
          
          {/* Light mode particles - enhanced with more dramatic effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-light-sparkle opacity-90 shadow-lg shadow-blue-400/50"></div>
            <div className="absolute top-32 right-32 w-3 h-3 bg-purple-400 rounded-full animate-light-sparkle animation-delay-1000 opacity-80 shadow-lg shadow-purple-400/50"></div>
            <div className="absolute bottom-40 left-40 w-5 h-5 bg-indigo-300 rounded-full animate-light-sparkle animation-delay-2000 opacity-70 shadow-lg shadow-indigo-300/50"></div>
            <div className="absolute bottom-20 right-20 w-3 h-3 bg-blue-500 rounded-full animate-light-sparkle animation-delay-3000 opacity-90 shadow-lg shadow-blue-500/50"></div>
            
            {/* Additional light mode sparkles - enhanced */}
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-purple-300 rounded-full animate-light-sparkle animation-delay-500 opacity-95 shadow-md shadow-purple-300/60"></div>
            <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-light-sparkle animation-delay-1500 opacity-85 shadow-md shadow-blue-300/60"></div>
            <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-indigo-200 rounded-full animate-light-sparkle animation-delay-2500 opacity-80 shadow-md shadow-indigo-200/60"></div>
            
            {/* Larger floating orbs */}
            <div className="absolute top-1/5 right-1/5 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-light-sparkle animation-delay-4000 opacity-70 shadow-xl shadow-cyan-400/40"></div>
            <div className="absolute bottom-1/5 left-1/5 w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-light-sparkle animation-delay-4500 opacity-75 shadow-xl shadow-pink-400/40"></div>
            
            {/* Tiny dancing sparkles - enhanced */}
            <div className="absolute top-1/5 right-1/5 w-2 h-2 bg-white rounded-full animate-light-sparkle animation-delay-4000 opacity-100 shadow-sm shadow-white/80"></div>
            <div className="absolute bottom-1/5 left-1/5 w-2 h-2 bg-blue-200 rounded-full animate-light-sparkle animation-delay-4500 opacity-95 shadow-sm shadow-blue-200/80"></div>
          </div>
          
          {/* Light mode network connections - enhanced visibility */}
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full opacity-85" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lightConnectionGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.8}} />
                  <stop offset="50%" style={{stopColor: '#8b5cf6', stopOpacity: 0.6}} />
                  <stop offset="100%" style={{stopColor: '#6366f1', stopOpacity: 0.5}} />
                </linearGradient>
                <linearGradient id="lightConnectionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#06b6d4', stopOpacity: 0.7}} />
                  <stop offset="50%" style={{stopColor: '#8b5cf6', stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 0.6}} />
                </linearGradient>
                <linearGradient id="lightConnectionGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 0.6}} />
                  <stop offset="50%" style={{stopColor: '#3b82f6', stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0.5}} />
                </linearGradient>
              </defs>
              
              {/* Enhanced connection paths */}
              <path d="M 50 150 Q 200 50 400 150 T 750 200" stroke="url(#lightConnectionGradient1)" strokeWidth="3" fill="none" className="animate-draw-path" />
              <path d="M 100 250 Q 300 150 500 250 T 800 300" stroke="url(#lightConnectionGradient2)" strokeWidth="2.5" fill="none" className="animate-draw-path animation-delay-1000" />
              <path d="M 150 100 Q 350 200 550 100 T 900 150" stroke="url(#lightConnectionGradient3)" strokeWidth="2" fill="none" className="animate-draw-path animation-delay-2000" />
              <path d="M 200 400 Q 400 300 600 400 T 850 450" stroke="url(#lightConnectionGradient1)" strokeWidth="3" fill="none" className="animate-draw-path animation-delay-3000" />
              
              {/* Additional network paths */}
              <path d="M 75 350 Q 275 250 475 350 T 775 400" stroke="url(#lightConnectionGradient2)" strokeWidth="2" fill="none" className="animate-draw-path animation-delay-4000" />
              <path d="M 300 50 Q 500 150 700 50 T 950 100" stroke="url(#lightConnectionGradient3)" strokeWidth="2.5" fill="none" className="animate-draw-path animation-delay-5000" />
            </svg>
          </div>
          
          {/* Light mode ambient effects - enhanced for better visibility */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-400/12 via-purple-300/8 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-transparent to-purple-200/40"></div>
          
          {/* Additional quantum field effects for light mode */}
          <div className="absolute inset-0 bg-gradient-to-tl from-cyan-300/20 via-transparent to-pink-300/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-blue-400/30 to-transparent rounded-full blur-xl animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-radial from-purple-400/25 to-transparent rounded-full blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 right-0 w-24 h-24 bg-gradient-radial from-pink-400/35 to-transparent rounded-full blur-xl animate-pulse animation-delay-3000"></div>
            <div className="absolute bottom-1/4 left-0 w-36 h-36 bg-gradient-radial from-cyan-400/30 to-transparent rounded-full blur-xl animate-pulse animation-delay-4000"></div>
          </div>
        </div>

        {/* Dark Mode Background - Enhanced */}
        <div className="hidden dark:block absolute inset-0">
          {/* Central Energy Core - Much Brighter */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-96 h-96">
              {/* Bright central core with multiple layers */}
              <div className="absolute inset-0 bg-gradient-radial from-orange-400/80 via-yellow-500/60 to-orange-300/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-radial from-white/60 via-orange-300/50 to-yellow-400/20 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="absolute inset-8 bg-gradient-radial from-yellow-200/70 via-orange-400/40 to-transparent rounded-full animate-pulse animation-delay-2000"></div>
              <div className="absolute inset-12 bg-gradient-radial from-white/80 via-transparent to-transparent rounded-full animate-pulse animation-delay-500"></div>
            </div>
          </div>

          {/* Dramatic Energy Waves - Much More Visible */}
          <div className="absolute inset-0">
            {/* Main horizontal energy wave */}
            <div className="absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-transparent via-orange-500/80 to-transparent transform -translate-y-1/2 animate-pulse shadow-lg shadow-orange-500/50"></div>
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent transform -translate-y-1/2 animate-pulse animation-delay-500 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/90 to-transparent transform -translate-y-1/2 animate-pulse animation-delay-1000 shadow-lg shadow-white/50"></div>
            
            {/* Additional wave layers */}
            <div className="absolute top-1/2 left-0 w-full h-6 bg-gradient-to-r from-transparent via-orange-500/40 to-cyan-400/40 transform -translate-y-1/2 animate-pulse animation-delay-1500"></div>
            <div className="absolute top-1/2 left-0 w-full h-12 bg-gradient-to-r from-orange-400/20 via-yellow-400/30 to-purple-400/20 transform -translate-y-1/2 animate-pulse animation-delay-2000"></div>
            
            {/* Vertical crossing waves */}
            <div className="absolute top-0 left-1/2 w-3 h-full bg-gradient-to-b from-transparent via-cyan-500/60 to-transparent transform -translate-x-1/2 animate-pulse animation-delay-3000"></div>
            <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-transparent via-white/80 to-transparent transform -translate-x-1/2 animate-pulse animation-delay-3500"></div>
          </div>

          {/* Enhanced Particle System */}
          <div className="absolute inset-0">
            {/* Large glowing particles */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-orange-400 rounded-full animate-float opacity-90 shadow-lg shadow-orange-400/50"></div>
            <div className="absolute top-32 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-float animation-delay-1000 opacity-80 shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute bottom-40 left-40 w-5 h-5 bg-yellow-300 rounded-full animate-float animation-delay-2000 opacity-70 shadow-lg shadow-yellow-300/50"></div>
            <div className="absolute bottom-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-3000 opacity-90 shadow-lg shadow-purple-400/50"></div>
            <div className="absolute top-60 left-1/4 w-4 h-4 bg-pink-400 rounded-full animate-float animation-delay-4000 opacity-80 shadow-lg shadow-pink-400/50"></div>
            <div className="absolute top-80 right-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-float animation-delay-5000 opacity-70 shadow-lg shadow-emerald-400/50"></div>
            
            {/* Medium particles with trails */}
            <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-orange-300 rounded-full animate-float-fast opacity-90 shadow-md shadow-orange-300/60"></div>
            <div className="absolute top-2/3 right-1/6 w-2 h-2 bg-cyan-300 rounded-full animate-float-fast animation-delay-1500 opacity-80 shadow-md shadow-cyan-300/60"></div>
            <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-yellow-200 rounded-full animate-float-fast animation-delay-3000 opacity-70 shadow-md shadow-yellow-200/60"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-purple-300 rounded-full animate-float-fast animation-delay-4500 opacity-90 shadow-md shadow-purple-300/60"></div>
            
            {/* Tiny sparkle particles */}
            <div className="absolute top-1/5 left-1/2 w-1 h-1 bg-white rounded-full animate-float-fast animation-delay-2000 opacity-100 shadow-sm shadow-white/80"></div>
            <div className="absolute top-4/5 left-1/5 w-1 h-1 bg-orange-200 rounded-full animate-float-fast animation-delay-3500 opacity-90 shadow-sm shadow-orange-200/80"></div>
            <div className="absolute top-3/5 right-1/5 w-1 h-1 bg-cyan-200 rounded-full animate-float-fast animation-delay-5000 opacity-80 shadow-sm shadow-cyan-200/80"></div>
          </div>

          {/* Enhanced Neural Network Connections */}
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#f97316', stopOpacity: 0.8}} />
                  <stop offset="50%" style={{stopColor: '#06b6d4', stopOpacity: 0.6}} />
                  <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0.4}} />
                </linearGradient>
                <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#22d3ee', stopOpacity: 0.7}} />
                  <stop offset="50%" style={{stopColor: '#fbbf24', stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 0.5}} />
                </linearGradient>
                <linearGradient id="connectionGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#ec4899', stopOpacity: 0.6}} />
                  <stop offset="50%" style={{stopColor: '#f97316', stopOpacity: 0.8}} />
                  <stop offset="100%" style={{stopColor: '#06b6d4', stopOpacity: 0.4}} />
                </linearGradient>
              </defs>
              
              {/* Complex curved connection paths */}
              <path d="M 50 150 Q 200 50 400 150 T 750 200" stroke="url(#connectionGradient1)" strokeWidth="3" fill="none" className="animate-draw-path" />
              <path d="M 100 250 Q 300 150 500 250 T 800 300" stroke="url(#connectionGradient2)" strokeWidth="2.5" fill="none" className="animate-draw-path animation-delay-1000" />
              <path d="M 150 100 Q 350 200 550 100 T 900 150" stroke="url(#connectionGradient3)" strokeWidth="2" fill="none" className="animate-draw-path animation-delay-2000" />
              <path d="M 200 400 Q 400 300 600 400 T 850 450" stroke="url(#connectionGradient1)" strokeWidth="3" fill="none" className="animate-draw-path animation-delay-3000" />
              <path d="M 75 350 Q 275 250 475 350 T 775 400" stroke="url(#connectionGradient2)" strokeWidth="2" fill="none" className="animate-draw-path animation-delay-4000" />
              
              {/* Radiating lines from center */}
              <path d="M 400 300 L 150 100" stroke="url(#connectionGradient1)" strokeWidth="1.5" fill="none" className="animate-draw-path animation-delay-1500" />
              <path d="M 400 300 L 650 150" stroke="url(#connectionGradient2)" strokeWidth="1.5" fill="none" className="animate-draw-path animation-delay-2500" />
              <path d="M 400 300 L 200 450" stroke="url(#connectionGradient3)" strokeWidth="1.5" fill="none" className="animate-draw-path animation-delay-3500" />
              <path d="M 400 300 L 600 500" stroke="url(#connectionGradient1)" strokeWidth="1.5" fill="none" className="animate-draw-path animation-delay-4500" />
            </svg>
          </div>

          {/* Enhanced Network Nodes */}
          <div className="absolute inset-0">
            {/* Large network nodes with stronger glow */}
            <div className="absolute top-1/4 left-1/5 w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full border-2 border-orange-300/70 animate-pulse-glow shadow-xl shadow-orange-400/60"></div>
            <div className="absolute top-1/3 right-1/4 w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-2 border-cyan-300/70 animate-pulse-glow animation-delay-1000 shadow-xl shadow-cyan-400/60"></div>
            <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-2 border-purple-300/70 animate-pulse-glow animation-delay-2000 shadow-xl shadow-purple-400/60"></div>
            <div className="absolute bottom-1/4 right-1/5 w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-2 border-emerald-300/70 animate-pulse-glow animation-delay-3000 shadow-xl shadow-emerald-400/60"></div>
            
            {/* Medium nodes with enhanced glow */}
            <div className="absolute top-1/6 left-1/2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse-glow animation-delay-500 shadow-lg shadow-yellow-400/50"></div>
            <div className="absolute top-2/3 left-1/6 w-5 h-5 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse-glow animation-delay-1500 shadow-lg shadow-blue-400/50"></div>
            <div className="absolute top-1/2 right-1/6 w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse-glow animation-delay-2500 shadow-lg shadow-pink-400/50"></div>
            
            {/* Small nodes */}
            <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-white/90 rounded-full animate-pulse-glow animation-delay-4000 shadow-md shadow-white/60"></div>
            <div className="absolute top-1/8 right-1/3 w-3 h-3 bg-orange-300/90 rounded-full animate-pulse-glow animation-delay-4500 shadow-md shadow-orange-300/60"></div>
          </div>

          {/* Quantum Field Effect - Enhanced */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/20"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-orange-900/20 via-transparent to-cyan-900/20"></div>
          
          {/* Strong ambient glow overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-yellow-400/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-radial from-cyan-400/15 via-transparent to-purple-500/10"></div>
        </div>
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
              <span className="text-3xl font-black bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent tracking-tight">
                Monexa
              </span>
              <span className="text-xs text-purple-600 dark:text-purple-300 font-medium tracking-widest">PREMIUM</span>
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
              className="group relative px-8 py-3 bg-slate-700/80 hover:bg-slate-600/90 dark:bg-white/10 dark:hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm border border-slate-500/50 dark:border-white/30 hover:border-slate-400 dark:hover:border-white/50 shadow-2xl transform hover:scale-105 transition-all duration-300"
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
          <div className="bg-gradient-to-r from-slate-700/80 to-slate-600/80 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur-lg rounded-full px-4 py-2 border border-slate-500/50 dark:border-purple-300/30">
            <div className="flex items-center space-x-2 text-sm text-slate-100 dark:text-purple-200">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Trusted by 10k+ businesses</span>
            </div>
          </div>
        </div>
        
        <div className="absolute top-24 right-16 hidden lg:block">
          <div className="bg-gradient-to-r from-slate-700/80 to-slate-600/80 dark:from-blue-500/20 dark:to-cyan-500/20 backdrop-blur-lg rounded-full px-4 py-2 border border-slate-500/50 dark:border-blue-300/30">
            <div className="flex items-center space-x-2 text-sm text-slate-100 dark:text-blue-200">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Enterprise Security</span>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center space-y-8 max-w-5xl">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-black leading-tight">
              <span className="block bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
                Transform Your
              </span>
              <span className="block bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
                Business Dreams
              </span>
              <span className="block text-4xl md:text-5xl bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent font-medium">
                Into Reality
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-700 dark:text-purple-200 leading-relaxed max-w-4xl mx-auto font-light">
              Experience the future of business management with our 
              <span className="text-transparent bg-gradient-to-r from-purple-700 to-pink-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text font-semibold"> AI-powered platform </span>
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
              className="group px-12 py-6 bg-white/80 hover:bg-white/90 dark:bg-black/40 dark:hover:bg-black/50 dark:backdrop-blur-xl text-slate-800 dark:text-white text-lg font-semibold rounded-2xl backdrop-blur-lg border border-purple-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-white/20 shadow-2xl dark:shadow-black/50 transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              <span className="flex items-center space-x-3">
                <span>Watch Demo</span>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </span>
            </Button>
          </div>
        </div>

        {/* Enhanced Floating Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 w-full max-w-5xl">
          {[
            { icon: TrendingUp, value: "300%", label: "Revenue Growth", color: "from-green-400 to-emerald-400" },
            { icon: Users, value: "50K+", label: "Active Users", color: "from-blue-400 to-cyan-400" },
            { icon: BarChart3, value: "99.9%", label: "Uptime", color: "from-purple-400 to-pink-400" },
            { icon: Globe, value: "150+", label: "Countries", color: "from-orange-400 to-red-400" }
          ].map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/85 dark:bg-black/40 dark:backdrop-blur-2xl backdrop-blur-lg rounded-3xl p-8 border-2 border-purple-200/70 dark:border-white/15 hover:border-purple-300 dark:hover:border-white/25 transition-all duration-300 text-center shadow-2xl dark:shadow-black/60">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 shadow-xl`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-slate-800 dark:text-white mb-2">{stat.value}</div>
                <div className="text-base font-medium text-slate-600 dark:text-white/80">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Features Section - Enhanced */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white mb-8">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Superpowers
            </span>
            <span className="text-slate-800 dark:text-white"> for Your Business</span>
          </h2>
          <p className="text-2xl text-slate-700 dark:text-purple-200 max-w-4xl mx-auto leading-relaxed">
            Unlock enterprise-grade features that scale with your ambition and transform your business operations
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
              bgGradient: "from-purple-500/40 to-pink-500/40"
            },
            {
              icon: Users,
              title: "Smart CRM",
              description: "Intelligent customer relationship management with automated workflows and predictive insights.",
              gradient: "from-blue-500 to-cyan-500",
              bgGradient: "from-blue-500/40 to-cyan-500/40"
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              description: "Built with cutting-edge technology for instant responses and real-time collaboration.",
              gradient: "from-yellow-500 to-orange-500",
              bgGradient: "from-yellow-500/40 to-orange-500/40"
            },
            {
              icon: Shield,
              title: "Fort Knox Security",
              description: "Military-grade encryption and enterprise security protocols protect your valuable data.",
              gradient: "from-green-500 to-emerald-500",
              bgGradient: "from-green-500/40 to-emerald-500/40"
            },
            {
              icon: Globe,
              title: "Global Scale",
              description: "Multi-currency, multi-language support with global compliance and localization.",
              gradient: "from-indigo-500 to-purple-500",
              bgGradient: "from-indigo-500/40 to-purple-500/40"
            },
            {
              icon: Lock,
              title: "Premium Support",
              description: "24/7 priority support with dedicated account managers and instant assistance.",
              gradient: "from-red-500 to-pink-500",
              bgGradient: "from-red-500/40 to-pink-500/40"
            }
          ].map((feature, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              <div className={`relative h-full bg-white/85 dark:bg-black/40 dark:backdrop-blur-xl backdrop-blur-lg rounded-3xl p-8 border border-purple-200/50 dark:border-white/10 hover:border-purple-300 dark:hover:border-white/20 transition-all duration-500 hover:scale-105 shadow-2xl dark:shadow-black/50`}>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-xl`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-700 dark:text-white/80 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/90 dark:bg-black/30 dark:backdrop-blur-xl backdrop-blur-2xl rounded-3xl p-12 border border-purple-200 dark:border-white/10 text-center shadow-2xl dark:shadow-black/50">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white">
                  Ready to <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Dominate</span> Your Market?
                </h2>
                <p className="text-xl text-slate-700 dark:text-white/80 max-w-3xl mx-auto">
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
                  <p className="text-sm text-slate-600 dark:text-purple-300 mb-2">No credit card required</p>
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-slate-600 dark:text-purple-200 ml-2">Trusted by 50,000+ businesses</span>
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
              <span className="text-2xl font-black bg-gradient-to-r from-slate-800 via-purple-800 to-pink-800 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
                Monexa
              </span>
            </div>
            
            <p className="text-slate-600 dark:text-purple-300 max-w-2xl mx-auto">
              Empowering businesses worldwide with next-generation management solutions. 
              Built with passion, powered by innovation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 dark:text-purple-300">
              <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-slate-800 dark:hover:text-white transition-colors">Support</a>
            </div>
            
            <div className="pt-8 border-t border-slate-300/50 dark:border-white/10">
              <p className="text-slate-500 dark:text-purple-400 text-sm">
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