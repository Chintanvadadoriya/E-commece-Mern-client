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
import 'rsuite/dist/rsuite.min.css';
import AdminListTable from './pages/super-admin/AdminList';
import { PublicRoute ,ProtectedRoute} from './pages/auth/ProtectedRoutes';
import NotFound from './components/NotFound';
import ForgotPassword from './pages/auth/ForgotPassword';
import ChatPage from './pages/Chat/Chat';
import { SocketProvider } from './Context/SocketContext';
import PaymentForm from './components/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { publicStripeKey } from './constant';

const stripePromise = loadStripe(publicStripeKey);
const AppRoutes = () => {
  return (
    <Elements stripe={stripePromise}>
    <Provider store={store}>
    <SocketProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            {/* <Route path="/admin-create" element={<PublicRoute><PublicLayout><SignupForm /></PublicLayout></PublicRoute>} /> */}
            <Route path="/" element={<PublicRoute><PublicLayout><LoginForm /></PublicLayout></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><PublicLayout><ForgotPassword /></PublicLayout></PublicRoute>} />


            {/* Private Routes */}
            <Route path="/admin-create" element={<ProtectedRoute allowedRoles={['superAdmin']}><SignupForm /></ProtectedRoute>} />
            <Route path="/admin-list" element={<ProtectedRoute allowedRoles={['superAdmin']}><AdminListTable /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>} />
            <Route path="/products-list" element={<ProtectedRoute allowedRoles={['admin']}><ProductList /></ProtectedRoute>} />
            <Route path="/products-create" element={<ProtectedRoute allowedRoles={['admin']}><ProductCreate /></ProtectedRoute>} />
            <Route path="/order-list" element={<ProtectedRoute allowedRoles={['admin']}><OrderList /></ProtectedRoute>} />
            <Route path="/create-code" element={<ProtectedRoute allowedRoles={['admin']}><CreateCoupon /></ProtectedRoute>} />
            <Route path="/coupon-list" element={<ProtectedRoute allowedRoles={['admin']}><CouponListTable /></ProtectedRoute>} />
            <Route path="/user-profile" element={<ProtectedRoute allowedRoles={['admin','superAdmin']}><UserProfileData /></ProtectedRoute>} />
            <Route path="/update-product/:id" element={<ProtectedRoute allowedRoles={['admin']}><UpdateProductData /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute allowedRoles={['admin','superAdmin']}><ChatPage /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute allowedRoles={['admin','superAdmin']}><PaymentForm /></ProtectedRoute>} />



             {/* Catch-All Route for 404 */}
             <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </SocketProvider>
    </Provider>
    </Elements>
  );
};

export default AppRoutes;
