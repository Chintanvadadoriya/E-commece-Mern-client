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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><SignupForm /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><LoginForm /></PublicLayout>} />


        {/* Private Routes */}
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/products-list" element={<MainLayout><ProductList /></MainLayout>} />
        <Route path="/products-create" element={<MainLayout><ProductCreate /></MainLayout>} />
        <Route path="/order-list" element={<MainLayout><OrderList /></MainLayout>} />
        <Route path="/create-code" element={<MainLayout><CreateCoupon /></MainLayout>} />
        <Route path="/coupon-list" element={<MainLayout><CouponListTable /></MainLayout>} />
        <Route path="/user-profile" element={<MainLayout><UserProfileData /></MainLayout>} />
        <Route path="/update-product/:id" element={<MainLayout><UpdateProductData /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
