import api from '../api';

import { loginPath, routerPath } from '../utils/constantRoutes';


//auth manage
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

// admin manage
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

    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('adminListApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const adminUpdateApi = async (payload, token) => {
  try {
    const url = `${routerPath.adminUpdate}/${payload?.id}`;

    const response = await api.put(url, payload, token);

    return { data: response?.data?.message, status: response?.status };
  } catch (error) {
    console.error('adminUpdateApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const adminDeleteApi = async (payload, token) => {
  try {
    const url = `${routerPath.adminDelete}/${payload?.id?._id}`;

    const response = await api.delete(url, token);
    return { data: response?.data?.message, status: response?.status };
  } catch (error) {
    console.error('adminDeleteApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};


// product manage api
export const productCreateApi = async (payload, token) => {
  try {
    const response = await api.post(routerPath.productCreate, payload, token);
    console.log('response', response)
    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('adminCreateApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};


export const productListApi = async ({ searchQuery = null, page, limit, token, minPrice, maxPrice }) => {
  try {
    const url = `${routerPath.productList}?searchQuery=${searchQuery}&page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`;


    const response = await api.post(url, {}, token);

    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('adminListApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const getProdctDetailsById = async (id) => {
  try {
    const url = `${routerPath.productDetailsById}/${id}`;

    const response = await api.get(url);

    return { data: response?.data?.data };
  } catch (error) {
    console.error('adminUpdateApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};


export const updateProductApi = async (payload, id, token) => {
  try {
    const url = `${routerPath.updatProductById}/${id}`;

    const response = await api.put(url, payload, token);
    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('adminUpdateApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const deleteProductApi = async (id, token) => {
  try {
    const url = `${routerPath.deleteProductById}/${id?.id}`;

    const response = await api.delete(url, token);
    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('deleteProductApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const orderListApi = async ({ page, limit, token }) => {
  try {
    const url = `${routerPath.OrderListOfAdmin}?page=${page}&limit=${limit}`;


    const response = await api.post(url, {}, token);

    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('orderListApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const orderUpdatTrackStatusApi = async (id, payload, token) => {
  console.log('id', id, payload)
  try {
    const url = `${routerPath.OrderUpdatTracking}/${id}/tracking`;

    const response = await api.post(url, payload, token);
    console.log('response', response)
    return { data: response?.data, status: response?.status };
  } catch (error) {
    console.error('orderUpdatTrackStatusApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};


export const couponCodeCreateApi = async (payload, token) => {
  console.log('payload, token', payload, token)
  try {
    const response = await api.post(routerPath.couponCreate, payload, token);
    console.log('response coupon code', response)
    return { data: response?.status, msg: response?.data?.msg };
  } catch (error) {
    console.error('adminCreateApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};


export const couponListApi = async ({ page, limit,search, token }) => {
  try {
    const url = `${routerPath.couponList}?search=${search}&page=${page}&limit=${limit}`;


    const response = await api.post(url, {}, token);

    return { data: response?.data};
  } catch (error) {
    console.error('couponListApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const deleteCouponCodeApi = async (id, token) => {
  try {
    const url = `${routerPath.couponDelet}/${id?.id}`;

    const response = await api.delete(url, token);
    return { data: response?.data?.deleted, msg: response?.data?.msg };
  } catch (error) {
    console.error('deleteProductApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};


export const getAdminDeshboardOverViewApi = async (token) => {
  try {
    const url = `${routerPath.dashboard}`;

    const response = await api.get(url,token);
    return { data: response?.data};
  } catch (error) {
    console.error('getAdminDeshboardOverViewApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};


export const getAdminDeshboardSaleApi = async (token) => {
  try {
    const url = `${routerPath.saleData}`;

    const response = await api.get(url,token);
    return { saleData: response?.data?.salesData};
  } catch (error) {
    console.error('getAdminDeshboardSaleApi 1612199', error)
    throw new Error(error?.response?.data);
  }
};

export const getAdminDeshboardOrderApi = async (token) => {
  try {
    const url = `${routerPath.orderData}`;

    const response = await api.get(url,token);
    return { orderData: response?.data?.ordersData};
  } catch (error) {
    console.error('getAdminDeshboardOrderApi 1612199', error)
    throw new Error(error?.response?.data);
  }
};


export const getAdminDeshboardUserActivityApi = async (token) => {
  try {
    const url = `${routerPath.userActivityData}`;

    const response = await api.get(url,token);
    return { userActivityData: response?.data?.userActivityData};
  } catch (error) {
    console.error('getAdminDeshboardUserActivityApi 1612199', error)
    throw new Error(error?.response?.data);
  }
};


export const getUserProfileDataApi = async (token) => {
  try {
    const url = `${routerPath.userProfileData}`;

    const response = await api.get(url,token);
    return { data: response?.data?.user};
  } catch (error) {
    console.error('getUserProfileDataApi 1612199', error)
    throw new Error(error?.response?.data);
  }
};


export const updateUserProfileDataApi = async (payload,token) => {
  try {
    const url = `${routerPath.updataUserProfileData}`;

    const response = await api.put(url,payload,token);
    return {data:response?.status, msg: response?.data?.msg};
  } catch (error) {
    console.error('updateUserProfileDataApi 1612199', error)
    throw new Error(error?.response?.data);
  }
};

export const passwordChangeUserApi = async (payload,token) => {
  try {
    const url = `${routerPath.passwordChange}`;

    const response = await api.post(url,payload,token);
    return {data:response?.status, msg: response?.data?.msg};
  } catch (error) {
    console.error('passwordChangeUserApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const forgotPasswordApi = async (payload) => {
  try {
    const url = `${routerPath.forgotPassword}`;

    const response = await api.post(url,payload);
    return {data:response?.status, msg: response?.data?.msg};
  } catch (error) {
    console.error('forgotPasswordApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const allAdminListApi = async () => {
  try {
    const url = `${routerPath.allAdminList}`;

    const response = await api.get(url);
    return {data:response?.data?.data, status: response?.status};
  } catch (error) {
    console.error('allAdminListApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const viewAllPrivateChat = async (payload,token) => {
  try {
    const url = `${routerPath.viewAllPrivateChat}`;

    const response = await api.post(url,payload,token);
    return {data:response?.data?.data, status: response?.status};
  } catch (error) {
    console.error('viewAllPrivateChat 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const getAllUnreadedMsgCountListApi = async (payload,token) => {
  try {
    const url = `${routerPath.getAllUnreadMessagesCout}`;
    const response = await api.post(url,payload,token);
    return {data:response?.data?.unreadCounts, status: response?.status};
  } catch (error) {
    console.error('getAllUnreadedMsgCountListApi 1612199', error)
    throw new Error(error?.response);
  }
};


export const updateUnreadedMsgCountApi = async (payload,token) => {
  try {
   
    const url = `${routerPath.updatAllUnreadMessagesCout}`;

    const response = await api.put(url,payload,token);
    return {data:response?.data?.count, status: response?.status};
  } catch (error) {
    console.error('updateUnreadedMsgCountApi 1612199', error)
    throw new Error(error?.response?.data);
  }
};

export const shareFileHandlingApi=async(payload)=>{
  try{
     const url = `${routerPath.shareFilesHandling}`;
     const response = await api.post(url,payload);
    return {fileUrl:response?.data?.fileUrl, status: response?.status};
  }catch(err){
    console.log("shareFileHandlingApi",err)
  }
}

export const downLoadSharingsFileApi=async(filename)=>{
  
  try{
     const url = `${routerPath.downLoadshareFiles}`;
     const response = await api.get(url, {
          params: { filename: filename },
          responseType: 'blob', // Request the response as a Blob
        });
    return response
  }catch(err){
    console.log("downLoadSharingsFileApi",err)
  }
}

export const allUnreadMessagesCountAdmin=async(token)=>{
  
  try{
     const url = `${routerPath.getAllUnreadMessagesCount}`;
     const response = await api.get(url,token);
    return {data:response?.data?.unreadCounts}
  }catch(err){
    console.log("allUnreadMessagesCountAdmin",err)
  }
}

export const allAdminMemberListApi = async () => {
  try {
    const url = `${routerPath.allAdminList}?isGroup=true`;

    const response = await api.get(url);
    return {data:response?.data?.data, status: response?.status};
  } catch (error) {
    console.error('allAdminListApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const createGroup = async (payload,token) => {
  try {
    const url = `${routerPath.createGroup}`;

    const response = await api.post(url,payload,token);
    return {data:response?.data?.group,msg:response?.data?.msg, status: response?.status};
  } catch (error) {
    console.error('createGroup 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const updateMemberOnGroup = async (payload,token) => {
  try {
    const url = `${routerPath.updateMemberOnGroup}`;

    const response = await api.put(url,payload,token);
    return {data:response?.data?.updatedGroup,msg:response?.data?.msg, status: response?.status};
  } catch (error) {
    console.error('updateMemberOnGroup 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const getAllGroupMessages = async (payload,token) => {
  console.log('payload,token', payload,token)
  try {
    const url = `${routerPath.getAllGroupMessages}`;

    const response = await api.post(url,payload,token);
    return {data:response?.data?.messages,totalMessages:response?.data?.totalMessages,totalPages:response?.data?.totalPages, status: response?.status};
  } catch (error) {
    console.error('getAllGroupMessages 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const paymentIntentServiceApi = async (payload) => {

  try {
    const url = `${routerPath.createPaymentIntent}`;

    const response = await api.post(url,payload);
    console.log('paymentIntentServiceApi response', response)
    return response
  } catch (error) {
    console.error('paymentIntentServiceApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};


export const savePaymentMethodServiceApi = async (payload) => {

  try {
    const url = `${routerPath.savePaymentMethod}`;

    const response = await api.post(url,payload);
    console.log('savePaymentMethodServiceApi response', response)
    return response
  } catch (error) {
    console.error('savePaymentMethodServiceApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};

export const saveCardPaymentMethodServiceApi = async (payload) => {

  try {
    const url = `${routerPath.saveCardPaymentMethod}`;

    const response = await api.post(url,payload);
    console.log('saveCardPaymentMethodServiceApi response', response)
    return {response,msg:response.status}
  } catch (error) {
    console.error('saveCardPaymentMethodServiceApi 1612199', error)
    throw new Error(error?.response?.data?.msg);
  }
};