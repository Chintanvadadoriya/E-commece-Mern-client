import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProductCreate from './pages/Products/AddProduct';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/Products/ProductList';
import OrderList from './pages/Orders/OrderList';

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/products-create" element={<ProductCreate />} />

          <Route path="/order-list" element={<OrderList />} />

        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
