import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import CustomInput from '../../components/common/InputField';
import { BackButton, productdata } from '../../utils/helpers';
import { productUpdateSchema } from '../../utils/validators';


const isLargeScreen = window.innerWidth > 1024;

const product = productdata;

function UpdateProductData() {
  let { id } = useParams();
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(productUpdateSchema),
  });

  const [productData, setProductData] = useState({
    email: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    subCategory: '',
    company: '',
    stock: 0,
    images: [''],
    tags: [],
    specifications: [{ name: '', details: [] }],
    AvailableOffers: [],
  });

  useEffect(() => {
    if (product) {
      setProductData({
        email: product.email,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        subCategory: product.subCategory,
        company: product.company,
        stock: product.stock,
        images: product.images,
        tags: product.tags,
        specifications: product.specifications,
        AvailableOffers: product.AvailableOffers,
      });
    }
  }, [product]);

  useEffect(() => {
    reset(productData);
  }, [productData, reset]);

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecifications = [...productData.specifications];

    if (field === 'name') {
      updatedSpecifications[index].name = value;
    } else if (field === 'details') {
      updatedSpecifications[index].details = value;
    }

    setProductData({
      ...productData,
      specifications: updatedSpecifications,
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

  const onSubmit = (data) => {
    data.AvailableOffers = data.AvailableOffers.split(',');
    console.log(data); // Replace with your form submission logic for updating the product

    // Example of updating the product using fetch
    fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product updated successfully:', data);
        navigate(`/product/${id}`); // Navigate to the product detail page or another page
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  function backTo() {
    navigate('/products-list');
  }

  return (
    <>
      <div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
        <BackButton back={backTo} />
        <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">Update Product {id}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mt-6">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <CustomInput
              id="email"
              name="email"
              value={field.value}
              onChange={field.onChange}
              label="Email"
              error={errors.email}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
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

        <div>
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
                  onChange={(e) => {
                    const updatedDetails = [...spec.details];
                    updatedDetails[detailIndex] = e.target.value;
                    handleSpecificationChange(index, 'details', updatedDetails);
                  }}
                  label={`Detail ${detailIndex + 1}`}
                  error={errors.specifications?.[index]?.details?.[detailIndex]}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  const updatedDetails = [...spec.details, ''];
                  handleSpecificationChange(index, 'details', updatedDetails);
                }}
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
        </div>

        <Controller
          name="AvailableOffers"
          control={control}
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
          Update Product
        </button>
      </form>
    </>
  );
}

export default UpdateProductData;
