import api from '../api';

import { loginPath, routerPath } from '../utils/constantRoutes';

export const loginApi = async (payload) => {
  try {
    const response = await api.post(loginPath.loginApi, payload);
    return response.data;
  } catch (error) {
    console.error('errorService1612199', error)
    if (error.response && error.response.data) {
      throw new Error(error.response.data.msg);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

export const adminCreateApi = async (payload,token) => {
console.log('payload,token', payload,token)
  try {
    const response = await api.post(routerPath.adminCreate, payload,token);
    return {data:response?.data,status:response?.status};
  } catch (error) {
    console.error('adminCreateApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};