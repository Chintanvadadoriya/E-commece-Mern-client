import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../components/common/InputField';
import { productSchema } from '../../utils/validators';
import useToast from '../../hook/useToaster';
import { getAuthHeader } from '../../constant';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { productCreateApi } from '../../services/authService';
import { Loader } from 'rsuite';



const initialProductData = {
  specifications: [{ name: '', details: [''] }],
};

const ProductCreate = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(productSchema),
  });
  const {token,user} =useSelector(UserData)

  const showToast = useToast();
  const [loading, setLoding] = useState(false)

  const [productData, setProductData] = useState(initialProductData);

  const onSubmit = async(productdata) => {
    productdata.specifications = productData
    console.log(productdata);
    setLoding(true)
    try {
      const { data, status } = await productCreateApi(productdata, getAuthHeader(token));

      console.log('data, status ', data, status )
      if (data && status === 201) {
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
    reset();
    setProductData(initialProductData);
  };

  const handleSpecificationChange = (index, field, valueOrDetailIndex, value) => {
    setProductData(prevData => {
      const updatedSpecs = [...prevData.specifications];

      if (field === 'name') {
        updatedSpecs[index] = { ...updatedSpecs[index], name: valueOrDetailIndex };
      } else if (field === 'details') {
        const updatedDetails = [...updatedSpecs[index].details];
        updatedDetails[valueOrDetailIndex] = value;
        updatedSpecs[index] = { ...updatedSpecs[index], details: updatedDetails };
      }

      return { ...prevData, specifications: updatedSpecs };
    });
  };


  const handleAddDetail = (index) => {
    setProductData(prevData => {
      const updatedSpecs = [...prevData.specifications];
      const updatedDetails = [...updatedSpecs[index].details, ''];
      updatedSpecs[index] = { ...updatedSpecs[index], details: updatedDetails };
      return { ...prevData, specifications: updatedSpecs };
    });
  };




  const handleAddSpecification = () => {
    setProductData({
      ...productData,
      specifications: [
        ...productData.specifications,
        { name: '', details: [''] },
      ],
    });
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = [...productData.specifications];
    updatedSpecifications.splice(index, 1);
    setProductData({
      ...productData,
      specifications: updatedSpecifications,
    });
  };

  return (
    <>
      <div>
        <h2 className="text-3xl grid justify-items-center mb-4">Create Product</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mt-6">
        <Controller
          name="email"
          control={control}
          defaultValue={user?.email}
          render={({ field }) => (
            <CustomInput
              id="email"
              name="email"
              value={user?.email}
              onChange={field.onChange}
              label="Email"
              error={errors.email}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="name"
              name="name"
              value={field.value}
              onChange={field.onChange}
              label="Name"
              error={errors.name}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="description"
              name="description"
              value={field.value}
              onChange={field.onChange}
              label="Description"
              error={errors.description}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="price"
              name="price"
              value={field.value}
              onChange={field.onChange}
              label="Price"
              error={errors.price}
            />
          )}
        />
        <Controller
          name="category"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="category"
              name="category"
              value={field.value}
              onChange={field.onChange}
              label="Category"
              error={errors.category}
            />
          )}
        />
        <Controller
          name="subCategory"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="subCategory"
              name="subCategory"
              value={field.value}
              onChange={field.onChange}
              label="Sub Category"
              error={errors.subCategory}
            />
          )}
        />
        <Controller
          name="company"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="company"
              name="company"
              value={field.value}
              onChange={field.onChange}
              label="Company"
              error={errors.company}
            />
          )}
        />
        <Controller
          name="stock"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="stock"
              name="stock"
              value={field.value}
              onChange={field.onChange}
              label="Stock"
              error={errors.stock}
            />
          )}
        />
        <Controller
          name="images"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="images"
              name="images"
              value={field.value}
              onChange={field.onChange}
              label="Images"
              error={errors.images}
            />
          )}
        />
        <Controller
          name="tags"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="tags"
              name="tags"
              value={field.value}
              onChange={field.onChange}
              label="Tags"
              error={errors.tags}
            />
          )}
        />

        {productData.specifications.map((spec, index) => (
          <div key={index} className="mt-3">
            <CustomInput
              id={`specification-name-${index}`}
              name="name"
              value={spec.name}
              onChange={(e) => handleSpecificationChange(index, 'name', e.target.value)}
              label={`Specification ${index + 1} Name`}
              error={errors.specifications?.[index]?.name}
            />
            {spec.details.map((detail, detailIndex) => (
              <CustomInput
                key={detailIndex}
                id={`specification-detail-${index}-${detailIndex}`}
                name="detail"
                value={detail}
                onChange={(e) => handleSpecificationChange(index, 'details', detailIndex, e.target.value)}
                label={`Detail ${detailIndex + 1}`}
                error={errors.specifications?.[index]?.details?.[detailIndex]}
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddDetail(index)}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
            >
              Add Detail
            </button>
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveSpecification(index)}
                className="ml-2 mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
              >
                Remove Specification
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSpecification}
          className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md"
        >
          Add Specification
        </button>



        <Controller
          name="AvailableOffers"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              id="AvailableOffers"
              name="AvailableOffers"
              value={field.value}
              onChange={field.onChange}
              label="Available Offers"
              error={errors.AvailableOffers}
            />
          )}
        />

        <button
          type="submit"
          className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
         {loading?<Loader content="Loading..." />:"Create Product"}
        </button>
      </form>
    </>
  );
};

export default ProductCreate;
