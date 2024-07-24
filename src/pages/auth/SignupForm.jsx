import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { adminCreateApi } from '../../services/authService';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import useToast from '../../hook/useToaster';
import { getAuthHeader } from '../../constant';


// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  userType: yup.string().required('User type is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignupForm = () => {
  const { token } = useSelector(UserData)
  const showToast = useToast();
  const [loading, setLoding] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (admindata) => {
    setLoding(true)
    try {
      const { data, status } = await adminCreateApi(admindata,getAuthHeader(token));
      if (data && status === 200) {
        showToast('success', `${data.msg}`);
        reset()
      } else {
        showToast('error', `${data.msg}`);
      }
      setLoding(false)
    } catch (error) {
      showToast('error', `${error.message}`);
      console.error('err1612199', error.message)
      setLoding(false)
    }

  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-slate-300 bg-opacity-60 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Admin Create</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg mb-1">Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg mb-1">User Type</label>
          <input
            type="text"
            value='admin'
            {...register('userType')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.userType && <p className="text-red-600">{errors.userType.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg mb-1">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
        >
          {loading?"Loading...":'Create Admin'}
        </button>
      </form>
      {/* <div className="text-center mt-4">
        <p className="text-gray-700 text-lg">Already logged in?</p>
        <Link to="/login" className="text-blue-600 text-lg hover:underline">
          Log in
        </Link>
      </div> */}
    </div>
  );
};

export default SignupForm;
