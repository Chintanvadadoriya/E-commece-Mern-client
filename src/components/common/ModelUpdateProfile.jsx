import React, { useState, useEffect } from 'react';
import { Cancel, Update } from './Button';
import CustomInput from './InputField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileSchema } from '../../utils/validators';

function ModelUpdateProfile({ isOpen, close }) {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });

  const [userUpdate, setUserUpdate] = useState({
    image: '',
    name: '',
  });

  useEffect(() => {
    if (!isOpen) {
      reset({
        image: '',
        name: '',
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    console.log('userUpdate', data);
    // Handle profile update logic here
    close();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-black font-semibold mb-6 flex justify-center">Update Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mt-6 text-black">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <CustomInput
                id="image"
                name="image"
                value={field.value}
                onChange={field.onChange}
                label="Image URL"
                error={errors.image}
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
          <button
            type="submit"
            className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
        </form>

        <div className="mt-5 flex justify-end">
          <Cancel close={close} />
        </div>
      </div>
    </div>
  );
}

export default ModelUpdateProfile;
