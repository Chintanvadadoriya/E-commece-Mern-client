import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, UserData } from '../../redux/authSlice';
import useToast from '../../hook/useToaster';
import { Loader } from 'rsuite';

const loginSchema = yup.object().shape({
  userType: yup.string().required('User type is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});

const LoginForm = () => {
  const { loading } = useSelector(UserData);

  const showToast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    try {
      const result = await dispatch(login(data));
      if (result.meta.requestStatus === 'fulfilled') {
        const { payload } = result;
        if (payload?.userData) {
          payload?.userType === 'admin'
            ? navigate('/dashboard')
            : navigate('/admin-list');
          showToast('success', 'You have successfully logged in.');
        }
      } else {
        showToast('error', result.payload || 'Login failed.');
      }
    } catch (error) {
      console.error('err1612199', error.message);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-slate-300 bg-opacity-60 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg mb-1">User Type</label>
          <select
            {...register('userType')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="superAdmin">Super Admin</option>
            <option value="admin">Admin</option>
          </select>
          {errors.userType && (
            <p className="text-red-600">{errors.userType.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg mb-1">Email</label>
          <input
            type="email"
            // value="logisticworkit@gmail.com"
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
        >
          {loading ? <Loader content="Loading..." /> : 'Login'}
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-700 text-lg">
          Don't have an account? <strong>contect to Super admin</strong>{' '}
        </p>
        <Link to="/" className="text-blue-600 text-lg hover:underline">
          superAdmin@gmail.com
        </Link>
        <p>
          <Link
            to="/forgot-password"
            className="text-blue-600 text-lg hover:underline"
          >
            Forgot-Password ?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
