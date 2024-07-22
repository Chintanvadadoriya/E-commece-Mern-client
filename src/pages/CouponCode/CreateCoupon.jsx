import React, { useState } from 'react'
import CustomInput from '../../components/common/InputField';
import { couponCreateSchema } from '../../utils/validators';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function CreateCoupon() {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(couponCreateSchema),
    });
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

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('couponData', couponData)

    };
    return (
        <>
            <div>
                <h2 className="text-3xl grid justify-items-center mb-4">Create Coupon-code</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mt-6">

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
                    name='discoutOff'
                    control={control}
                    render={({ field }) => (
                        <CustomInput
                            id="discoutOff"
                            name="discoutOff"
                            value={field.value}
                            onChange={field.onChange}
                            label="DiscoutOff"
                            error={errors.discoutOff}
                        />

                    )}
                />

                <Controller
                    name='codeName'
                    control={control}
                    render={({ field }) => (
                        <CustomInput
                            id="codeName"
                            name="codeName"
                            value={field.value}
                            onChange={handleChange}
                            label="CodeName"
                            error={errors.codeName}
                        />

                    )}
                />


                <button
                    type="submit"
                    className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Coupon code
                </button>
            </form>

        </>
    )
}

export default CreateCoupon