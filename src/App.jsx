import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./components/ui/Toast";
import Layout from "./components/ui/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Challans from "./pages/Challans";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";

// Profile Pages
import ChartOfAccounts from "./pages/profiles/ChartOfAccounts";
import DriverMaster from "./pages/profiles/DriverMaster";
import BiltyTypeMaster from "./pages/profiles/BiltyTypeMaster";
import StationMaster from "./pages/profiles/StationMaster";
import ExpenseMaster from "./pages/profiles/ExpenseMaster";
import DieselStationMaster from "./pages/profiles/DieselStationMaster";
import AccountsCategoryMaster from "./pages/profiles/AccountsCategoryMaster";
import ItemMaster from "./pages/profiles/ItemMaster";

// Admin Pages
import UserManagement from "./pages/admin/UserManagement";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main App Routes
const AppRoutes = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const handleLogin = (success) => {
    if (success) {
      const userData = JSON.parse(localStorage.getItem('builty_user'));
      login(userData);
    }
  };

  return (
    <Routes>
      {/* Public Route - Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout onLogout={logout}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/challans" element={<Challans />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />

                {/* Profile Routes */}
                <Route path="/profiles/chart-of-accounts" element={<ChartOfAccounts />} />
                <Route path="/profiles/drivers" element={<DriverMaster />} />
                <Route path="/profiles/bilty-types" element={<BiltyTypeMaster />} />
                <Route path="/profiles/stations" element={<StationMaster />} />
                <Route path="/profiles/expense" element={<ExpenseMaster />} />
                <Route path="/profiles/expense-payable" element={<ExpenseMaster />} />
                <Route path="/profiles/diesel-stations" element={<DieselStationMaster />} />
                <Route path="/profiles/accounts-category" element={<AccountsCategoryMaster />} />
                <Route path="/profiles/accounts-sub-category" element={<AccountsCategoryMaster />} />
                <Route path="/profiles/accounts-location" element={<StationMaster />} />
                <Route path="/profiles/items" element={<ItemMaster />} />
                <Route path="/profiles/opening-stock" element={<ItemMaster />} />

                {/* Admin Routes */}
                <Route path="/admin/users" element={<UserManagement />} />

                {/* Catch all - redirect to dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

// App with Auth Provider and Toast Provider
function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
