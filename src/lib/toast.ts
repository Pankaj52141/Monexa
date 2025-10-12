import React from 'react';
import { toast as hotToast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

const ToastIcon = ({ type }: { type: string }) => {
  const iconClass = "h-5 w-5 mr-2";
  
  switch (type) {
    case 'success':
      return React.createElement(CheckCircle, { className: `${iconClass} text-green-500` });
    case 'error':
      return React.createElement(XCircle, { className: `${iconClass} text-red-500` });
    case 'warning':
      return React.createElement(AlertCircle, { className: `${iconClass} text-yellow-500` });
    case 'info':
      return React.createElement(Info, { className: `${iconClass} text-blue-500` });
    default:
      return null;
  }
};

export const toast = {
  success: (message: string, options: ToastOptions = {}) => {
    hotToast.success(message, { duration: options.duration || 4000 });
  },
    
  error: (message: string, options: ToastOptions = {}) => {
    hotToast.error(message, { duration: options.duration || 4000 });
  },
    
  warning: (message: string, options: ToastOptions = {}) => {
    hotToast(message, { 
      icon: '⚠️',
      duration: options.duration || 4000 
    });
  },
    
  info: (message: string, options: ToastOptions = {}) => {
    hotToast(message, { 
      icon: 'ℹ️',
      duration: options.duration || 4000 
    });
  },
    
  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => hotToast.promise(promise, { loading, success, error }),
};

export default toast;