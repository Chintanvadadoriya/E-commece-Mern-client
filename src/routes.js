import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';
import ProductCreate from './pages/Products/AddProduct';

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products-create" element={<ProductCreate />} />

          <Route path="/order-list" element={<OrderList />} />

        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
