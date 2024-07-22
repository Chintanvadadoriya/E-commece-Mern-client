import api from '../api';
import { loginPath } from '../utils/constantRoutes';

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
