
export const loginPath = {
    loginApi: '/auth/login',

}

export const routerPath = {
    adminCreate: '/super-admin/register',
    adminList: '/super-admin/all-admin',
    adminUpdate: '/super-admin',
    adminDelete: '/super-admin',

    productCreate: "/admin/product/create",
    productList: '/admin/product/all-products',
    productDetailsById: '/product',
    updatProductById: '/admin/product',
    deleteProductById: '/admin/product',

    OrderListOfAdmin: '/admin/order/all-admin-data',
    OrderUpdatTracking: 'admin/order',

    couponCreate: '/admin/order/create-promotion-code',
    couponList: '/admin/order/list-promotion-code',
    couponDelet:'/admin/order/delete-promotion-code',

    dashboard:'/admin/deshboard',
    saleData:'/admin/deshboard/sales-data',
    orderData:'/admin/deshboard/orders-data',
    userActivityData:'/admin/deshboard/user-activity-data',

    userProfileData:'/auth/user-profile-data',
    updataUserProfileData:'/auth/profile-update',
    passwordChange:'/auth/change-password',
    forgotPassword:'/auth/request-password-reset',

    allAdminList:'/auth/all-admin',
    viewAllPrivateChat:'/chat',
    getAllUnreadMessagesCout:"/chat/un-readed-messages",
    updatAllUnreadMessagesCout:"/chat/update-un-readed-messages",

    shareFilesHandling:'/auth/upload-file'



}
