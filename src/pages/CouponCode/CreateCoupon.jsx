import React, { useState } from 'react'
import CustomInput from '../../components/common/InputField';

function CreateCoupon() {
    const [couponData, setCouponData] = useState({
        name: '',
        discoutOff: 0,
        codeName: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCouponData({
            ...couponData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('couponData', couponData)

    };
    return (
        <>
            <div>
                <h2 className="text-3xl grid justify-items-center mb-4">Create Coupon-code</h2>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-6">
                <CustomInput
                    id="name"
                    name="name"
                    value={couponData.name}
                    onChange={handleChange}
                    label="Name"
                />
                <CustomInput
                    id="discoutOff"
                    name="discoutOff"
                    value={couponData.discoutOff}
                    onChange={handleChange}
                    label="DiscoutOff"
                />
                <CustomInput
                    id="codeName"
                    name="codeName"
                    value={couponData.codeName}
                    onChange={handleChange}
                    label="CodeName"
                />


                <button
                    type="submit"
                    className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>

        </>
    )
}

export default CreateCoupon