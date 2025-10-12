import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AppState {
  // Authentication
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  
  // UI State
  sidebarCollapsed: boolean;
  currentPage: string;
  
  // Loading States
  isLoading: {
    dashboard: boolean;
    customers: boolean;
    products: boolean;
    employees: boolean;
    invoices: boolean;
  };
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  setCurrentPage: (page: string) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setLoading: (section: keyof AppState['isLoading'], loading: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  token: null,
  sidebarCollapsed: false,
  currentPage: 'Dashboard',
  isLoading: {
    dashboard: false,
    customers: false,
    products: false,
    employees: false,
    invoices: false,
  },
  
  // Actions

  setUser: (user) => set((state) => ({
    user,
    isAuthenticated: !!user && !!state.token
  })),

  setToken: (token) => set((state) => ({
    token,
    isAuthenticated: !!token && !!state.user
  })),

  login: (user, token) => set({
    user,
    token,
    isAuthenticated: true
  }),
  
  setCurrentPage: (currentPage) => set({ currentPage }),
  
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  
  setLoading: (section, loading) => set((state) => ({
    isLoading: {
      ...state.isLoading,
      [section]: loading,
    }
  })),
  
  logout: () => set({
    user: null,
    token: null,
    isAuthenticated: false,
    currentPage: 'Dashboard',
  }),
}));