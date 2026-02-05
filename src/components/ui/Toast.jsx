import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const success = (message) => addToast(message, 'success');
    const error = (message) => addToast(message, 'error');
    const info = (message) => addToast(message, 'info');
    const warning = (message) => addToast(message, 'warning');

    return (
        <ToastContext.Provider value={{ success, error, info, warning }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, onRemove }) => {
    return (
        <div className="fixed bottom-4 right-4 z-[100] space-y-2">
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onRemove={() => onRemove(toast.id)} />
            ))}
        </div>
    );
};

const Toast = ({ id, message, type, onRemove }) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
        error: <XCircle className="w-5 h-5 text-red-400" />,
        info: <AlertCircle className="w-5 h-5 text-blue-400" />,
        warning: <AlertCircle className="w-5 h-5 text-amber-400" />
    };

    const bgColors = {
        success: 'from-emerald-600/20 to-emerald-600/10 border-emerald-500/30',
        error: 'from-red-600/20 to-red-600/10 border-red-500/30',
        info: 'from-blue-600/20 to-blue-600/10 border-blue-500/30',
        warning: 'from-amber-600/20 to-amber-600/10 border-amber-500/30'
    };

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${bgColors[type]} border backdrop-blur-md shadow-lg min-w-[300px] animate-in slide-in-from-right-5 fade-in duration-300`}>
            {icons[type]}
            <span className="flex-1 text-white font-medium">{message}</span>
            <button onClick={onRemove} className="p-1 rounded hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-slate-400" />
            </button>
        </div>
    );
};

export default ToastProvider;
