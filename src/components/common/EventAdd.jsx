import React, { useState, useEffect } from 'react';
import { Cancel, Update } from './Button';
import CustomInput from './InputField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { eventCalenderSchema } from '../../utils/validators';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { getAuthHeader } from '../../constant';
import useToast from '../../hook/useToaster';
import { Loader } from 'rsuite';
import { createEventService } from '../../services/authService';

function EventAdd({ isOpen, close, seectedDate }) {
  const { token, user } = useSelector(UserData);
  const showToast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(eventCalenderSchema),
  });

  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (!isOpen) {
      reset({
        title: '',
        date: '',
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (payload) => {
    setLoading(true);
    try {
        let eventData = {
          email: user?.email,
          title: payload?.title,
          date: seectedDate,
          userType: user?.userType,
        };
      let { status, msg } = await createEventService(eventData);
      if(status == 201){
        showToast('success', `${msg}`);
      }
    
    } catch (error) {
      console.error('Failed to change password', error);
      showToast('error', `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-black font-semibold mb-6 flex justify-center">
          Add Event
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto mt-6 text-black"
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomInput
                id="title"
                name="title"
                value={field.value}
                onChange={field.onChange}
                label="Title"
                error={errors.title}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <CustomInput
                id="date"
                name="date"
                value={seectedDate}
                onChange={field.onChange}
                label="date"
                error={errors.date}
              />
            )}
          />
          <button
            type="submit"
            className="h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <Loader content="password update..." />
            ) : (
              'Create Event'
            )}
          </button>
        </form>

        <div className="mt-5 flex justify-end">
          <Cancel close={close} />
        </div>
      </div>
    </div>
  );
}

export default EventAdd;
