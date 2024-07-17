import React, { useState } from 'react';
import CustomInput from '../../components/common/InputField';

const ProductCreate = () => {
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
        specifications: [{ name: "", details: [] }],
        AvailableOffers: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

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
                { name: '', details: [''] }, // Initialize with an empty detail
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

    const handleSubmit = (e) => {
        e.preventDefault();
        productData.AvailableOffers = productData?.AvailableOffers?.split(',')
        console.log(productData); // Replace with your form submission logic
    };
    return (
        <>
            <div> 
                {/* sticky top-5 z-50 */}
                <h2 className="text-3xl grid justify-items-center mb-4">Create Product</h2>
            </div>


            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-6">
                <CustomInput
                    id="email"
                    name="email"
                    value={productData.email}
                    onChange={handleChange}
                    label="Email"
                />
                <CustomInput
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    label="Name"
                />
                <CustomInput
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    label="Description"
                />
                <CustomInput
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    label="Price"
                />
                <CustomInput
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    label="Category"
                />
                <CustomInput
                    id="subCategory"
                    name="subCategory"
                    value={productData.subCategory}
                    onChange={handleChange}
                    label="Sub Category"
                />
                <CustomInput
                    id="company"
                    name="company"
                    value={productData.company}
                    onChange={handleChange}
                    label="Company"
                />
                <CustomInput
                    id="stock"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    label="Stock"
                />
                <CustomInput
                    id="images"
                    name="images"
                    value={productData.images}
                    onChange={handleChange}
                    label="Images"
                />
                <CustomInput
                    id="tags"
                    name="tags"
                    value={productData.tags}
                    onChange={handleChange}
                    label="Tags"
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

                <CustomInput
                    id="AvailableOffers"
                    name="AvailableOffers"
                    value={productData.AvailableOffers}
                    onChange={handleChange}
                    label="AvailableOffers"
                />

                <button
                    type="submit"
                    className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>

        </>
    );
};
//
export default ProductCreate;
