import api from '../api';
import { loginPath } from '../utils/constantRoutes';

export const loginApi = async (payload) => {
  try {
    const response = await api.post(loginPath.loginApi, payload);
    console.log('response loginApi', response)
    return response.data;
  } catch (error) {
    console.error('errorService1612199', error)
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};
