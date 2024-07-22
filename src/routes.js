import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProductCreate from './pages/Products/AddProduct';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/Products/ProductList';
import OrderList from './pages/Orders/OrderList';
import CreateCoupon from './pages/CouponCode/CreateCoupon';
import CouponListTable from './pages/CouponCode/CouponList';
import UserProfileData from './pages/UserProfile/UserProfileData';
import UpdateProductData from './pages/Products/UpdateProductData';
import SignupForm from './pages/auth/SignupForm';
import PublicLayout from './components/layout/PublicLayout';
import LoginForm from './pages/auth/LoginForm';
import { Provider } from 'react-redux';
import store from './store';

import { AuthProvider } from './pages/auth/AuthContext';
import PublicRoute from './pages/auth/PublicRoute';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import 'rsuite/dist/rsuite.min.css';

const AppRoutes = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicRoute><PublicLayout><SignupForm /></PublicLayout></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><PublicLayout><LoginForm /></PublicLayout></PublicRoute>} />

            {/* Private Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/products-list" element={<ProtectedRoute><MainLayout><ProductList /></MainLayout></ProtectedRoute>} />
            <Route path="/products-create" element={<ProtectedRoute><MainLayout><ProductCreate /></MainLayout></ProtectedRoute>} />
            <Route path="/order-list" element={<ProtectedRoute><MainLayout><OrderList /></MainLayout></ProtectedRoute>} />
            <Route path="/create-code" element={<ProtectedRoute><MainLayout><CreateCoupon /></MainLayout></ProtectedRoute>} />
            <Route path="/coupon-list" element={<ProtectedRoute><MainLayout><CouponListTable /></MainLayout></ProtectedRoute>} />
            <Route path="/user-profile" element={<ProtectedRoute><MainLayout><UserProfileData /></MainLayout></ProtectedRoute>} />
            <Route path="/update-product/:id" element={<ProtectedRoute><MainLayout><UpdateProductData /></MainLayout></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default AppRoutes;
