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

export const adminCreateApi = async (payload, token) => {
  try {
    const response = await api.post(routerPath.adminCreate, payload, token);
    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('adminCreateApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const adminListApi = async ({ searchQuery = null, page, limit, name = null, token }) => {
  try {
    const url = `${routerPath.adminList}?searchQuery=${searchQuery}&page=${page}&limit=${limit}&name=${name}`;
    

    const response = await api.post(url, {}, token);
    console.log('response', response)
    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('adminListApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const adminUpdateApi = async (payload,token) => {
  console.log('payload adminUpdateApi', payload)
  try {
    const url = `${routerPath.adminUpdate}/${payload?.id}`;
    
    const response = await api.put(url,payload,token);
  
    return {data:response?.data?.message,status:response?.status};
  } catch (error) {
    console.error('adminUpdateApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};