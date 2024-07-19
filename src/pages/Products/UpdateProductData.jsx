import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CustomInput from '../../components/common/InputField';
import { BackButton, productdata } from '../../utils/helpers';
const isLargeScreen = window.innerWidth > 1024


const product = productdata

console.log('product', product)
function UpdateProductData() {
    let { id } = useParams();
    const navigate = useNavigate();

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

    }, [id]);

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
        productData.AvailableOffers = productData?.AvailableOffers?.split(',');
        console.log(productData); // Replace with your form submission logic for updating the product

        // Example of updating the product using fetch
        fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
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

    function backTo(){
        navigate('/products-list')
    }
    return (
        <>
            <div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
                <BackButton back={backTo}/>
                <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">Update-product {id}</h1>
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
                    label="Available Offers"
                />

                <button
                    type="submit"
                    className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Update Product
                </button>
            </form>
        </>
    )
}

export default UpdateProductData