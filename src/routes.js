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

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/products-create" element={<ProductCreate />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/create-code" element={<CreateCoupon />} />
          <Route path="/coupon-list" element={<CouponListTable />} />
          <Route path="/user-profile" element={<UserProfileData />} />
          <Route path="/update-product/:id" element={<UpdateProductData />} />





        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
