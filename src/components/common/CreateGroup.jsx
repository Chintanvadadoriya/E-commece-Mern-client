import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Cancel, Update } from './Button';
import CustomInput from './InputField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { getAuthHeader } from '../../constant';
import { createGroup, passwordChangeUserApi } from '../../services/authService';
import useToast from '../../hook/useToaster';
import { Loader } from 'rsuite';
import * as yup from 'yup';

const createGroupSchema = yup.object().shape({
  GroupName: yup.string().required('GroupName is required'),
  profilePicture: yup.string().required('profile Picture is required'),
});

function CreateGroupModel({ isOpen, close, showAllAdminList }) {
  const { token } = useSelector(UserData);
  const showToast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(createGroupSchema),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      reset({
        GroupName: '',
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = async (payload) => {
    console.log('payload', payload);

    let GroupObj = {
      name: payload.GroupName,
      profilePicture: payload.profilePicture,
    };

    setLoading(true);
    try {
      let { msg, status } = await createGroup(GroupObj, getAuthHeader(token));
      if (status === 201) {
        showAllAdminList()
        showToast('success', `${msg}`);
        close();
        setLoading(false);
      } else {
        showToast('error', `${msg}`);
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to create group', error);
      showToast('error', `${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-black font-semibold mb-6 flex justify-center">
          Create Group
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl mx-auto mt-6 text-black"
        >
          <Controller
            name="GroupName"
            control={control}
            render={({ field }) => (
              <CustomInput
                id="GroupName"
                name="GroupName"
                value={field.value}
                onChange={field.onChange}
                label="Group Name"
                error={errors.GroupName}
              />
            )}
          />

          <Controller
            name="profilePicture"
            control={control}
            render={({ field }) => (
              <CustomInput
                id="profilePicture"
                name="profilePicture"
                value={field.value}
                onChange={field.onChange}
                label="profile Picturee"
                error={errors.profilePicture}
              />
            )}
          />

          <button
            type="submit"
            className="mt-5 h-11 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? <Loader content="group creating..." /> : 'Create Group'}
          </button>
        </form>

        <div className="mt-5 flex justify-end">
          <Cancel close={close} />
        </div>
      </div>
    </div>
  );
}

export default CreateGroupModel;
