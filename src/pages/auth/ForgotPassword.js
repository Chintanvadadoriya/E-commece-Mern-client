import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useToast from '../../hook/useToaster';
import { Loader } from 'rsuite';
import { forgotPasswordApi } from '../../services/authService';
import { wait } from '../../constant';

const loginSchema = yup.object().shape({
  userType: yup.string().required('User type is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPassword = () => {
const [loading, setLoading] = useState(false); // A
  const showToast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (payload) => {
    setLoading(true);
    try {
      let { data, msg } = await forgotPasswordApi(payload);
      console.log('data', data)
      if (data === 200) {
        showToast('success', `${msg}`);
        setLoading(false);
        wait(3)  // wait 3 second
        navigate('/')
      } else {
        showToast('error', `${msg}`);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to change password', error);
      showToast('error', `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-slate-300 bg-opacity-60 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Forgot Password</h2>
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
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
        >
          {loading ? <Loader content="Loading..." /> : 'Forgot Password'}
        </button>
      </form>
      <div className="text-center mt-4">
        
        <Link to="/" className="text-blue-600 text-lg hover:underline">
          Back To Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
