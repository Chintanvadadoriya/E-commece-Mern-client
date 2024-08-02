import React, { useState } from 'react';
import CustomInput from '../../components/common/InputField';
import { couponCreateSchema } from '../../utils/validators';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { getAuthHeader } from '../../constant';
import { couponCodeCreateApi } from '../../services/authService';
import useToast from '../../hook/useToaster';
import { Loader } from 'rsuite';

function CreateCoupon() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(couponCreateSchema),
    defaultValues: {
      name: '',
      discoutOff: 0,
      codeName: '',
    },
  });
  const { token } = useSelector(UserData);

  const showToast = useToast();
  const [loading, setLoding] = useState(false);

  const onSubmit = async (couponData) => {
    setLoding(true);
    try {
      const { data, msg } = await couponCodeCreateApi(
        couponData,
        getAuthHeader(token)
      );
      if (data === 201) {
        showToast('success', `${msg}`);
        reset();
      } else {
        showToast('error', `${msg}`);
        reset();
      }
      setLoding(false);
    } catch (error) {
      showToast('error', `${error.message}`);
      console.error('err1612199', error.message);
      setLoding(false);
    }
    reset();
  };
  return (
    <>
      <div>
        <h2 className="text-3xl grid justify-items-center mb-4">
          Create Coupon-code
        </h2>
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
          name="discoutOff"
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
          name="codeName"
          control={control}
          render={({ field }) => (
            <CustomInput
              id="codeName"
              name="codeName"
              value={field.value}
              onChange={field.onChange}
              label="CodeName"
              error={errors.codeName}
            />
          )}
        />

        <button
          type="submit"
          className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? <Loader content="Loading..." /> : 'Create Coupon code'}
        </button>
      </form>
    </>
  );
}

export default CreateCoupon;
