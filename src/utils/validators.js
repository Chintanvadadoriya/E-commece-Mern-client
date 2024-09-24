// productValidationSchema.js
import * as yup from 'yup';

export const productSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  category: yup.string().required('Category is required'),
  subCategory: yup.string().required('Sub Category is required'),
  company: yup.string().required('Company is required'),
  stock: yup.number().required('Stock is required'),
  images: yup.string().required('Images are required'),
  tags: yup.string().required('Tags are required'),
  AvailableOffers: yup.string().required('Available Offers are required')
});



export const productUpdateSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().typeError('Price must be a number').positive('Price must be a positive number').required('Price is required'),
  category: yup.string().required('Category is required'),
  subCategory: yup.string().required('Sub Category is required'),
  company: yup.string().required('Company is required'),
  stock: yup.number().typeError('Stock must be a number').integer('Stock must be an integer').required('Stock is required'),
  images: yup.string().required('Images are required'),
  tags: yup.string().required('Tags are required'),
  AvailableOffers: yup.string().required('Available Offers are required')
});

export const couponCreateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  discoutOff: yup.number().required('discoutOff is required'),
  codeName: yup.string().required('CodeName is required').nullable().notOneOf([null, ''], 'CodeName is required'),

});

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('currentPassword is required'),
  newPassword: yup.string().required('newPassword is required'),
});

export const updateProfileSchema = yup.object().shape({
  image: yup.string().required('Image URL is required'),
  name: yup.string().required('Name is required'),
});


export const eventCalenderSchema = yup.object().shape({
  title: yup.string().required('event name is required'),
});